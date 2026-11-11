/**
 * 자주 묻는 질문 (초안). 기획서에 있는 사실만으로 썼다. 공개 전 담당자 검토 필요 (docs/TODO.md).
 * services가 있으면 해당 서비스 페이지의 FAQ 섹터에도 같이 보인다.
 */
export type FaqCategory = "common" | "hospital" | "solution" | "billing";
export type FaqService =
  "geo" | "ad-check" | "hospital-website" | "crm" | "connect" | "erp" | "ai-chatbot";

type FaqItem = {
  q: string;
  a: string;
  category: FaqCategory;
  services?: FaqService[];
};

const faqItems: FaqItem[] = [
  // 공통
  {
    category: "common",
    q: "요금에 부가세가 포함되어 있나요?",
    a: "네. 사이트에 나온 모든 금액은 VAT 포함입니다.",
  },
  {
    category: "common",
    q: "솔루션은 어디에 설치되나요?",
    a: "고객사 전용 서버에 따로 세팅합니다. 사피어 포털에는 그 서버로 가는 바로가기와 서버 상태, 청구가 있습니다.",
    services: ["crm", "connect", "erp", "ai-chatbot"],
  },
  {
    category: "common",
    q: "데이터는 누구 소유인가요?",
    a: "구축형 솔루션의 데이터는 고객사 소유입니다.",
    services: ["crm", "connect", "erp", "ai-chatbot"],
  },
  {
    category: "common",
    q: "진행 상황은 어떻게 확인하나요?",
    a: "포털에서 단계별 진행률과 산출물, 주간 보고를 보고, 단계마다 확인·승인합니다.",
  },
  // 병원 솔루션
  {
    category: "hospital",
    q: "무료 진단에 로그인이 필요한가요?",
    a: "아니요. 홈페이지 주소만 넣으면 총점, 영역별 점수, 우선 개선 항목을 보여 드립니다. 전체 근거와 수정 코드는 무료 회원가입 후 볼 수 있습니다.",
    services: ["geo"],
  },
  {
    category: "hospital",
    q: "무료와 유료 구독은 무엇이 다른가요?",
    a: "한 번 보는 진단은 무료입니다. 매달 재진단, AI 가시성 측정, 점수 추이처럼 계속 지켜보는 기능은 구독입니다.",
    services: ["geo"],
  },
  {
    category: "hospital",
    q: "의료광고 검사 결과는 법률 자문인가요?",
    a: "아닙니다. 의료법 제56조에 걸릴 수 있는 표현을 미리 찾아 드리는 참고 도구입니다.",
    services: ["ad-check"],
  },
  {
    category: "hospital",
    q: "의료광고 검사는 몇 번까지 무료인가요?",
    a: "무료 회원은 월 5회, 모니터링 이상 구독은 무제한입니다.",
    services: ["ad-check"],
  },
  {
    category: "hospital",
    q: "병원 홈페이지 기본형에도 AI 검색 최적화가 들어가나요?",
    a: "네. 기본형에 GEO 기본 세팅이 포함됩니다. 표준형은 구조화데이터 전체와 의료광고 문구 점검까지 포함합니다.",
    services: ["hospital-website"],
  },
  {
    category: "hospital",
    q: "홈페이지를 납품받은 뒤 관리는 어떻게 하나요?",
    a: "GEO 관리형(월 550,000원)이나 단순 유지보수(월 33,000원) 중에서 고릅니다.",
    services: ["hospital-website"],
  },
  {
    category: "hospital",
    q: "환자 정보는 안전한가요?",
    a: "병원별 전용 서버와 DB에 따로 저장하고 암호화, 접근 권한, 백업 정책을 적용합니다. 자세한 내용은 보안·데이터 정책에서 볼 수 있습니다.",
    services: ["crm"],
  },
  {
    category: "hospital",
    q: "리콜 문자를 보내도 문제없나요?",
    a: "리콜 문자는 광고성 정보에 해당할 수 있어 수신 동의 확인과 야간 발송 제한 기능을 둡니다.",
    services: ["crm"],
  },
  {
    category: "hospital",
    q: "EMR과 연동되나요?",
    a: "스탠다드 요금제에서 연동을 협의합니다.",
    services: ["crm"],
  },
  {
    category: "hospital",
    q: "도입 전에 써 볼 수 있나요?",
    a: "데모를 신청하면 샘플 병원 데이터가 들어간 데모 환경의 체험 계정을 기한을 정해 드립니다.",
    services: ["crm"],
  },
  // 비즈니스 솔루션
  {
    category: "solution",
    q: "커머스 연동은 어떤 마켓을 지원하나요?",
    a: "스마트스토어, 쿠팡, 카페24, 워드로브를 지원합니다. 기본 세팅은 마켓 2곳이고, 마켓을 더하면 세팅비가 따로 듭니다.",
    services: ["connect"],
  },
  {
    category: "solution",
    q: "ERP는 한 번에 바꿔야 하나요?",
    a: "아니요. 1단계 진단·설계부터 시작해 단계적으로 바꾸고, 쓰던 데이터를 옮겨 드립니다.",
    services: ["erp"],
  },
  {
    category: "solution",
    q: "AI 챗봇을 사내망에 설치할 수 있나요?",
    a: "폐쇄망 설치가 가능합니다. PoC로 먼저 확인한 뒤 넓혀 갑니다.",
    services: ["ai-chatbot"],
  },
  {
    category: "solution",
    q: "AI 사용료는 어떻게 내나요?",
    a: "AI API 사용량은 월 이용료와 별도로 정산합니다.",
    services: ["ai-chatbot"],
  },
  // 결제·환불
  {
    category: "billing",
    q: "구독은 어떻게 결제되고, 해지는 어디서 하나요?",
    a: "1개월 단위로 매월 자동 결제됩니다. 포털 청구·결제에서 해지할 수 있습니다.",
    services: ["geo"],
  },
  {
    category: "billing",
    q: "어떤 결제 수단을 쓸 수 있나요?",
    a: "단건 결제는 카드, 계좌이체, 가상계좌를 쓸 수 있고, 구독은 카드 자동결제로 냅니다.",
  },
  {
    category: "billing",
    q: "서버 운영비는 어떻게 정해지나요?",
    a: "사용 규모 구간(스타터, 스탠다드, 프로, 엔터프라이즈)에 따라 정하고, 실제 사용량을 근거로 매달 청구합니다.",
    services: ["crm", "connect", "erp", "ai-chatbot"],
  },
  {
    category: "billing",
    q: "맞춤 개발은 어떻게 결제하나요?",
    a: "계약금과 잔금으로 나눠 냅니다. 정찰가 패키지의 계약금은 요금 안내에서 바로 결제할 수 있습니다.",
  },
  {
    category: "billing",
    q: "세금계산서를 받을 수 있나요?",
    a: "포털 청구·결제에서 결제 건별로 영수증과 세금계산서를 요청할 수 있습니다.",
  },
];

export function faqByCategory(category: FaqCategory) {
  return faqItems.filter((item) => item.category === category);
}

/** 서비스 페이지 FAQ 섹터용 */
export function faqForService(service: FaqService) {
  return faqItems.filter((item) => item.services?.includes(service)).map(({ q, a }) => ({ q, a }));
}
