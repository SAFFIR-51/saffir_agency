/** 요금 데이터 (기획서 "요금 체계", VAT 포함, 2026-11 제안가) */
export type Plan = {
  id: string;
  name: string;
  includes: string;
  /** 원 단위. null 이면 별도 견적 */
  monthly?: number | null;
  setup?: number | null;
  note?: string;
};

export const geoPlans: Plan[] = [
  {
    id: "geo-free",
    name: "무료",
    includes: "1회 진단, 가입 시 전체 근거·수정 코드, 의료광고 검사 월 5회",
    monthly: 0,
  },
  {
    id: "geo-monitoring",
    name: "모니터링",
    includes:
      "월 재진단, AI 가시성 월 1회 측정(질문 20개 × AI 4종), 점수 추이, 의료광고 검사 무제한",
    monthly: 49000,
  },
  {
    id: "geo-pro",
    name: "프로",
    includes: "모니터링 + 주간 측정(질문 50개), 경쟁 병원 3곳 비교, 월간 PDF 리포트",
    monthly: 149000,
  },
  {
    id: "geo-managed",
    name: "관리형",
    includes: "프로 + 수정 반영 대행, 구조화데이터 세팅, 월 콘텐츠 4편, 홈페이지 유지보수 포함",
    monthly: 550000,
  },
];

export const solutionPlans: Plan[] = [
  {
    id: "crm-basic",
    name: "병원 CRM 베이직 (의사 1~2인)",
    includes: "스타터 서버 포함, 데이터 이관 포함",
    setup: 990000,
    monthly: 220000,
  },
  {
    id: "crm-standard",
    name: "병원 CRM 스탠다드 (의사 3~5인)",
    includes: "스탠다드 서버 포함, EMR 연동 협의",
    setup: 1650000,
    monthly: 440000,
  },
  {
    id: "crm-network",
    name: "병원 CRM 네트워크 (다지점)",
    includes: "지점 통합 대시보드",
    setup: null,
    monthly: null,
  },
  {
    id: "connect",
    name: "커머스 연동",
    includes: "마켓 2곳, 마켓 추가 시 세팅비 별도",
    setup: 2200000,
    monthly: 165000,
  },
  {
    id: "erp",
    name: "업무 통합 ERP",
    includes: "1단계 진단·설계, 구축 후 견적, 단계별 계약",
    setup: 1100000,
    monthly: null,
  },
  {
    id: "ai-chatbot",
    name: "AI 챗봇",
    includes: "PoC, AI API 사용량 별도 정산",
    setup: 2200000,
    monthly: 220000,
    note: "월 이용료 220,000원~",
  },
];

export const hospitalWebsitePlans: Plan[] = [
  {
    id: "web-basic",
    name: "기본형",
    includes:
      "유니크 3면 + 반복 7면, 검색 등록, GA4, GEO 기본 세팅, 네이버 예약·카카오 채널 연결 (3~4주)",
    setup: 1650000,
  },
  {
    id: "web-standard",
    name: "표준형",
    includes:
      "기본형 + 진료항목별 페이지(최대 20면), 예약·상담 동선, 구조화데이터 전체, 의료광고 문구 점검 (5~6주)",
    setup: 3850000,
  },
  {
    id: "web-premium",
    name: "프리미엄",
    includes: "표준형 + 맞춤 디자인, 다국어, CRM 연동, 관리자 기능 확장 (8주~)",
    setup: 7700000,
    note: "7,700,000원~",
  },
  { id: "web-maintenance", name: "단순 유지보수", includes: "납품 후 월 유지보수", monthly: 33000 },
];

export const serverTiers: Plan[] = [
  {
    id: "server-starter",
    name: "스타터",
    includes: "월 방문 1만 명 이하, 저장공간 10GB",
    monthly: 55000,
  },
  {
    id: "server-standard",
    name: "스탠다드",
    includes: "월 방문 10만 명 이하, 저장공간 50GB",
    monthly: 165000,
  },
  {
    id: "server-pro",
    name: "프로",
    includes: "월 방문 50만 명 이하, 저장공간 200GB",
    monthly: 440000,
  },
  {
    id: "server-enterprise",
    name: "엔터프라이즈",
    includes: "그 이상, 전용 인프라",
    monthly: null,
  },
];

export const overage = { storagePer10GB: 11000, trafficPer100GB: 22000 };

export const messageUnitPrices = { alimtalk: 15, sms: 25, lms: 60 };

export const outsourcingDeposits: Plan[] = [
  {
    id: "dev-website-deposit",
    name: "홈페이지 제작 계약금",
    includes: "정찰가 패키지",
    setup: 1100000,
  },
  { id: "dev-mvp-deposit", name: "웹앱 MVP 계약금", includes: "정찰가 패키지", setup: 2200000 },
];

