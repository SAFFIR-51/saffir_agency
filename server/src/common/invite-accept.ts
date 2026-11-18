import { BadRequestException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import type { DrizzleDb } from '../db/db.module';
import { clientMembers, invites } from '../db/schema';

/**
 * 초대 수락: 토큰이 살아 있고 초대받은 이메일과 같은 계정이면 그 고객사에 연결한다.
 * 회원가입(auth)과 로그인 뒤 수락(pm) 양쪽에서 쓴다.
 */
export async function acceptInvite(db: DrizzleDb, token: string, user: { id: number; email: string }) {
  const [invite] = await db.select().from(invites).where(eq(invites.token, token));
  if (!invite || invite.acceptedAt || invite.expiresAt < new Date()) {
    throw new BadRequestException('만료되었거나 이미 사용된 초대입니다. 담당자에게 다시 요청해 주세요.');
  }
  if (invite.email.toLowerCase() !== user.email.toLowerCase()) {
    throw new BadRequestException(`이 초대는 ${invite.email} 계정용입니다. 그 이메일로 로그인해 주세요.`);
  }
  await db
    .insert(clientMembers)
    .values({ clientId: invite.clientOrgId, userId: user.id, role: 'member' })
    .onConflictDoNothing();
  await db
    .update(invites)
    .set({ acceptedAt: new Date(), acceptedUserId: user.id })
    .where(and(eq(invites.id, invite.id)));
  return { clientOrgId: invite.clientOrgId };
}
