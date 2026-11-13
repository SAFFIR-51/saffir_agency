import { faqForService } from "@/content/faq";
import { routes } from "@/shared/config";
import type { SalesPageContent } from "@/shared/sections";

/**
 * AI 검색 최적화 세부 페이지 문구 (기획서 "서비스별 페이지 구성" 기준, 판매용으로 다듬음).
 * "네이버 AI" 표기는 측정 확인 전이라 쓰지 않는다 (docs/TODO.md).
 */
export const geoSales: SalesPageContent = {
  path: routes.hospital.geo,
  name: "사피어 AI 검색 최적화",
  message: "AI 검색에서 우리 병원이 어떻게 보이는지 무료로 진단하고, 매달 추적합니다.",
  parent: { label: "병원 솔루션", href: routes.hospital.root },
  headline: ["AI에게 병원을 물었을 때,", "우리 병원이 나오나요?"],
  lead: "홈페이지 주소만 넣으면 AI 검색에 잘 보이는지 무료로 진단합니다. 무엇부터 고칠지 우선순위까지 알려 드립니다.",
  points: ["로그인 없이 무료 진단", "8개 분야 50여 항목", "우선 개선 항목까지"],
  problems: [
    "AI 검색에서 우리 병원이 어떻게 보이는지 모른다",
    "무엇부터 고쳐야 할지 판단하기 어렵다",
    "고친 뒤 실제로 좋아졌는지 확인할 방법이 없다",
  ],
  features: [
    { title: "주소만 넣으면 무료 진단", detail: "로그인 없이 바로 결과를 봅니다." },
    {
      title: "8개 분야 50여 항목",
      detail: "AI 검색에 영향을 주는 항목을 분야별로 빠짐없이 봅니다.",
    },
    {
      title: "점수와 우선 개선 항목",
      detail: "총점, 영역별 점수, 무엇부터 고칠지를 알려 드립니다.",
    },
    {
      title: "전체 근거와 수정 코드",
      detail: "무료로 가입하면 근거와 수정 코드를 열고 진단 기록을 저장합니다.",
    },
    {
      title: "매달 추적",
      detail: "구독하면 매달 재진단, AI 가시성 측정, 점수 추이, 경쟁 병원 비교를 받습니다.",
    },
  ],
  screens: ["샘플 리포트 · 총점과 영역별 점수", "샘플 리포트 · 우선 개선 항목과 수정 코드"],
  cases: [],
  process: [
    { step: "무료 진단", detail: "홈페이지 주소를 넣고 결과를 봅니다." },
    { step: "무료 회원가입", detail: "전체 근거와 수정 코드를 보고 기록을 저장합니다." },
    { step: "구독", detail: "모니터링·프로 등급으로 매달 추적합니다." },
    { step: "개선", detail: "직접 고치기 어려우면 홈페이지 제작을 상담합니다." },
    { step: "관리", detail: "납품 후 관리형으로 매달 관리합니다." },
  ],
  faq: faqForService("geo"),
  cta: { label: "무료 진단하기", href: `${routes.hospital.geo}#diagnosis` },
  secondaryCta: { label: "사피어에 맡기기", href: routes.contactFor("geo-fix") },
  closing: {
    title: "지금 우리 병원 점수부터 확인하세요",
    text: "주소만 넣으면 됩니다. 로그인도 결제도 필요 없습니다.",
  },
};

/** 진단 결과 다음에 고르는 세 갈래 (전환 이벤트 action 값과 같다) */
export const geoNextSteps = [
  {
    action: "signup",
    title: "직접 고치기",
    detail: "무료로 가입하고 전체 근거와 수정 코드를 봅니다.",
    label: "가입하고 전체 보기",
    href: routes.auth.signupFrom(`${routes.hospital.geo}#diagnosis`),
  },
  {
    action: "fix",
    title: "사피어에 맡기기",
    detail: "고치기 어렵다면 사피어가 대신 고쳐 드립니다.",
    label: "개선 상담",
    href: routes.contactFor("geo-fix"),
  },
  {
    action: "track",
    title: "매달 추적하기",
    detail: "모니터링 구독으로 매달 점수와 AI 노출을 확인합니다.",
    label: "구독 요금 보기",
    href: `${routes.hospital.geo}#sp-pricing`,
  },
] as const;

/** 의료광고 검사기 세부 페이지 문구 */
export const adCheckSales: SalesPageContent = {
  path: routes.hospital.adCheck,
  name: "사피어 의료광고 검사기",
  message: "의료법 제56조에 걸릴 수 있는 광고 표현을 게시 전에 미리 찾아 드립니다.",
  parent: { label: "병원 솔루션", href: routes.hospital.root },
  headline: ["광고 올리기 전,", "위험한 표현부터 확인하세요"],
  lead: "광고 문구를 붙여 넣으면 의료법 제56조에 걸릴 수 있는 표현을 찾아 표시합니다. 회원은 월 5회 무료로 쓸 수 있습니다.",
  points: ["회원 월 5회 무료", "위험 표현 바로 표시", "검사 기록 저장"],
  problems: [
    "광고 문구가 의료법에 걸리는지 확인하기 어렵다",
    "대행사가 써 준 문구를 그대로 올려도 되는지 불안하다",
  ],
  features: [
    {
      title: "위험 표현 표시",
      detail: "문구를 넣으면 의료법 제56조에 걸릴 수 있는 표현을 찾아 강조합니다.",
    },
    { title: "이유와 바꿔 쓸 예시", detail: "왜 위험한지와 바꿔 쓸 문구 예시를 함께 봅니다." },
    { title: "검사 기록 저장", detail: "회원은 검사한 문구와 결과를 저장해 다시 볼 수 있습니다." },
  ],
  screens: [],
  cases: [],
  process: [
    { step: "문구 입력", detail: "검사할 광고 문구를 붙여 넣습니다." },
    { step: "결과 확인", detail: "위험 표현과 이유를 확인합니다." },
    { step: "다시 검사", detail: "고친 문구를 다시 검사합니다." },
  ],
  faq: faqForService("ad-check"),
  cta: { label: "무료 검사하기", href: `${routes.hospital.adCheck}#check` },
  secondaryCta: { label: "AI 검색 최적화 보기", href: routes.hospital.geo },
  closing: {
    title: "광고 올리기 전에 한 번 더 확인하세요",
    text: "회원은 월 5회 무료, 모니터링 이상 구독 중이면 무제한입니다.",
  },
};
