import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { and, desc, eq, gt, inArray, isNull } from 'drizzle-orm';
import { acceptInvite } from '../common/invite-accept';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import { clientMembers, clients, invites, users } from '../db/schema';
import { MailService } from '../mail/mail.service';
import { AuthUser, isStaff } from './pm.types';

const DAYS = 7;

/** 고객 포털 동료 초대 */
@Injectable()
export class InvitesService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly mail: MailService,
    private readonly config: ConfigService,
  ) {}

  private async myClientIds(userId: number) {
    const rows = await this.db
      .select({ id: clientMembers.clientId })
      .from(clientMembers)
      .where(eq(clientMembers.userId, userId));
    return rows.map((r) => r.id);
  }

  /** 초대할 고객사: 내부 계정은 지정한 곳, 고객은 자기 고객사(지정하면 그중 하나) */
  private async orgFor(user: AuthUser, clientOrgId?: number) {
    if (isStaff(user)) {
      if (!clientOrgId) throw new BadRequestException('고객사를 골라 주세요.');
      return clientOrgId;
    }
    const mine = await this.myClientIds(user.sub);
    if (mine.length === 0) {
      throw new ForbiddenException('고객사에 연결된 계정만 동료를 초대할 수 있습니다. 담당 PM에게 문의해 주세요.');
    }
    if (clientOrgId && !mine.includes(clientOrgId)) throw new ForbiddenException();
    return clientOrgId ?? mine[0];
  }

  /**
   * 동료 초대 메일을 보낸다(invited). 받은 사람이 링크로 가입하거나 로그인해 수락하면 연결된다.
   * 내부 계정이 이미 가입한 이메일을 넣으면 바로 연결한다(linked).
   * 같은 사람에게 다시 보내면 새 링크로 바꿔 다시 보낸다.
   */
  async invite(user: AuthUser, emailInput: string, clientOrgId?: number) {
    const email = emailInput.trim().toLowerCase();
    const orgId = await this.orgFor(user, clientOrgId);
    const [org] = await this.db.select().from(clients).where(eq(clients.id, orgId));
    if (!org) throw new NotFoundException('고객사가 없습니다.');

    // 이미 가입한 사람이라도 고객은 초대 메일로만 (본인이 수락해야 연결). 내부 계정은 바로 연결
    const [existing] = await this.db.select().from(users).where(eq(users.email, email));
    if (existing && isStaff(user)) {
      await this.db
        .insert(clientMembers)
        .values({ clientId: orgId, userId: existing.id, role: 'member' })
        .onConflictDoNothing();
      return { status: 'linked' as const, email };
    }

    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + DAYS * 86_400_000);
    await this.db
      .delete(invites)
      .where(and(eq(invites.clientOrgId, orgId), eq(invites.email, email), isNull(invites.acceptedAt)));
    await this.db.insert(invites).values({ token, clientOrgId: orgId, email, invitedBy: user.name, expiresAt });

    const frontend = this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
    await this.mail
      .sendInviteMail({ to: email, inviter: user.name, client: org.name, link: `${frontend}/invite?token=${token}` })
      .catch(() => undefined);
    return { status: 'invited' as const, email };
  }

  /** 아직 수락하지 않은 초대 (내 고객사, 내부 계정은 지정한 고객사) */
  async pending(user: AuthUser, clientOrgId?: number) {
    const ids = isStaff(user) ? (clientOrgId ? [clientOrgId] : []) : await this.myClientIds(user.sub);
    if (ids.length === 0) return [];
    return this.db
      .select({ id: invites.id, email: invites.email, invitedBy: invites.invitedBy, createdAt: invites.createdAt, expiresAt: invites.expiresAt })
      .from(invites)
      .where(and(inArray(invites.clientOrgId, ids), isNull(invites.acceptedAt), gt(invites.expiresAt, new Date())))
      .orderBy(desc(invites.createdAt));
  }

  async cancel(user: AuthUser, id: number) {
    const [invite] = await this.db.select().from(invites).where(eq(invites.id, id));
    if (!invite) return { ok: true };
    if (!isStaff(user) && !(await this.myClientIds(user.sub)).includes(invite.clientOrgId)) {
      throw new ForbiddenException();
    }
    await this.db.delete(invites).where(eq(invites.id, id));
    return { ok: true };
  }

  /** 초대 링크 화면용 (로그인 없이). 토큰을 모르면 아무것도 알 수 없다 */
  async lookup(token: string) {
    const [row] = await this.db
      .select({ email: invites.email, invitedBy: invites.invitedBy, client: clients.name, expiresAt: invites.expiresAt, acceptedAt: invites.acceptedAt })
      .from(invites)
      .innerJoin(clients, eq(clients.id, invites.clientOrgId))
      .where(eq(invites.token, token));
    if (!row) return { status: 'invalid' as const };
    const status = row.acceptedAt ? ('used' as const) : row.expiresAt < new Date() ? ('expired' as const) : ('valid' as const);
    const [account] = await this.db.select({ id: users.id }).from(users).where(eq(users.email, row.email));
    return { status, email: row.email, client: row.client, invitedBy: row.invitedBy, hasAccount: Boolean(account) };
  }

  /** 로그인한 계정으로 초대 수락 */
  async accept(user: AuthUser, token: string) {
    const [me] = await this.db.select({ id: users.id, email: users.email }).from(users).where(eq(users.id, user.sub));
    if (!me) throw new NotFoundException();
    return acceptInvite(this.db, token, me);
  }
}
