import type { Route } from "next";
import { routes } from "@/shared/config";
import type { SolutionPageContent } from "@/shared/sections";

export const geoContent: SolutionPageContent = {
  eyebrow: "병원 솔루션",
  name: "사피어 AI 검색 최적화",
  message: "ChatGPT·네이버 AI가 우리 병원을 추천하는지 확인하세요.",
  problems: [
    "AI 검색에서 우리 병원이 어떻게 보이는지 모른다",
    "무엇부터 고쳐야 할지 판단하기 어렵다",
  ],
  features: [
    "주소만 넣으면 무료 진단 (로그인 불필요)",
    "8개 분야 50여 항목 진단",
    "총점, 영역별 점수, 우선 개선 항목",
    "가입하면 전체 근거와 수정 코드 열람, 진단 기록 저장",
    "구독하면 매달 재진단, AI 가시성 측정, 점수 추이, 경쟁 병원 비교",
  ],
  screens: ["샘플 리포트"],
  cases: [{ title: "사피어 자체 서비스" }],
  process: [
    { step: "무료 진단", detail: "홈페이지 주소를 넣고 결과를 봅니다." },
    { step: "무료 회원가입", detail: "전체 근거와 수정 코드를 보고 기록을 저장합니다." },
    { step: "구독", detail: "모니터링·프로 등급으로 매달 추적합니다." },
    { step: "개선", detail: "직접 고치기 어려우면 홈페이지 제작을 상담합니다." },
    { step: "관리", detail: "납품 후 관리형으로 매달 관리합니다." },
  ],
  faq: [],
  cta: { label: "무료 진단하기", href: `${routes.hospital.geo}#diagnosis` },
  secondaryCta: { label: "요금 보기", href: `${routes.pricing}#geo` },
};

export const geoResultActions: { label: string; href: Route }[] = [
  { label: "사피어가 고쳐드립니다", href: routes.hospital.website },
  { label: "매달 추적하기", href: `${routes.pricing}#geo` },
];

export const adCheckContent: SolutionPageContent = {
  eyebrow: "병원 솔루션 · 무료 도구",
  name: "사피어 의료광고 검사기",
  message: "의료법 제56조 위험 표현을 미리 찾아드립니다.",
  problems: ["광고 문구가 의료법에 걸리는지 확인하기 어렵다"],
  features: ["광고 문구를 넣으면 위험 표현을 찾아 표시", "검사 기록 저장 (회원)"],
  screens: [],
  cases: [{ title: "사피어 자체 서비스" }],
  process: [
    { step: "문구 입력", detail: "검사할 광고 문구를 붙여 넣습니다." },
    { step: "결과 확인", detail: "위험 표현을 확인합니다." },
    { step: "다시 검사", detail: "고친 문구를 다시 검사합니다." },
  ],
  faq: [],
  cta: { label: "무료 검사하기", href: `${routes.hospital.adCheck}#check` },
  secondaryCta: { label: "AI 검색 최적화 보기", href: routes.hospital.geo },
};

export const adCheckDisclaimer = "검사 결과는 참고용이며 법률 자문이 아닙니다.";

export const adCheckLimits = [
  { plan: "무료 (회원)", limit: "월 5회" },
  { plan: "모니터링 이상 구독", limit: "무제한" },
];
