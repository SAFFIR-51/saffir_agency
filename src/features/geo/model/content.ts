import { faqForService } from "@/content/faq";
import { routes } from "@/shared/config";
import type { FeatureRow } from "@/shared/sections";

const diagnosisHref = `${routes.hospital.geo}#diagnosis` as const;

export const geoContent = {
  path: routes.hospital.geo,
  title: "AI Search Optimization",
  name: "사피어 AI 검색 최적화",
  message:
    "AI 답변에서 우리 병원이 어떻게 소개되는지 살펴보세요. 홈페이지에서 먼저 고칠 항목을 찾고, 개선 후의 변화도 확인할 수 있습니다.",
  why: [
    "환자는 병원을 방문하기 전에 AI에 가까운 병원이나 자신의 증상에 맞는 진료를 묻기도 합니다. 진료 시간이나 위치가 페이지마다 다르거나 중요한 안내가 이미지에만 있으면 AI가 병원 정보를 참고하기 어렵습니다.",
    "사피어는 홈페이지의 진료 정보와 페이지 구조를 점검하고, 먼저 보완할 항목을 정리합니다. 이후 같은 질문을 다시 확인해 AI 답변에서 병원 정보가 어떻게 소개되는지 살펴봅니다.",
  ],
  comparison: [
    {
      before: "AI에 병원 관련 질문을 해도 우리 병원이 어떻게 소개되는지 알기 어렵습니다.",
      after: "주요 진료와 지역에 관한 질문으로 AI 답변에서 병원 언급 여부를 확인합니다.",
    },
    {
      before: "홈페이지의 어떤 정보부터 고쳐야 할지 판단하기 어렵습니다.",
      after: "진료 안내와 병원 정보, 페이지 구조를 점검하고 우선 개선 항목을 정리합니다.",
    },
    {
      before: "수정한 뒤 AI 검색에서 달라진 점을 확인하기 어렵습니다.",
      after: "구독으로 반복 측정하고 진단 점수와 AI 답변 언급 추이를 각각 확인합니다.",
    },
  ],
  features: [
    {
      title: "홈페이지 진단",
      photo: "/images/geo/feature-review-session.webp",
      photoAlt: "모니터에 표시된 내용을 가리키며 함께 검토하는 사람들",
      photoClassName: "object-cover object-[50%_56%]",
      description: "진료 정보, 구조화 데이터 등 8개 분야의 50여 항목을 점검합니다.",
      points: [
        "진료 안내와 병원 기본 정보, 페이지 구조를 살펴봅니다.",
        "총점과 영역별 점수로 보완할 부분을 확인합니다.",
        "우선 개선 항목을 정리해 무엇부터 고칠지 안내합니다.",
      ],
    },
    {
      title: "개선 근거와 수정 방법",
      photo: "/images/geo/feature-clinic-analytics.webp",
      photoAlt: "내과병원 사이트 분석 예시. 오늘 방문자 42명, 최근 7일 280명, 최근 30일 302명.",
      photoClassName: "object-cover object-left-top",
      photoUnoptimized: true,
      description: "진단 결과를 홈페이지 수정에 활용할 수 있게 정리합니다.",
      points: [
        "회원가입 후 전체 진단 근거와 수정 코드를 확인할 수 있습니다.",
        "진단 기록을 저장해 이전 결과와 비교합니다.",
        "직접 수정하기 어려운 항목은 홈페이지 개선을 상담할 수 있습니다.",
      ],
    },
    {
      title: "AI 답변 노출 추적",
      photo: "/images/geo/feature-ai-search-prompt.webp",
      photoAlt: "AI 검색창에 한성대 입구역에서 좋은 내과를 추천해 달라고 입력한 화면",
      photoClassName: "bg-black object-contain",
      photoUnoptimized: true,
      description: "구독을 통해 홈페이지 진단 결과와 AI 답변에서의 변화를 이어서 확인합니다.",
      points: [
        "같은 질문으로 다시 측정해 병원이 언급되는지 살펴봅니다.",
        "진단 점수와 AI 가시성 추이를 각각 확인합니다.",
        "프로부터는 경쟁 병원과 비교하고 월간 리포트를 확인합니다.",
      ],
    },
  ] satisfies readonly FeatureRow[],
  process: [
    { name: "무료 진단", detail: "홈페이지 주소를 기준으로 우선 개선 항목을 확인합니다." },
    { name: "결과 확인", detail: "가입 후 진단 근거와 수정 코드를 확인합니다." },
    { name: "추적", detail: "구독으로 재진단하고 AI 답변 노출을 확인합니다." },
    { name: "개선", detail: "우선순위에 따라 홈페이지를 보완합니다." },
    { name: "관리", detail: "관리형을 선택해 진단과 수정 반영을 이어갑니다." },
  ],
  measurement: [
    {
      name: "홈페이지 진단",
      detail: "진료 정보, 구조화 데이터 등 홈페이지에서 개선할 항목을 확인합니다.",
    },
    {
      name: "AI 답변 노출",
      detail: "정해진 질문에서 AI가 병원을 언급하는지 반복 측정합니다.",
    },
    {
      name: "개선 반영",
      detail: "관리형은 진단 결과를 바탕으로 홈페이지 수정까지 지원합니다.",
    },
  ],
  faq: faqForService("geo"),
  diagnosis: { label: "진단 예시 보기", href: diagnosisHref },
  pricing: { label: "요금 보기", href: "#pricing" as const },
  consult: { label: "홈페이지 개선 상담", href: routes.contactFor("geo-fix") },
};
