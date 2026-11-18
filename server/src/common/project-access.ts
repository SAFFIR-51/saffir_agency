import { NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import type { DrizzleDb } from '../db/db.module';
import { clientMembers, projects } from '../db/schema';

export type RequestUser = { sub: number; role: string };

export const isStaffRole = (role?: string) => role === 'admin' || role === 'staff';

/**
 * 이 계정이 이 프로젝트를 볼 수 있는지 확인한다.
 * 내부 계정(admin·staff) → 모두. 고객 → 자기 계정(projects.client_id)이거나 소속 고객사(client_org_id)의 프로젝트만.
 * 남의 프로젝트는 "없다"(404)로 답한다. 403을 주면 그 번호의 프로젝트가 있다는 걸 알려 주게 된다.
 */
export async function assertProjectAccess(db: DrizzleDb, user: RequestUser | undefined, projectId: number) {
  const [project] = await db.select().from(projects).where(eq(projects.id, projectId));
  const missing = new NotFoundException(`Project #${projectId} not found`);
  if (!project || !user) throw missing;
  if (isStaffRole(user.role) || project.clientId === user.sub) return project;
  if (project.clientOrgId != null) {
    const [member] = await db
      .select()
      .from(clientMembers)
      .where(and(eq(clientMembers.clientId, project.clientOrgId), eq(clientMembers.userId, user.sub)));
    if (member) return project;
  }
  throw missing;
}
