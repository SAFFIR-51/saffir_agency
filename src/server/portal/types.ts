/** 포털 화면 데이터 모양. 실제 DB·코어 서버를 붙여도 이 모양을 유지한다 */
export const PROJECT_STAGES = ["착수", "기획", "디자인", "개발", "검수", "운영"] as const;
type ProjectStage = (typeof PROJECT_STAGES)[number];

type Deliverable = {
  stage: ProjectStage;
  name: string;
  status: "작성 중" | "승인 대기" | "승인 완료";
  date: string;
};

export type Project = {
  id: string;
  name: string;
  stage: ProjectStage;
  progress: number;
  period: string;
  nextMilestone: string;
  schedule: { stage: ProjectStage; planned: string; done?: string }[];
  deliverables: Deliverable[];
};

type WeeklyReport = { week: string; done: string; next: string; issues: string };
type Meeting = { date: string; title: string; decisions: string };

type RequestItem = {
  id: string;
  kind: "수정 요청" | "장애 신고";
  title: string;
  status: "접수" | "확인" | "처리 중" | "완료";
  date: string;
  reply?: string;
};

export type SolutionItem = {
  name: string;
  plan: string;
  since: string;
  server: "정상" | "점검" | "장애";
  tier: string;
  usage: { visits: number; storageGB: number; trafficGB: number };
  versions: { version: string; date: string; note: string }[];
};

export type GeoData = {
  site: string;
  latest: {
    date: string;
    score: number;
    areas: { name: string; score: number }[];
    priorities: string[];
  };
  history: { date: string; score: number }[];
  /** 구독 고객만 */
  visibility?: { ai: string; appeared: number; asked: number }[];
  adChecks: { date: string; summary: string; risks: number }[];
  adCheckFreeLeft?: number;
};

type Invoice = {
  id: string;
  item: string;
  kind: "구독" | "월 이용료" | "서버 운영비" | "메시지 발송료" | "외주 계약금" | "외주 잔금";
  amount: number;
  due: string;
  status: "미결제" | "결제 완료";
  paidAt?: string;
};

type Subscription = { name: string; amount: number; nextBilling: string; card: string };

export type PortalData = {
  notifications: { date: string; text: string }[];
  projects: Project[];
  reports: WeeklyReport[];
  meetings: Meeting[];
  requests: RequestItem[];
  solutions: SolutionItem[];
  geo: GeoData | null;
  invoices: Invoice[];
  subscription: Subscription | null;
  company: { name: string; businessNumber: string; taxEmail: string };
  members: { name: string; email: string; role: "관리자" | "담당자" }[];
};
