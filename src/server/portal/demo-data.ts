import "server-only";
import type { GeoData, PortalData, Project, SolutionItem } from "./types";

/**
 * 데모 계정별 샘플 데이터. 이름·금액은 모두 예시다 (실제 고객 아님).
 * 금액은 요금 안내의 제안가를 따른다.
 */
const project: Project = {
  id: "demo-mvp",
  name: "자사몰 웹앱 MVP",
  stage: "개발",
  progress: 62,
  period: "2026-09-15 ~ 2026-12-20",
  nextMilestone: "개발 2차 테스트 주소 전달 (11-21)",
  schedule: [
    { stage: "착수", planned: "09-15", done: "09-15" },
    { stage: "기획", planned: "09-30", done: "10-02" },
    { stage: "디자인", planned: "10-20", done: "10-22" },
    { stage: "개발", planned: "11-28" },
    { stage: "검수", planned: "12-12" },
    { stage: "운영", planned: "12-20" },
  ],
  deliverables: [
    { stage: "기획", name: "화면 정의서 v1.2", status: "승인 완료", date: "10-02" },
    { stage: "디자인", name: "디자인 시안 v2", status: "승인 완료", date: "10-22" },
    { stage: "개발", name: "개발 1차 테스트 주소", status: "승인 대기", date: "11-07" },
    { stage: "개발", name: "개발 2차 테스트 주소", status: "작성 중", date: "11-21 예정" },
  ],
};

const crm: SolutionItem = {
  name: "사피어 병원 CRM",
  plan: "베이직 (의사 1~2인)",
  since: "2026-09-01",
  server: "정상",
  tier: "스타터 (요금제에 포함)",
  usage: { visits: 6200, storageGB: 4.1, trafficGB: 38 },
  versions: [
    { version: "1.3.0", date: "2026-11-04", note: "리콜 메시지 야간 발송 제한 시간 설정" },
    { version: "1.2.1", date: "2026-10-15", note: "재진율 대시보드 기간 필터" },
  ],
};

const geoSubscriber: GeoData = {
  site: "https://derma.demo.saffir.co.kr",
  latest: {
    date: "2026-11-01",
    score: 78,
    areas: [
      { name: "검색 노출 기본", score: 85 },
      { name: "구조화데이터", score: 72 },
      { name: "진료 정보 콘텐츠", score: 70 },
      { name: "신뢰 신호", score: 81 },
    ],
    priorities: [
      "진료과목 페이지에 FAQ 구조화데이터 추가",
      "의료진 소개에 자격·경력 표시",
      "오시는 길 페이지 주소 표기 통일",
    ],
  },
  history: [
    { date: "2026-08-01", score: 61 },
    { date: "2026-09-01", score: 68 },
    { date: "2026-10-01", score: 74 },
    { date: "2026-11-01", score: 78 },
  ],
  visibility: [
    { ai: "ChatGPT", appeared: 9, asked: 20 },
    { ai: "Gemini", appeared: 7, asked: 20 },
    { ai: "Perplexity", appeared: 11, asked: 20 },
    { ai: "네이버 AI", appeared: 6, asked: 20 },
  ],
  adChecks: [
    { date: "2026-11-05", summary: "레이저 시술 이벤트 문구", risks: 2 },
    { date: "2026-10-20", summary: "의료진 소개 문구", risks: 0 },
  ],
};

const geoMember: GeoData = {
  site: "https://dental.demo.saffir.co.kr",
  latest: {
    date: "2026-11-03",
    score: 58,
    areas: [
      { name: "검색 노출 기본", score: 70 },
      { name: "구조화데이터", score: 35 },
      { name: "진료 정보 콘텐츠", score: 55 },
      { name: "신뢰 신호", score: 62 },
    ],
    priorities: ["병원 정보 구조화데이터 추가", "진료 항목별 페이지 분리", "모바일 속도 개선"],
  },
  history: [{ date: "2026-11-03", score: 58 }],
  adChecks: [{ date: "2026-11-03", summary: "임플란트 할인 문구", risks: 3 }],
  adCheckFreeLeft: 4,
};

const base = {
  notifications: [],
  projects: [],
  reports: [],
  meetings: [],
  requests: [],
  solutions: [],
  geo: null,
  invoices: [],
  subscription: null,
  members: [],
} satisfies Partial<PortalData>;

