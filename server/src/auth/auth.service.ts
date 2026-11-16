import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { and, eq, isNull } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import { clientMembers, clients, geoSites, passwordResets, users } from '../db/schema';
import { acceptInvite } from '../common/invite-accept';
import { MailService } from '../mail/mail.service';
import { FindEmailDto, RegisterDto, UpdateProfileDto } from './dto/auth.dto';
import {
  hashPassword,
  isStrongEnough,
  maskEmail,
  normalizePhone,
  verifyPassword,
} from './password';

interface OAuthProfile {
  provider: string;
  providerId: string;
  name: string;
  email: string | null;
}

const PASSWORD_RULE = '비밀번호는 영문과 숫자를 포함해 8자 이상이어야 합니다.';
const RESET_TTL_MS = 60 * 60 * 1000; // 1시간

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly mail: MailService,
  ) {}

  // ── 소셜 로그인 ────────────────────────────────────────────
  async findOrCreateUser(profile: OAuthProfile) {
    if (profile.email) {
      const [existing] = await this.db
        .select()
        .from(users)
        .where(eq(users.email, profile.email));
      if (existing) {
        await this.db
          .update(users)
          .set({ lastActive: new Date() })
          .where(eq(users.id, existing.id));
        return existing;
      }
    }

    const [created] = await this.db
      .insert(users)
      .values({
        name: profile.name,
        email: profile.email ?? `${profile.provider}_${profile.providerId}@noemail.local`,
        provider: profile.provider,
        role: 'client',
      })
      .returning();
    return created;
  }

  // ── 로컬 회원가입 ──────────────────────────────────────────
  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    if (!isStrongEnough(dto.password)) throw new BadRequestException(PASSWORD_RULE);

    const [existing] = await this.db.select().from(users).where(eq(users.email, email));
    if (existing) {
      throw new ConflictException(
        existing.passwordHash
          ? '이미 가입된 이메일입니다. 로그인하거나 비밀번호 찾기를 이용해 주세요.'
          : `이미 ${providerLabel(existing.provider)} 계정으로 가입된 이메일입니다. 소셜 로그인으로 이용해 주세요.`,
      );
    }

    const [created] = await this.db
      .insert(users)
      .values({
        name: dto.name.trim(),
        email,
        provider: 'local',
        passwordHash: await hashPassword(dto.password),
        phone: dto.phone ? normalizePhone(dto.phone) : null,
        role: 'client',
        organization: dto.organization?.trim() || null,
        customerType: dto.customerType ?? null,
        termsAgreedAt: dto.agreed ? new Date() : null,
        marketingOptIn: dto.marketing ?? false,
      })
      .returning();

    this.logger.log(`로컬 회원가입 #${created.id} ${created.email}`);
    // 초대 링크로 가입하면 그 고객사에 바로 연결 (초대가 틀려도 가입은 된다)
    if (dto.inviteToken) {
      await acceptInvite(this.db, dto.inviteToken, created).catch((err: unknown) => {
        this.logger.warn(`초대 수락 실패 #${created.id}: ${err instanceof Error ? err.message : String(err)}`);
      });
    }
    return created;
  }

  // ── 로컬 로그인 ───────────────────────────────────────────
  async validateLocal(emailInput: string, password: string) {
    const email = emailInput.trim().toLowerCase();
    const [user] = await this.db.select().from(users).where(eq(users.email, email));

    if (user && !user.passwordHash) {
      throw new UnauthorizedException(
        `${providerLabel(user.provider)} 계정으로 가입된 이메일입니다. 소셜 로그인 버튼으로 로그인해 주세요.`,
      );
    }

    const ok = user ? await verifyPassword(password, user.passwordHash) : false;
    if (!user || !ok) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    await this.db.update(users).set({ lastActive: new Date() }).where(eq(users.id, user.id));
    return user;
  }

  // ── 아이디(가입 이메일) 찾기 ───────────────────────────────
  async findEmail(dto: FindEmailDto) {
    const phone = normalizePhone(dto.phone);
    const name = dto.name.trim();
    if (!phone) throw new BadRequestException('연락처를 정확히 입력해 주세요.');

    const [user] = await this.db
      .select()
      .from(users)
      .where(and(eq(users.name, name), eq(users.phone, phone)));

    if (!user) return { found: false as const, email: null, provider: null };
    return {
      found: true as const,
      email: maskEmail(user.email),
      provider: user.passwordHash ? 'local' : user.provider,
    };
  }

  // ── 비밀번호 찾기(재설정 메일 발송) ────────────────────────
  /** 계정 존재 여부를 노출하지 않으려고 결과는 항상 동일하게 응답한다. */
  async requestPasswordReset(emailInput: string) {
    const email = emailInput.trim().toLowerCase();
    const [user] = await this.db.select().from(users).where(eq(users.email, email));

    if (user?.passwordHash) {
      const token = randomBytes(32).toString('hex');
      await this.db.insert(passwordResets).values({
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + RESET_TTL_MS),
      });

      const frontend = this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
      const link = `${frontend}/reset-password?token=${token}`;
      await this.mail.sendPasswordResetMail({ to: user.email, name: user.name, link });
      this.logger.log(`비밀번호 재설정 메일 발송 → ${user.email}`);
    } else if (user) {
      this.logger.log(`비밀번호 재설정 요청 무시 — 소셜 계정 ${user.email}`);
    }

    return { ok: true };
  }

  async resetPassword(token: string, password: string) {
    if (!isStrongEnough(password)) throw new BadRequestException(PASSWORD_RULE);

    const [reset] = await this.db
      .select()
      .from(passwordResets)
      .where(eq(passwordResets.token, token));

    if (!reset || reset.usedAt || reset.expiresAt.getTime() < Date.now()) {
      throw new BadRequestException('만료되었거나 이미 사용된 링크입니다. 다시 요청해 주세요.');
    }

    const [user] = await this.db
      .update(users)
      .set({ passwordHash: await hashPassword(password) })
      .where(eq(users.id, reset.userId))
      .returning();

    // 방금 쓴 토큰과 함께, 이 사용자의 남은 미사용 토큰도 전부 무효화한다
    await this.db
      .update(passwordResets)
      .set({ usedAt: new Date() })
      .where(and(eq(passwordResets.userId, reset.userId), isNull(passwordResets.usedAt)));

    this.logger.log(`비밀번호 재설정 완료 #${user.id}`);
    return user;
  }

  /**
   * 화면이 쓰는 내 정보 (GET /api/auth/me). 토큰 내용 대신 DB의 현재 값으로 답한다.
   * 비밀번호 해시 등 내부 필드는 내보내지 않는다.
   */
  async profile(id: number) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    if (!user) throw new UnauthorizedException();
    const [org] = await this.db
      .select({ id: clients.id, name: clients.name })
      .from(clientMembers)
      .innerJoin(clients, eq(clients.id, clientMembers.clientId))
      .where(eq(clientMembers.userId, id))
      .limit(1);
    const [geo] = await this.db.select({ plan: geoSites.plan }).from(geoSites).where(eq(geoSites.userId, id));
    return {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      /** GEO 구독(pro)이면 포털에 구독 메뉴가 열린다 */
      geoPlan: geo?.plan ?? null,
      phone: user.phone,
      provider: user.provider,
      customerType: user.customerType,
      /** 가입 때 적은 병원(회사)명, 없으면 연결된 고객사 이름 */
      organization: user.organization ?? org?.name ?? null,
      /** 고객사에 연결돼 프로젝트 포털을 쓰는 계정인지 */
      clientMember: Boolean(org),
      businessNumber: user.businessNumber,
      taxEmail: user.taxEmail,
      /** 같은 고객사 계정들 (포털 '담당자') */
      colleagues: org
        ? await this.db
            .select({ name: users.name, email: users.email, role: clientMembers.role })
            .from(clientMembers)
            .innerJoin(users, eq(users.id, clientMembers.userId))
            .where(eq(clientMembers.clientId, org.id))
        : [{ name: user.name, email: user.email, role: 'owner' }],
    };
  }

  /** 포털 계정에서 내 정보·회사 정보를 고친다. 빈 문자열은 지움 */
  async updateProfile(id: number, dto: UpdateProfileDto) {
    const clean = (v: string | undefined) => (v === undefined ? undefined : v.trim() || null);
    const digits = dto.businessNumber?.replace(/\D/g, '');
    await this.db
      .update(users)
      .set({
        ...(dto.name?.trim() && { name: dto.name.trim() }),
        ...(dto.phone !== undefined && { phone: normalizePhone(dto.phone) || null }),
        ...(dto.organization !== undefined && { organization: clean(dto.organization) }),
        ...(digits !== undefined && {
          businessNumber: digits ? `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}` : null,
        }),
        ...(dto.taxEmail !== undefined && { taxEmail: clean(dto.taxEmail)?.toLowerCase() ?? null }),
      })
      .where(eq(users.id, id));
    return this.profile(id);
  }

  issueToken(user: { id: number; name: string; email: string; role: string }) {
    return this.jwt.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }
}

function providerLabel(provider: string): string {
  return { google: 'Google', kakao: '카카오', naver: '네이버', local: '이메일' }[provider] ?? provider;
}
