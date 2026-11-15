/**
 * 프로젝트 관리 데이터 (어드민에서 쓰고, 고객 공개 항목만 포털로 나간다).
 * 실제 DB를 붙여도 이 모양을 유지한다. 날짜는 모두 "YYYY-MM-DD".
 */
export const PM_STAGES = ["착수", "기획", "디자인", "개발", "검수", "운영"] as const;
export type PmStage = (typeof PM_STAGES)[number];

export const TASK_STATUSES = ["할 일", "진행 중", "검토", "완료", "보류"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const REQUEST_STATUSES = ["접수", "확인", "처리 중", "완료"] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export const REQUEST_PRIORITIES = ["긴급", "높음", "보통", "낮음"] as const;
export type RequestPriority = (typeof REQUEST_PRIORITIES)[number];

/** 고객사: 포털 계정(accountIds)으로 로그인한 사람이 이 고객사의 공개 항목을 본다 */
export type PmClient = { id: string; name: string; accountIds: string[] };

export type Milestone = {
  id: string;
  title: string;
  stage: PmStage;
  due: string;
  doneAt?: string;
  /** 고객 포털에 보일지 */
  shared: boolean;
};

export type Task = {
  id: string;
  title: string;
  /** 타임라인 막대 시작 (없으면 마감 1주 전) */
  start?: string;
  stage: PmStage;
  assignee: string;
  due: string;
  status: TaskStatus;
  doneAt?: string;
  /** 주간 보고 초안에 넣고 고객에게 보일지 */
  shared: boolean;
};

export type Report = {
  id: string;
  /** 그 주 월요일 */
  weekOf: string;
  done: string;
  next: string;
  issues: string;
  /** 고객 확인이 필요한 것 */
  asks: string;
  sharedAt?: string;
  updatedAt: string;
  author: string;
};

export type Meeting = {
  id: string;
  date: string;
  title: string;
  attendees: string;
  decisions: string;
  actions: string;
  sharedAt?: string;
};

export type PmRequest = {
  id: string;
  clientId: string;
  projectId?: string;
  kind: "수정 요청" | "장애 신고" | "문의";
  title: string;
  body: string;
  from: string;
  createdAt: string;
  status: RequestStatus;
  priority: RequestPriority;
  assignee: string;
  /** 고객에게 보이는 답변 */
  reply?: string;
  repliedAt?: string;
  /** 내부 메모 (고객에게 안 보임) */
  memo?: string;
};

export type PmProject = {
  id: string;
  clientId: string;
  name: string;
  pm: string;
  start: string;
  end: string;
  stage: PmStage;
  milestones: Milestone[];
  tasks: Task[];
  reports: Report[];
  meetings: Meeting[];
  deliverables: Deliverable[];
  activity: Activity[];
  /** 끝난 프로젝트 보관 (목록 아래로, 대시보드에서 빠짐) */
  archivedAt?: string;
};

export const DELIVERABLE_STATUSES = ["작성 중", "승인 요청", "수정 요청", "승인 완료"] as const;
export type DeliverableStatus = (typeof DELIVERABLE_STATUSES)[number];

/** 산출물: 올리고 → 고객에게 승인 요청 → 고객이 승인하거나 수정 요청 */
export type Deliverable = {
  id: string;
  stage: PmStage;
  name: string;
  version: string;
  link: string;
  note: string;
  status: DeliverableStatus;
  /** 연결된 마일스톤 (승인되면 같이 완료) */
  milestoneId?: string;
  requestedAt?: string;
  decidedAt?: string;
  decidedBy?: string;
  feedback?: string;
  updatedAt: string;
};

/** 변경 기록 */
export type Activity = { at: string; who: string; text: string };

export type PmNotification = { clientId: string; date: string; text: string };

export type ProjectHealth = "정상" | "주의" | "지연";
