import type { Route } from "next";
import { routes } from "@/shared/config";
import type { SolutionPageContent } from "@/shared/sections";

export const geoContent: SolutionPageContent = {
  eyebrow: "병원 솔루션",
  name: "사피어 AI 검색 최적화",
  message: "ChatGPT·네이버 AI가 우리 병원을 추천하는지 확인하세요.",
  problems: [
    "AI 검색이 우리 병원을 추천하는지, 어떤 부분을 고쳐야 하는지 병원이 직접 확인하기 어렵습니다.",
  ],
  features: [
    "홈페이지 주소 입력만으로 무료 진단 (로그인 불필요)",
    "8개 분야 50여 항목 진단",
    "결과: 총점, 영역별 점수, 우선 개선 항목",
    "무료 회원가입 시 전체 근거·수정 코드 열람, 진단 기록 저장",
    "유료 구독 시 매달 재진단, AI 가시성 측정, 점수 추이, 경쟁 병원 비교",
  ],
  demo: ["샘플 리포트"],
  cases: [{ title: "자체 서비스" }],
  pricingNotes: [],
  process: [
    "홈페이지 주소 입력 → 무료 진단",
    "무료 회원가입 → 전체 근거·수정 코드 열람, 진단 기록 저장",
    "GEO 구독 (모니터링·프로) → 매달 재진단과 AI 가시성 측정",
    "직접 고치기 어려우면 → 병원 홈페이지 제작·리뉴얼 상담",
    "납품 후 → GEO 관리형 + 유지보수",
  ],
  faq: [],
  cta: { label: "무료 진단하기", href: `${routes.hospital.geo}#diagnosis` },
  secondaryCta: { label: "요금 보기", href: `${routes.pricing}#geo` },
};

/** 진단 결과 화면 구성 */
export const geoResultOutline: {
  result: string[];
  nextActions: { label: string; href: Route }[];
} = {
  result: ["총점", "영역별 점수 (8개 분야)", "우선 개선 항목"],
  nextActions: [
    { label: "사피어가 고쳐드립니다 (홈페이지 제작 상담)", href: routes.hospital.website },
    { label: "매달 추적하기 (GEO 구독)", href: `${routes.pricing}#geo` },
  ],
};

export const adCheckContent: SolutionPageContent = {
  eyebrow: "병원 솔루션 · 무료 도구",
  name: "사피어 의료광고 검사기",
  message: "의료법 제56조 위험 표현을 미리 찾아드립니다.",
  problems: ["병원 광고 문구가 의료법 제56조에 걸릴 수 있는지 미리 확인하기 어렵습니다."],
  features: ["광고 문구를 입력하면 위험 표현을 찾아 결과로 보여줍니다.", "검사 기록 저장 (회원)"],
  demo: ["문구 입력창", "검사 결과"],
  cases: [{ title: "자체 서비스" }],
  pricingNotes: [
    "무료 등급: 의료광고 검사 월 5회",
    "모니터링 등급 이상 구독: 의료광고 검사 무제한",
  ],
  process: ["광고 문구 입력", "위험 표현 결과 확인", "필요하면 문구 수정 후 다시 검사"],
  faq: [],
  cta: { label: "무료 검사하기", href: `${routes.hospital.adCheck}#check` },
  secondaryCta: { label: "AI 검색 최적화 보기", href: routes.hospital.geo },
};

export const adCheckDisclaimer = "검사 결과는 참고용이며 법률 자문이 아닙니다.";

export const geoPortalItems = [
  "진단 리포트",
  "AI 가시성 (구독 고객)",
  "진단 기록",
  "의료광고 점검",
  "점수 추이, 경쟁 병원 비교 (구독 고객)",
];
