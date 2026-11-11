import { faqForService } from "@/content/faq";
import type { Route } from "next";
import { routes } from "@/shared/config";
import type { SolutionPageContent } from "@/shared/sections";

export const geoContent: SolutionPageContent = {
  path: routes.hospital.geo,
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
  faq: faqForService("geo"),
  cta: { label: "무료 진단하기", href: `${routes.hospital.geo}#diagnosis` },
  secondaryCta: { label: "요금 보기", href: `${routes.pricing}#geo` },
};

/** 진단 결과 아래 세 갈래. action은 전환 이벤트(geo_result_cta_clicked) 속성으로 남긴다 */
export const geoResultActions: {
  action: "signup" | "fix" | "track";
  label: string;
  href: Route;
}[] = [
  {
    action: "signup",
    label: "가입하고 전체 보기",
    href: routes.auth.signupFrom(`${routes.hospital.geo}#diagnosis`),
  },
  { action: "fix", label: "사피어가 고쳐드립니다", href: routes.contactFor("geo-fix") },
  { action: "track", label: "매달 추적하기", href: `${routes.pricing}#geo` },
];

/** 진단 결과 중 가입해야 보이는 부분 */
export const geoLockedResult = "전체 근거 · 수정 코드 (가입하면 바로 열립니다)";

export const adCheckContent: SolutionPageContent = {
  path: routes.hospital.adCheck,
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
  faq: faqForService("ad-check"),
  cta: { label: "무료 검사하기", href: `${routes.hospital.adCheck}#check` },
  secondaryCta: { label: "AI 검색 최적화 보기", href: routes.hospital.geo },
};

export const adCheckDisclaimer = "검사 결과는 참고용이며 법률 자문이 아닙니다.";

export const adCheckLimits = [
  { plan: "무료 (회원)", limit: "월 5회" },
  { plan: "모니터링 이상 구독", limit: "무제한" },
];

/** 무료 진단 상태별 화면 (상태 화면 정의) */
export const geoDiagnosisStates = [
  { state: "입력 전", screen: "주소 입력창, 진단 항목 안내", next: "무료 진단하기" },
  {
    state: "진단 중",
    screen: "진행 단계 (사이트 접속 → 항목 검사 → 점수 계산), 예상 시간",
    next: "기다리기 (창을 닫아도 가입하면 기록에서 다시 볼 수 있음)",
  },
  {
    state: "결과",
    screen: "총점, 영역별 점수, 우선 개선 항목 3개. 전체 근거·수정 코드는 잠금",
    next: "가입하고 전체 보기 / 사피어가 고쳐드립니다 / 매달 추적하기",
  },
  {
    state: "실패 · 주소 오류",
    screen: "주소 형식을 확인해 달라는 안내",
    next: "주소 고쳐서 다시 진단",
  },
  {
    state: "실패 · 접속 불가·시간 초과",
    screen: "사이트에 접속할 수 없었다는 안내와 흔한 원인",
    next: "다시 시도 / 상담 신청",
  },
];

/** 의료광고 검사 상태별 화면 */
export const adCheckStates = [
  { state: "입력 전", screen: "문구 입력창, 법률 자문이 아니라는 고지", next: "무료 검사하기" },
  { state: "검사 중", screen: "진행 표시", next: "기다리기" },
  {
    state: "결과 · 위험 표현 있음",
    screen: "위험 표현 강조, 이유(의료법 제56조 항목), 바꿔 쓸 문구 예시",
    next: "가입하고 기록 저장 / 문구 점검·제작 상담",
  },
  {
    state: "결과 · 위험 표현 없음",
    screen: "찾은 위험 표현이 없다는 안내와 고지",
    next: "가입하고 기록 저장",
  },
  {
    state: "무료 횟수 초과",
    screen: "이번 달 무료 검사(월 5회)를 다 썼다는 안내",
    next: "구독하면 무제한 / 다음 달에 다시",
  },
  {
    state: "실패",
    screen: "검사하지 못했다는 안내 (글자 수 초과 등)",
    next: "문구 줄여서 다시 검사",
  },
];
