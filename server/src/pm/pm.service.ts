import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, asc, desc, eq, inArray, isNull, or } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import {
  activities,
  clientMembers,
  clients,
  deliverables,
  meetings,
  milestones,
  notifications,
  invoices,
  payments,
  productOrders,
  projects,
  reports,
  requests,
  staff,
  tasks,
  users,
} from '../db/schema';
import {
  ClientDto,
  DecisionDto,
  MeetingDto,
  MemberDto,
  NewProjectDto,
  NewRequestDto,
  PmDeliverableDto,
  PmMilestoneDto,
  PmPaymentDto,
  PmProjectDto,
  ReportDto,
  RequestUpdateDto,
  TaskDto,
} from './pm.dto';
import { AuthUser, PM_STAGES, isStaff, reqCode, todayKST } from './pm.types';

/** 단계별 기본 마일스톤 (새 프로젝트 템플릿): 이름과 기간 대비 위치 */
const TEMPLATE: Record<string, [string, number]> = {
  착수: ['착수 미팅', 0],
  기획: ['기획 확정', 0.15],
  디자인: ['디자인 확정', 0.35],
  개발: ['개발 완료', 0.75],
  검수: ['검수 완료', 0.92],
  운영: ['오픈', 1],
};

const addDays = (date: string, days: number) =>
  new Date(new Date(`${date}T00:00:00Z`).getTime() + days * 86_400_000).toISOString().slice(0, 10);
const daysBetween = (a: string, b: string) =>
  Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);

/**
 * 프로젝트 관리 (어드민 ↔ 고객 포털).
 * 내부 계정(admin·staff)은 전부, 고객은 자기 고객사(client_members) 것만 본다.
 * 바꾼 내용은 activities에 남기고, 고객에게 보일 일은 notifications에 남긴다.
 */
