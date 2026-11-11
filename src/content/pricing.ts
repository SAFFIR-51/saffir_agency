/**
 * 요금 데이터 (기획서 "요금 체계", VAT 포함, 2026-11 제안가).
 * 원가 확인 후 대표 확정 전까지 status: "proposed" 로 둡니다.
 */
export type PriceStatus = "proposed" | "confirmed";

export type Plan = {
  id: string;
  name: string;
  includes: string;
  /** 원 단위. null 이면 별도 견적 */
  monthly?: number | null;
  setup?: number | null;
  note?: string;
};

export const priceStatus: PriceStatus = "proposed";

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
  monthly: 690000,
  note: "홈페이지 신규 제작 병원이 12개월 이용 시 기본형 제작비 50% 할인",
};