const demoData: Record<string, PortalData> = {
  member: {
    ...base,
    notifications: [{ date: "11-03", text: "무료 진단 결과가 저장되었습니다." }],
    geo: geoMember,
    company: { name: "데모 치과의원", businessNumber: "[ 데모 ]", taxEmail: "-" },
    members: [{ name: "데모 실장", email: "member@demo.saffir.co.kr", role: "관리자" }],
  },
  subscriber: {
    ...base,
    notifications: [
      { date: "11-01", text: "11월 재진단 완료: 78점 (+4)" },
      { date: "11-01", text: "GEO 프로 11월 구독료 결제 완료" },
    ],
    geo: geoSubscriber,
    invoices: [
      {
        id: "INV-2611-01",
        item: "GEO 프로 11월",
        kind: "구독",
        amount: 149000,
        due: "11-01",
        status: "결제 완료",
        paidAt: "11-01",
      },
      {
        id: "INV-2610-01",
        item: "GEO 프로 10월",
        kind: "구독",
        amount: 149000,
        due: "10-01",
        status: "결제 완료",
        paidAt: "10-01",
      },
    ],
    subscription: {
      name: "GEO 프로",
      amount: 149000,
      nextBilling: "2026-12-01",
      card: "[ 카드사 ] ****",
    },
    company: {
      name: "데모 피부과의원",
      businessNumber: "[ 데모 ]",
      taxEmail: "tax@derma.demo.saffir.co.kr",
    },
    members: [{ name: "데모 원장", email: "geo@demo.saffir.co.kr", role: "관리자" }],
  },
  project: {
    ...base,
    notifications: [
      { date: "11-14", text: "46주차 작업 보고가 올라왔습니다." },
      { date: "11-07", text: "개발 1차 테스트 주소를 확인하고 승인해 주세요." },
    ],
    projects: [project],
    reports: [
      {
        week: "46주차 (11-10~11-14)",
        done: "장바구니·주문 화면 개발, 결제 모듈 연동",
        next: "회원 등급 할인, 관리자 주문 관리",
        issues: "배송 업체 API 키 전달 필요",
      },
      {
        week: "45주차 (11-03~11-07)",
        done: "상품 목록·상세 개발, 1차 테스트 주소 전달",
        next: "장바구니·주문",
        issues: "없음",
      },
      {
        week: "44주차 (10-27~10-31)",
        done: "개발 환경 구성, 회원가입·로그인",
        next: "상품 목록·상세",
        issues: "없음",
      },
    ],
    meetings: [
      {
        date: "11-12",
        title: "주간 정례 미팅",
        decisions: "회원 등급 3단계로 확정, 배송비 정책은 다음 주 결정",
      },
      { date: "10-22", title: "디자인 확정 미팅", decisions: "시안 v2로 확정, 메인 배너 2종 추가" },
    ],
    requests: [
      {
        id: "REQ-031",
        kind: "수정 요청",
        title: "상품 상세 리뷰 정렬을 최신순으로",
        status: "처리 중",
        date: "11-10",
        reply: "2차 테스트 주소에 반영 예정입니다.",
      },
      {
        id: "REQ-027",
        kind: "수정 요청",
        title: "로그인 화면 문구 수정",
        status: "완료",
        date: "11-04",
        reply: "반영했습니다.",
      },
    ],
    invoices: [
      {
        id: "INV-2609-11",
        item: "웹앱 MVP 계약금",
        kind: "외주 계약금",
        amount: 2200000,
        due: "09-15",
        status: "결제 완료",
        paidAt: "09-15",
      },
      {
        id: "INV-2612-11",
        item: "웹앱 MVP 잔금 (검수 후)",
        kind: "외주 잔금",
        amount: 3300000,
        due: "12-20",
        status: "미결제",
      },
    ],
    company: {
      name: "데모 커머스",
      businessNumber: "[ 데모 ]",
      taxEmail: "tax@commerce.demo.saffir.co.kr",
    },
    members: [
      { name: "데모 팀장", email: "project@demo.saffir.co.kr", role: "관리자" },
      { name: "데모 매니저", email: "manager@commerce.demo.saffir.co.kr", role: "담당자" },
    ],
  },
  solution: {
    ...base,
    notifications: [
      { date: "11-04", text: "병원 CRM 1.3.0 업데이트가 적용되었습니다." },
      { date: "11-01", text: "10월 메시지 발송료 청구서가 발행되었습니다." },
    ],
    requests: [
      {
        id: "REQ-044",
        kind: "장애 신고",
        title: "리콜 문자 예약이 일부 발송되지 않음",
        status: "확인",
        date: "11-11",
        reply: "원인을 확인 중입니다. 오늘 안에 다시 알려 드리겠습니다.",
      },
    ],
    solutions: [crm],
    invoices: [
      {
        id: "INV-2611-21",
        item: "병원 CRM 베이직 11월 이용료",
        kind: "월 이용료",
        amount: 220000,
        due: "11-01",
        status: "결제 완료",
        paidAt: "11-01",
      },
      {
        id: "INV-2610-22",
        item: "10월 메시지 발송료 (알림톡 1,240건 × 15원)",
        kind: "메시지 발송료",
        amount: 18600,
        due: "11-15",
        status: "미결제",
      },
    ],
    company: {
      name: "데모 내과의원",
      businessNumber: "[ 데모 ]",
      taxEmail: "tax@clinic.demo.saffir.co.kr",
    },
    members: [{ name: "데모 실장", email: "solution@demo.saffir.co.kr", role: "관리자" }],
  },
};

/** 모든 서비스를 쓰는 심사용 계정: 위 데이터를 합친다 */
demoData.all = {
  notifications: [
    { date: "11-11", text: "장애 신고 REQ-044에 답변이 달렸습니다." },
    ...demoData.project.notifications,
    ...demoData.subscriber.notifications,
  ],
  projects: demoData.project.projects,
  reports: demoData.project.reports,
  meetings: demoData.project.meetings,
  requests: [...demoData.solution.requests, ...demoData.project.requests],
  solutions: demoData.solution.solutions,
  geo: geoSubscriber,
  invoices: [
    ...demoData.solution.invoices,
    ...demoData.subscriber.invoices.slice(0, 1),
    ...demoData.project.invoices,
  ],
  subscription: demoData.subscriber.subscription,
  company: {
    name: "데모 종합병원",
    businessNumber: "[ 데모 ]",
    taxEmail: "tax@hospital.demo.saffir.co.kr",
  },
  members: [
    { name: "데모 담당자", email: "review@demo.saffir.co.kr", role: "관리자" },
    { name: "데모 원무팀", email: "office@hospital.demo.saffir.co.kr", role: "담당자" },
  ],
};

export function getDemoPortalData(accountId: string): PortalData | null {
  return demoData[accountId] ?? null;
}
