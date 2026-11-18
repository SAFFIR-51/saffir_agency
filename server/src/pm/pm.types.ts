/** JWT에서 꺼낸 로그인 사용자 (auth/strategies/jwt.strategy.ts) */
export type AuthUser = { sub: number; name: string; email: string; role: string };

export const isStaff = (u?: AuthUser) => u?.role === 'admin' || u?.role === 'staff';

export const PM_STAGES = ['착수', '기획', '디자인', '개발', '검수', '운영'] as const;
export const TASK_STATUSES = ['할 일', '진행 중', '검토', '완료', '보류'] as const;
export const REQUEST_KINDS = ['수정 요청', '장애 신고', '문의'] as const;
export const REQUEST_STATUSES = ['접수', '확인', '처리 중', '완료'] as const;
export const REQUEST_PRIORITIES = ['긴급', '높음', '보통', '낮음'] as const;
export const DELIVERABLE_STATUSES = ['작성 중', '승인 요청', '수정 요청', '승인 완료'] as const;

/** 한국 시간 YYYY-MM-DD */
export function todayKST(now = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(now);
}

/** 화면과 같은 요청 번호 (REQ-001) */
export const reqCode = (id: number) => `REQ-${String(id).padStart(3, '0')}`;