@Injectable()
export class PmService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  /* ───────── 권한·기록 ───────── */

  async memberClientIds(userId: number) {
    const rows = await this.db
      .select({ id: clientMembers.clientId })
      .from(clientMembers)
      .where(eq(clientMembers.userId, userId));
    return rows.map((r) => r.id);
  }

  /** 프로젝트를 볼 수 있는지 확인하고 돌려준다 */
  async projectFor(user: AuthUser, projectId: number) {
    const [p] = await this.db.select().from(projects).where(eq(projects.id, projectId));
    if (!p) throw new NotFoundException(`Project #${projectId} not found`);
    if (isStaff(user)) return p;
    const mine = await this.memberClientIds(user.sub);
    if (!p.clientOrgId || !mine.includes(p.clientOrgId)) throw new ForbiddenException();
    return p;
  }

  async log(projectId: number, who: string, text: string) {
    await this.db.insert(activities).values({ projectId, who, text });
  }

  async notify(clientOrgId: number | null | undefined, text: string) {
    if (clientOrgId) await this.db.insert(notifications).values({ clientOrgId, text });
  }

  private async projectOf<T extends { projectId: number }>(row: T | undefined, what: string) {
    if (!row) throw new NotFoundException(`${what} not found`);
    const [p] = await this.db.select().from(projects).where(eq(projects.id, row.projectId));
    return p;
  }

  /* ───────── 고객사·팀 ───────── */

  async listClients() {
    const rows = await this.db.select().from(clients).orderBy(asc(clients.id));
    const members = await this.db
      .select({
        clientId: clientMembers.clientId,
        userId: users.id,
        name: users.name,
        email: users.email,
        role: clientMembers.role,
      })
      .from(clientMembers)
      .innerJoin(users, eq(users.id, clientMembers.userId));
    return rows.map((c) => ({ ...c, members: members.filter((m) => m.clientId === c.id) }));
  }

  async createClient(dto: ClientDto) {
    const [row] = await this.db.insert(clients).values({ name: dto.name }).returning();
    return row;
  }

  async renameClient(id: number, dto: ClientDto) {
    const [row] = await this.db
      .update(clients)
      .set({ name: dto.name })
      .where(eq(clients.id, id))
      .returning();
    if (!row) throw new NotFoundException();
    return row;
  }

  /** 프로젝트·요청이 없는 고객사만 지운다 */
  async removeClient(id: number) {
    const used =
      (await this.db.select({ id: projects.id }).from(projects).where(eq(projects.clientOrgId, id)))
        .length +
      (await this.db.select({ id: requests.id }).from(requests).where(eq(requests.clientOrgId, id)))
        .length;
    if (used > 0) throw new BadRequestException('프로젝트나 요청이 있는 고객사는 지울 수 없습니다.');
    await this.db.delete(clients).where(eq(clients.id, id));
    return { ok: true };
  }

  /** 포털 계정 연결: 가입한 이메일로 찾는다 */
  async addMember(clientId: number, dto: MemberDto) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, dto.email.trim().toLowerCase()));
    if (!user) throw new BadRequestException('가입하지 않은 이메일입니다. 가입 후 연결해 주세요.');
    await this.db
      .insert(clientMembers)
      .values({ clientId, userId: user.id, role: dto.role ?? 'member' })
      .onConflictDoNothing();
    return { ok: true };
  }

  async removeMember(clientId: number, userId: number) {
    await this.db
      .delete(clientMembers)
      .where(and(eq(clientMembers.clientId, clientId), eq(clientMembers.userId, userId)));
    return { ok: true };
  }

  listStaff() {
    return this.db.select().from(staff).where(eq(staff.active, true)).orderBy(asc(staff.id));
  }

  async addStaff(name: string) {
    const [row] = await this.db.insert(staff).values({ name }).onConflictDoNothing().returning();
    return row ?? { name };
  }

  /** 이름을 바꾸면 PM·담당 표시도 같이 바뀐다 */
  async renameStaff(from: string, to: string) {
    await this.db.transaction(async (tx) => {
      await tx.update(staff).set({ name: to }).where(eq(staff.name, from));
      await tx.update(projects).set({ pm: to }).where(eq(projects.pm, from));
      await tx.update(tasks).set({ assignee: to }).where(eq(tasks.assignee, from));
      await tx.update(requests).set({ assignee: to }).where(eq(requests.assignee, from));
    });
    return { ok: true };
  }

  /** 빼면 맡던 작업·요청은 미지정 */
  async removeStaff(name: string) {
    await this.db.transaction(async (tx) => {
      await tx.update(staff).set({ active: false }).where(eq(staff.name, name));
      await tx.update(tasks).set({ assignee: '' }).where(eq(tasks.assignee, name));
      await tx.update(requests).set({ assignee: '' }).where(eq(requests.assignee, name));
    });
    return { ok: true };
  }

  /* ───────── 프로젝트 ───────── */

  /** 목록: 내부는 전체, 고객은 자기 고객사 것 */
  async listProjects(user: AuthUser) {
    if (isStaff(user)) return this.db.select().from(projects).orderBy(desc(projects.id));
    const mine = await this.memberClientIds(user.sub);
    if (mine.length === 0) return [];
    return this.db.select().from(projects).where(inArray(projects.clientOrgId, mine));
  }

  /** 새 프로젝트: 고객사(기존/새로) + 기간 비율로 단계별 마일스톤 자동 생성 */
  async createProject(dto: NewProjectDto, who: string) {
    if (dto.targetDate < dto.startDate) throw new BadRequestException('종료일이 시작일보다 앞입니다.');
    let clientOrgId = dto.clientOrgId;
    if (!clientOrgId) {
      const [c] = await this.db
        .insert(clients)
        .values({ name: dto.clientName?.trim() || '새 고객사' })
        .returning();
      clientOrgId = c.id;
    }
    const stages = PM_STAGES.filter((s) => !dto.stages?.length || dto.stages.includes(s));
    const span = Math.max(daysBetween(dto.startDate, dto.targetDate), 1);
    const [p] = await this.db
      .insert(projects)
      .values({
        name: dto.name,
        clientOrgId,
        pm: dto.pm ?? who,
        stage: stages[0] ?? '착수',
        startDate: dto.startDate,
        targetDate: dto.targetDate,
      })
      .returning();
    if (stages.length > 0) {
      await this.db.insert(milestones).values(
        stages.map((s, i) => ({
          projectId: p.id,
          ord: i + 1,
          title: TEMPLATE[s][0],
          stage: s,
          date: addDays(dto.startDate, Math.round(span * TEMPLATE[s][1])),
        })),
      );
    }
    await this.log(p.id, who, '프로젝트를 만들었습니다.');
    return p;
  }

  /** 프로젝트 한 건의 모든 것 (어드민 화면). 고객이 부르면 공개 항목만 */
  async board(user: AuthUser, projectId: number) {
    const project = await this.projectFor(user, projectId);
    const staffView = isStaff(user);
    const [ms, ts, ds, rs, mts, rq] = await Promise.all([
      this.db.select().from(milestones).where(eq(milestones.projectId, projectId)).orderBy(asc(milestones.date)),
      this.db.select().from(tasks).where(eq(tasks.projectId, projectId)).orderBy(asc(tasks.dueDate)),
      this.db.select().from(deliverables).where(eq(deliverables.projectId, projectId)),
      this.db.select().from(reports).where(eq(reports.projectId, projectId)).orderBy(desc(reports.weekOf)),
      this.db.select().from(meetings).where(eq(meetings.projectId, projectId)).orderBy(desc(meetings.date)),
      this.db.select().from(requests).where(eq(requests.projectId, projectId)).orderBy(desc(requests.createdAt)),
    ]);
    if (staffView) {
      const acts = await this.db
        .select()
        .from(activities)
        .where(eq(activities.projectId, projectId))
        .orderBy(desc(activities.at))
        .limit(300);
      const pays = await this.db
        .select({
          id: payments.id,
          title: payments.title,
          amount: payments.amount,
          date: payments.date,
          paidAt: payments.paidAt,
          invoiceNumber: invoices.invoiceNumber,
        })
        .from(payments)
        .leftJoin(invoices, eq(invoices.paymentId, payments.id))
        .where(eq(payments.projectId, projectId))
        .orderBy(asc(payments.id));
      return { project, milestones: ms, tasks: ts, deliverables: ds, reports: rs, meetings: mts, requests: rq, activities: acts, payments: pays };
    }
    return {
      project,
      milestones: ms.filter((m) => m.shared),
      tasks: ts.filter((t) => t.shared && t.status !== '완료').map(({ assignee: _a, ...t }) => t),
      deliverables: ds,
      reports: rs.filter((r) => r.sharedAt),
      meetings: mts.filter((m) => m.sharedAt),
      requests: rq.map(({ memo: _m, assignee: _a, ...r }) => r),
    };
  }

  async updateProject(id: number, dto: PmProjectDto, who: string) {
    const { archived, ...rest } = dto;
    const [p] = await this.db
      .update(projects)
      .set({
        ...rest,
        ...(archived !== undefined && { archivedAt: archived ? new Date() : null }),
      })
      .where(eq(projects.id, id))
      .returning();
    if (!p) throw new NotFoundException();
    const note = dto.stage
      ? `단계를 '${dto.stage}'(으)로 바꿨습니다.`
      : archived !== undefined
        ? archived ? '프로젝트를 보관했습니다.' : '프로젝트를 다시 진행 중으로 돌렸습니다.'
        : '프로젝트 정보를 바꿨습니다.';
    await this.log(id, who, note);
    return p;
  }

  async deleteProject(id: number) {
    await this.db.delete(projects).where(eq(projects.id, id));
    return { ok: true };
  }

  /* ───────── 마일스톤 ───────── */

  async addMilestone(projectId: number, dto: PmMilestoneDto, who: string) {
    if (!dto.title || !dto.date) throw new BadRequestException('이름과 예정일이 필요합니다.');
    const existing = await this.db.select({ id: milestones.id }).from(milestones).where(eq(milestones.projectId, projectId));
    const [m] = await this.db
      .insert(milestones)
      .values({
        projectId,
        ord: existing.length + 1,
        title: dto.title,
        stage: dto.stage,
        date: dto.date,
        shared: dto.shared ?? true,
      })
      .returning();
    await this.log(projectId, who, `마일스톤 '${m.title}'(${dto.date.slice(5)})을 추가했습니다.`);
    return m;
  }

  async updateMilestone(id: number, dto: PmMilestoneDto, who: string) {
    const [before] = await this.db.select().from(milestones).where(eq(milestones.id, id));
    const project = await this.projectOf(before, 'Milestone');
    const { done, ...rest } = dto;
    const [m] = await this.db
      .update(milestones)
      .set({
        ...rest,
        ...(done !== undefined && { doneAt: done ? todayKST() : null, status: done ? 'done' : 'pending' }),
      })
      .where(eq(milestones.id, id))
      .returning();
    if (dto.date && dto.date !== before!.date && m.shared) {
      await this.notify(project.clientOrgId, `일정 변경: ${m.title} ${before!.date?.slice(5) ?? '-'} → ${dto.date.slice(5)}`);
    }
    if (done) await this.notify(project.clientOrgId, `마일스톤 완료: ${m.title}`);
    await this.log(
      project.id,
      who,
      done !== undefined
        ? `마일스톤 '${m.title}'을 ${done ? '완료했습니다' : '완료 취소했습니다'}.`
        : `마일스톤 '${m.title}'을 고쳤습니다.`,
    );
    return m;
  }

  async removeMilestone(id: number, who: string) {
    const [m] = await this.db.delete(milestones).where(eq(milestones.id, id)).returning();
    if (m) await this.log(m.projectId, who, `마일스톤 '${m.title}'을 지웠습니다.`);
    return { ok: true };
  }

  /* ───────── 작업 ───────── */

  async addTask(projectId: number, dto: TaskDto, who: string) {
    if (!dto.title || !dto.dueDate) throw new BadRequestException('작업 이름과 마감이 필요합니다.');
    const [t] = await this.db
      .insert(tasks)
      .values({
        projectId,
        title: dto.title,
        stage: dto.stage,
        assignee: dto.assignee ?? '',
        startDate: dto.startDate,
        dueDate: dto.dueDate,
        shared: dto.shared ?? true,
      })
      .returning();
    await this.log(projectId, who, `작업 '${t.title}'을 추가했습니다.`);
    return t;
  }

  async updateTask(id: number, dto: TaskDto, who: string) {
    const [t] = await this.db
      .update(tasks)
      .set({
        ...dto,
        ...(dto.status && { doneAt: dto.status === '완료' ? todayKST() : null }),
      })
      .where(eq(tasks.id, id))
      .returning();
    if (!t) throw new NotFoundException();
    if (dto.status) await this.log(t.projectId, who, `작업 '${t.title}' → ${dto.status}`);
    return t;
  }

  async removeTask(id: number, who: string) {
    const [t] = await this.db.delete(tasks).where(eq(tasks.id, id)).returning();
    if (t) await this.log(t.projectId, who, `작업 '${t.title}'을 지웠습니다.`);
    return { ok: true };
  }

  /* ───────── 산출물 (승인 흐름) ───────── */

  async addDeliverable(projectId: number, dto: PmDeliverableDto, who: string, request = false) {
    if (!dto.name) throw new BadRequestException('산출물 이름이 필요합니다.');
    const [d] = await this.db
      .insert(deliverables)
      .values({
        projectId,
        name: dto.name,
        type: 'LINK',
        url: dto.url ?? null,
        stage: dto.stage,
        version: dto.version ?? 'v1',
        note: dto.note ?? null,
        milestoneId: dto.milestoneId ?? null,
        date: todayKST(),
      })
      .returning();
    await this.log(projectId, who, `산출물 '${d.name} ${d.version}'을 올렸습니다.`);
    return request ? this.requestApproval(d.id, who) : d;
  }

  async updateDeliverable(id: number, dto: PmDeliverableDto, who: string) {
    const [d] = await this.db
      .update(deliverables)
      .set({ ...dto, date: todayKST() })
      .where(eq(deliverables.id, id))
      .returning();
    if (!d) throw new NotFoundException();
    await this.log(d.projectId, who, `산출물 '${d.name}'을 고쳤습니다.`);
    return d;
  }

  /** 고객에게 승인 요청 (다시 요청하면 이전 결과를 지운다) */
  async requestApproval(id: number, who: string) {
    const [d] = await this.db
      .update(deliverables)
      .set({ status: '승인 요청', requestedAt: todayKST(), decidedAt: null, decidedBy: null })
      .where(eq(deliverables.id, id))
      .returning();
    const project = await this.projectOf(d, 'Deliverable');
    await this.notify(project.clientOrgId, `${d.name} ${d.version ?? ''}을(를) 확인하고 승인해 주세요.`);
    await this.log(d.projectId, who, `산출물 '${d.name} ${d.version ?? ''}' 승인을 요청했습니다.`);
    return d;
  }

  async withdrawApproval(id: number, who: string) {
    const [d] = await this.db
      .update(deliverables)
      .set({ status: '작성 중', requestedAt: null })
      .where(and(eq(deliverables.id, id), eq(deliverables.status, '승인 요청')))
      .returning();
    if (d) await this.log(d.projectId, who, '승인 요청을 거뒀습니다.');
    return d ?? { ok: true };
  }

  /** 고객(또는 내부)이 승인하거나 수정을 요청. 승인되면 연결 마일스톤도 완료 */
  async decide(user: AuthUser, id: number, dto: DecisionDto) {
    const [d] = await this.db.select().from(deliverables).where(eq(deliverables.id, id));
    if (!d) throw new NotFoundException();
    await this.projectFor(user, d.projectId);
    if (d.status !== '승인 요청') throw new BadRequestException('승인을 기다리는 산출물이 아닙니다.');
    if (!dto.approve && !dto.feedback?.trim()) throw new BadRequestException('수정 요청에는 의견이 필요합니다.');
    const [row] = await this.db
      .update(deliverables)
      .set({
        status: dto.approve ? '승인 완료' : '수정 요청',
        decidedAt: todayKST(),
        decidedBy: user.name,
        feedback: dto.feedback?.trim() || null,
      })
      .where(eq(deliverables.id, id))
      .returning();
    if (dto.approve && d.milestoneId) {
      await this.db
        .update(milestones)
        .set({ doneAt: todayKST(), status: 'done' })
        .where(and(eq(milestones.id, d.milestoneId), isNull(milestones.doneAt)));
    }
    await this.log(
      d.projectId,
      user.name,
      dto.approve
        ? `산출물 '${d.name} ${d.version ?? ''}'을(를) 승인했습니다.`
        : `산출물 '${d.name} ${d.version ?? ''}' 수정을 요청했습니다: ${dto.feedback}`,
    );
    return row;
  }

  async removeDeliverable(id: number, who: string) {
    const [d] = await this.db.delete(deliverables).where(eq(deliverables.id, id)).returning();
    if (d) await this.log(d.projectId, who, `산출물 '${d.name}'을 지웠습니다.`);
    return { ok: true };
  }

  /* ───────── 주간 보고·회의록 ───────── */

  /** 그 주 보고를 저장(없으면 만들고 있으면 고침). share면 바로 고객에게 공유 */
  async saveReport(projectId: number, dto: ReportDto, who: string) {
    const values = {
      done: dto.done ?? '',
      next: dto.next ?? '',
      issues: dto.issues ?? '',
      asks: dto.asks ?? '',
      author: who,
      updatedAt: new Date(),
    };
    const [r] = await this.db
      .insert(reports)
      .values({ projectId, weekOf: dto.weekOf, ...values })
      .onConflictDoUpdate({ target: [reports.projectId, reports.weekOf], set: values })
      .returning();
    await this.log(projectId, who, `${dto.weekOf} 주 보고를 저장했습니다.`);
    return dto.share ? this.shareReport(r.id, true, who) : r;
  }

  async shareReport(id: number, share: boolean, who: string) {
    const [r] = await this.db
      .update(reports)
      .set({ sharedAt: share ? todayKST() : null })
      .where(eq(reports.id, id))
      .returning();
    const project = await this.projectOf(r, 'Report');
    if (share) await this.notify(project.clientOrgId, `${r.weekOf} 주 작업 보고가 올라왔습니다.`);
    await this.log(r.projectId, who, `${r.weekOf} 주 보고 ${share ? '공유' : '공유 취소'}`);
    return r;
  }

  async removeReport(id: number, who: string) {
    const [r] = await this.db.delete(reports).where(eq(reports.id, id)).returning();
    if (r) await this.log(r.projectId, who, `${r.weekOf} 주 보고를 지웠습니다.`);
    return { ok: true };
  }

  async addMeeting(projectId: number, dto: MeetingDto, who: string) {
    if (!dto.title || !dto.date) throw new BadRequestException('회의 이름과 날짜가 필요합니다.');
    const [m] = await this.db
      .insert(meetings)
      .values({
        projectId,
        date: dto.date,
        title: dto.title,
        attendees: dto.attendees ?? '',
        decisions: dto.decisions ?? '',
        actions: dto.actions ?? '',
      })
      .returning();
    await this.log(projectId, who, `회의록 '${m.title}'을 남겼습니다.`);
    return m;
  }

  async updateMeeting(id: number, dto: MeetingDto, who: string) {
    const [m] = await this.db.update(meetings).set(dto).where(eq(meetings.id, id)).returning();
    if (!m) throw new NotFoundException();
    await this.log(m.projectId, who, `회의록 '${m.title}'을 고쳤습니다.`);
    return m;
  }

  async shareMeeting(id: number, share: boolean, who: string) {
    const [m] = await this.db
      .update(meetings)
      .set({ sharedAt: share ? todayKST() : null })
      .where(eq(meetings.id, id))
      .returning();
    const project = await this.projectOf(m, 'Meeting');
    if (share) await this.notify(project.clientOrgId, `회의록이 올라왔습니다: ${m.title} (${m.date.slice(5)})`);
    await this.log(m.projectId, who, `회의록 '${m.title}' ${share ? '공유' : '공유 취소'}`);
    return m;
  }

  async removeMeeting(id: number, who: string) {
    const [m] = await this.db.delete(meetings).where(eq(meetings.id, id)).returning();
    if (m) await this.log(m.projectId, who, '회의록을 지웠습니다.');
    return { ok: true };
  }

  /* ───────── 요청 ───────── */

  /** 내부: 전체(메모·담당 포함). 고객: 자기 고객사 것(메모·담당 빼고) */
  async listRequests(user: AuthUser, projectId?: number) {
    if (isStaff(user)) {
      return this.db
        .select()
        .from(requests)
        .where(projectId ? eq(requests.projectId, projectId) : undefined)
        .orderBy(desc(requests.createdAt));
    }
    const mine = await this.memberClientIds(user.sub);
    if (mine.length === 0) return [];
    const rows = await this.db
      .select()
      .from(requests)
      .where(inArray(requests.clientOrgId, mine))
      .orderBy(desc(requests.createdAt));
    return rows.map(({ memo: _m, assignee: _a, ...r }) => r);
  }

  /** 고객은 포털에서, 내부는 전화·메신저로 받은 것을 대신 등록 */
  async createRequest(user: AuthUser, dto: NewRequestDto) {
    let clientOrgId = dto.clientOrgId;
    if (dto.projectId) {
      const p = await this.projectFor(user, dto.projectId);
      clientOrgId = p.clientOrgId ?? clientOrgId;
    }
    if (!isStaff(user)) {
      const mine = await this.memberClientIds(user.sub);
      clientOrgId = clientOrgId ?? mine[0];
      if (!clientOrgId || !mine.includes(clientOrgId)) throw new ForbiddenException();
    }
    if (!clientOrgId) throw new BadRequestException('고객사를 골라 주세요.');
    const [r] = await this.db
      .insert(requests)
      .values({
        clientOrgId,
        projectId: dto.projectId ?? null,
        kind: dto.kind,
        title: dto.title,
        body: dto.body ?? '',
        requestedBy: isStaff(user) ? dto.requestedBy || `${user.name} (대신 등록)` : user.name,
        priority: (isStaff(user) && dto.priority) || (dto.kind === '장애 신고' ? '긴급' : '보통'),
        assignee: isStaff(user) ? (dto.assignee ?? '') : '',
      })
      .returning();
    if (r.projectId) await this.log(r.projectId, user.name, `요청 ${reqCode(r.id)} '${r.title}'이 들어왔습니다.`);
    return r;
  }

  /** 처리(상태·우선순위·담당·메모)와 답변. 상태가 바뀌거나 답하면 고객에게 알림 */
  async updateRequest(id: number, dto: RequestUpdateDto, who: string) {
    const [before] = await this.db.select().from(requests).where(eq(requests.id, id));
    if (!before) throw new NotFoundException();
    const reply = dto.reply?.trim();
    const [r] = await this.db
      .update(requests)
      .set({
        ...dto,
        ...(reply && {
          reply,
          repliedAt: todayKST(),
          ...(before.status === '접수' && !dto.status && { status: '확인' }),
        }),
      })
      .where(eq(requests.id, id))
      .returning();
    if (dto.status && dto.status !== before.status) {
      await this.notify(r.clientOrgId, `${reqCode(r.id)} ${r.title}: ${dto.status}`);
      if (r.projectId) await this.log(r.projectId, who, `요청 ${reqCode(r.id)} → ${dto.status}`);
    }
    if (reply) await this.notify(r.clientOrgId, `${reqCode(r.id)}에 답변이 달렸습니다.`);
    return r;
  }

  async removeRequest(id: number) {
    await this.db.delete(requests).where(eq(requests.id, id));
    return { ok: true };
  }

  /* ───────── 고객 포털 ───────── */

  /** 포털 한 번에: 내 고객사, 프로젝트(공개 항목), 요청, 알림 */
  async portal(user: AuthUser) {
    const mine = await this.memberClientIds(user.sub);
    if (mine.length === 0) return { clients: [], projects: [], requests: [], notifications: [] };
    const [orgs, ps, rq, ns] = await Promise.all([
      this.db.select().from(clients).where(inArray(clients.id, mine)),
      this.db.select().from(projects).where(inArray(projects.clientOrgId, mine)),
      this.listRequests(user),
      this.db
        .select()
        .from(notifications)
        .where(inArray(notifications.clientOrgId, mine))
        .orderBy(desc(notifications.createdAt))
        .limit(20),
    ]);
    const boards = await Promise.all(ps.map((p) => this.board(user, p.id)));
    return { clients: orgs, projects: boards, requests: rq, notifications: ns };
  }

  /* ───────── 청구 (어드민) ───────── */

  async addPayment(projectId: number, dto: PmPaymentDto, who: string) {
    const [p] = await this.db.select().from(projects).where(eq(projects.id, projectId));
    if (!p) throw new NotFoundException('project not found');
    const [row] = await this.db
      .insert(payments)
      .values({ projectId, title: dto.title, amount: dto.amount, date: dto.date ?? null })
      .returning();
    const won = `${dto.amount.toLocaleString('ko-KR')}원`;
    await this.log(projectId, who, `청구 '${dto.title}'(${won})을 만들었습니다.`);
    await this.notify(p.clientOrgId, `새 청구: ${dto.title} ${won}${dto.date ? ` (기한 ${dto.date.slice(5)})` : ''}`);
    return row;
  }

  /** 계좌이체 등으로 받은 청구를 결제 완료로 (토스 결제는 자동으로 완료됨) */
  async markPaymentPaid(id: number, who: string) {
    const [row] = await this.db
      .update(payments)
      .set({ paidAt: new Date() })
      .where(and(eq(payments.id, id), isNull(payments.paidAt)))
      .returning();
    if (!row) throw new BadRequestException('이미 결제됐거나 없는 청구입니다.');
    await this.log(row.projectId, who, `청구 '${row.title}'을 결제 완료로 바꿨습니다.`);
    return row;
  }

  /** 결제 전 청구만 지운다 (결제된 건 기록으로 남긴다) */
  async removePayment(id: number, who: string) {
    const [row] = await this.db
      .delete(payments)
      .where(and(eq(payments.id, id), isNull(payments.paidAt)))
      .returning();
    if (!row) throw new BadRequestException('결제된 청구는 지울 수 없습니다.');
    await this.log(row.projectId, who, `청구 '${row.title}'을 지웠습니다.`);
    return { ok: true };
  }

  /**
   * 고객 포털 '청구·결제': 내가 볼 수 있는 프로젝트(주인이거나 소속 고객사)의 청구(payments)와
   * 내 이메일로 주문한 상품 결제(product_orders, 결제 완료만).
   */
  async billing(user: AuthUser) {
    const mine = await this.memberClientIds(user.sub);
    const visible = await this.db
      .select({ id: projects.id, name: projects.name })
      .from(projects)
      .where(
        mine.length > 0
          ? or(eq(projects.clientId, user.sub), inArray(projects.clientOrgId, mine))
          : eq(projects.clientId, user.sub),
      );
    const ids = visible.map((p) => p.id);
    const pays = ids.length
      ? await this.db
          .select({
            id: payments.id,
            projectId: payments.projectId,
            title: payments.title,
            amount: payments.amount,
            date: payments.date,
            paidAt: payments.paidAt,
            invoiceNumber: invoices.invoiceNumber,
          })
          .from(payments)
          .leftJoin(invoices, eq(invoices.paymentId, payments.id))
          .where(inArray(payments.projectId, ids))
          .orderBy(desc(payments.id))
      : [];
    const [me] = await this.db.select({ email: users.email }).from(users).where(eq(users.id, user.sub));
    const orders = me
      ? await this.db
          .select({
            orderNo: productOrders.orderNo,
            productName: productOrders.productName,
            amount: productOrders.amount,
            status: productOrders.status,
            paidAt: productOrders.paidAt,
            createdAt: productOrders.createdAt,
            receiptUrl: productOrders.receiptUrl,
          })
          .from(productOrders)
          .where(and(eq(productOrders.customerEmail, me.email), eq(productOrders.status, 'paid')))
          .orderBy(desc(productOrders.createdAt))
      : [];
    const names = new Map(visible.map((p) => [p.id, p.name]));
    return {
      payments: pays.map((p) => ({ ...p, projectName: names.get(p.projectId) ?? '' })),
      orders,
    };
  }
}
