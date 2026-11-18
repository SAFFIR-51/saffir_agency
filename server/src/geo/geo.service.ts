import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { asc, desc, eq, inArray } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import { geoAdChecks, geoDiagnoses, geoSites, users } from '../db/schema';
import { GeoAdCheckDto, GeoDiagnosisDto, GeoSiteDto, GeoSiteUpdateDto } from './geo.dto';

/** 무료 회원의 의료광고 문구 점검 횟수 */
const FREE_AD_CHECKS = 5;

@Injectable()
export class GeoService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  private async detail(siteId: number) {
    const [diagnoses, adChecks] = await Promise.all([
      this.db.select().from(geoDiagnoses).where(eq(geoDiagnoses.siteId, siteId)).orderBy(asc(geoDiagnoses.date), asc(geoDiagnoses.id)),
      this.db.select().from(geoAdChecks).where(eq(geoAdChecks.siteId, siteId)).orderBy(desc(geoAdChecks.date), desc(geoAdChecks.id)),
    ]);
    return { diagnoses, adChecks };
  }

  /** 고객 포털: 내 사이트와 진단 기록 (없으면 site: null) */
  async mine(userId: number) {
    const [site] = await this.db.select().from(geoSites).where(eq(geoSites.userId, userId));
    if (!site) return { site: null, diagnoses: [], adChecks: [], adCheckFreeLeft: null };
    const { diagnoses, adChecks } = await this.detail(site.id);
    return {
      site,
      diagnoses,
      adChecks,
      adCheckFreeLeft: site.plan === 'pro' ? null : Math.max(0, FREE_AD_CHECKS - adChecks.length),
    };
  }

  /* ───── 어드민 ───── */

  async list() {
    const sites = await this.db
      .select({
        id: geoSites.id,
        siteUrl: geoSites.siteUrl,
        plan: geoSites.plan,
        createdAt: geoSites.createdAt,
        userId: users.id,
        name: users.name,
        email: users.email,
        organization: users.organization,
      })
      .from(geoSites)
      .innerJoin(users, eq(users.id, geoSites.userId))
      .orderBy(desc(geoSites.id));
    const ids = sites.map((s) => s.id);
    const [diags, checks] = ids.length
      ? await Promise.all([
          this.db.select().from(geoDiagnoses).where(inArray(geoDiagnoses.siteId, ids)).orderBy(asc(geoDiagnoses.date), asc(geoDiagnoses.id)),
          this.db.select({ siteId: geoAdChecks.siteId }).from(geoAdChecks).where(inArray(geoAdChecks.siteId, ids)),
        ])
      : [[], []];
    return sites.map((s) => {
      const mine = diags.filter((d) => d.siteId === s.id);
      const latest = mine.at(-1);
      return {
        ...s,
        diagnosisCount: mine.length,
        latest: latest ? { date: latest.date, score: latest.score } : null,
        adCheckCount: checks.filter((c) => c.siteId === s.id).length,
      };
    });
  }

  async get(id: number) {
    const [site] = await this.db
      .select({
        id: geoSites.id,
        siteUrl: geoSites.siteUrl,
        plan: geoSites.plan,
        userId: users.id,
        name: users.name,
        email: users.email,
        organization: users.organization,
      })
      .from(geoSites)
      .innerJoin(users, eq(users.id, geoSites.userId))
      .where(eq(geoSites.id, id));
    if (!site) throw new NotFoundException('site not found');
    return { site, ...(await this.detail(id)) };
  }

  /** 가입한 계정(이메일)에 사이트를 연결한다. 이미 있으면 주소·플랜을 바꾼다 */
  async upsertSite(dto: GeoSiteDto) {
    const [user] = await this.db.select().from(users).where(eq(users.email, dto.email.trim().toLowerCase()));
    if (!user) throw new BadRequestException('그 이메일로 가입한 계정이 없습니다.');
    const [row] = await this.db
      .insert(geoSites)
      .values({ userId: user.id, siteUrl: dto.siteUrl.trim(), plan: dto.plan ?? 'free' })
      .onConflictDoUpdate({
        target: geoSites.userId,
        set: { siteUrl: dto.siteUrl.trim(), ...(dto.plan && { plan: dto.plan }) },
      })
      .returning();
    return row;
  }

  async updateSite(id: number, dto: GeoSiteUpdateDto) {
    const [row] = await this.db.update(geoSites).set(dto).where(eq(geoSites.id, id)).returning();
    if (!row) throw new NotFoundException('site not found');
    return row;
  }

  async removeSite(id: number) {
    await this.db.delete(geoSites).where(eq(geoSites.id, id));
    return { ok: true };
  }

  async addDiagnosis(siteId: number, dto: GeoDiagnosisDto) {
    const [row] = await this.db
      .insert(geoDiagnoses)
      .values({
        siteId,
        date: dto.date,
        score: dto.score,
        areas: dto.areas,
        priorities: dto.priorities.map((p) => p.trim()).filter(Boolean),
        visibility: dto.visibility?.length ? dto.visibility : null,
      })
      .returning();
    return row;
  }

  async removeDiagnosis(id: number) {
    await this.db.delete(geoDiagnoses).where(eq(geoDiagnoses.id, id));
    return { ok: true };
  }

  async addAdCheck(siteId: number, dto: GeoAdCheckDto) {
    const [row] = await this.db.insert(geoAdChecks).values({ siteId, ...dto }).returning();
    return row;
  }

  async removeAdCheck(id: number) {
    await this.db.delete(geoAdChecks).where(eq(geoAdChecks.id, id));
    return { ok: true };
  }
}