export const hospitalGrowthBundle = {
  name: "병원 성장 패키지",
  includes: ["geo-managed", "crm-basic"],
  includesLabel: "GEO 관리형 + 병원 CRM 베이직",
  monthly: 690000,
  benefit: "홈페이지를 새로 만드는 병원은 12개월 이용 시 기본형 제작비 50% 할인",
};

/** AI 검색 최적화 요금 원칙 */
export const geoPricingHeadline = "한 번 보는 정보는 무료, 계속 지켜보는 건 유료";

/** 메시지 발송(CRM) 건별 단가 표시용 */
export const messagePriceRows = [
  { name: "알림톡", unit: messageUnitPrices.alimtalk },
  { name: "문자(SMS)", unit: messageUnitPrices.sms },
  { name: "장문(LMS)", unit: messageUnitPrices.lms },
];

export const messagePriceNote = "메시지 발송(CRM)은 건별로 받습니다.";

export const serverTierNotes = [
  "구간을 넘는 사용량은 저장공간 10GB당 11,000원, 트래픽 100GB당 22,000원으로 정산합니다.",
];

export const hospitalWebsiteNotes = [
  "납품 후에는 GEO 관리형(월 550,000원)이나 단순 유지보수(월 33,000원)를 선택합니다.",
];

export const outsourcingNotes = ["나머지 맞춤형 개발은 견적 요청으로 받습니다."];

/** 결제 유형 (기획서 "결제와 토스페이먼츠 심사") */
export const paymentTypes = [
  {
    type: "단건 결제",
    products: "홈페이지 기본형, 외주 계약금, 솔루션 세팅비",
    where: "요금 페이지 → 주문서",
    toss: "결제창 (카드·계좌이체·가상계좌)",
  },
  {
    type: "정액 구독",
    products: "GEO 등급, 솔루션 월 이용료",
    where: "포털 구독 관리",
    toss: "자동결제(빌링)",
  },
  {
    type: "변동 청구",
    products: "서버 운영비, 메시지 발송료, 외주 잔금",
    where: "포털 청구 목록",
    toss: "결제창, 자동결제 등록 고객은 확정 금액 자동 승인",
  },
];

/** 가격 근거 — 내부 검토용. 공개 페이지에 노출하지 않는다. */
export const priceBenchmarks = [
  {
    field: "AI 가시성 도구",
    competitor: "Otterly.AI Lite",
    price: "$29/월 (질문 15개)",
    ours: "모니터링 49,000원 (질문 20개)",
    judgement: "비슷한 가격, 병원 특화·한국어·네이버 진단 포함",
  },
  {
    field: "AI 가시성 도구",
    competitor: "Peec AI Starter",
    price: "$95/월 (질문 50개)",
    ours: "프로 149,000원 (질문 50개)",
    judgement: "비슷한 가격, 경쟁 병원 비교 포함",
  },
  {
    field: "병원 GEO 대행",
    competitor: "크몽 병원 AEO·GEO",
    price: "1,320,000~2,420,000원/30일",
    ours: "관리형 550,000원",
    judgement: "블로그 물량 대신 홈페이지 자체 개선으로 절반 이하 가격",
  },
  {
    field: "병원 홈페이지",
    competitor: "크몽 병원 홈페이지 스탠다드",
    price: "1,650,000원~ (15면, 20일)",
    ours: "기본형 1,650,000원",
    judgement: "같은 가격, GEO 세팅 포함",
  },
  {
    field: "병원 CRM",
    competitor: "톡CRM 스탠다드",
    price: "1인당 40,000원, 최소 5인 (월 200,000원~)",
    ours: "베이직 220,000원",
    judgement: "비슷한 가격, 병원 전용 서버·사용자 수 무관",
  },
  {
    field: "병원 CRM",
    competitor: "톡CRM 프리미엄",
    price: "1인당 40,000원, 최소 10인 (월 400,000원~)",
    ours: "스탠다드 440,000원",
    judgement: "비슷한 가격",
  },
  {
    field: "병원 CRM 제작",
    competitor: "크몽 병원 CRM 제작",
    price: "1,500,000~3,000,000원 (1회)",
    ours: "세팅비 990,000~1,650,000원 + 월 이용료",
    judgement: "초기 부담은 낮고 업데이트·운영 포함",
  },
  {
    field: "홈페이지 유지보수",
    competitor: "크몽 유지보수 시세",
    price: "월 5만 원대~20만 원대 (평균 20만 원대)",
    ours: "33,000원 / 관리형 550,000원",
    judgement: "저가 입문 + 고급 관리",
  },
];

export const priceBenchmarkNotes = [
  "가격 근거는 2026년 11월 기준 경쟁사 공개 가격입니다.",
  "크몽 가격에는 결제 수수료 4.5%가 별도로 붙습니다.",
  "해외 도구는 달러 1,450원 안팎으로 보고 비교했습니다.",
];
