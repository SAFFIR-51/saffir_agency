/**
 * 자주 묻는 질문 (초안). 기획서에 있는 사실만으로 썼다. 공개 전 담당자 검토 필요 (docs/TODO.md).
 * services가 있으면 해당 서비스 페이지의 FAQ 섹터에도 같이 보인다.
 */
export type FaqCategory = "common" | "hospital" | "solution" | "billing";
export type FaqService = "geo" | "hospital-website" | "crm" | "connect" | "erp" | "development";

type FaqItem = {
  q: string;
  a: string;
  category: FaqCategory;
  services?: FaqService[];
  defaultOpen?: boolean;
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
    services: ["crm", "connect", "erp"],
  },
  {
    category: "common",
    q: "데이터는 누구 소유인가요?",
    a: "구축형 솔루션의 데이터는 고객사 소유입니다.",
    services: ["crm", "connect", "erp"],
  },
  {
    category: "common",
    q: "진행 상황은 어떻게 확인하나요?",
    a: "포털에서 단계별 진행률과 산출물, 주간 보고를 보고, 단계마다 확인·승인합니다.",
    services: ["development"],
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
    q: "사피어에 병원 홈페이지를 맡기면 어떤 점이 좋은가요?",
    a: "상담에서 정한 목표를 바탕으로 사피어 한 팀이 기획·디자인·개발을 맡습니다. 공개 후 유지보수를 선택하면 사이트 구조와 제작 과정을 아는 팀이 이어서 관리해, 수정할 때마다 병원 상황을 다시 설명하는 부담을 줄일 수 있습니다.",
    services: ["hospital-website"],
    defaultOpen: true,
  },
  {
    category: "hospital",
    q: "지금 운영 중인 병원 홈페이지도 리뉴얼할 수 있나요?",
    a: "네. 기존 홈페이지에서 계속 쓸 진료 안내를 확인하고, 모바일에서 읽기 어렵거나 예약·상담으로 이어지기 불편한 부분부터 개선 범위를 정합니다.",
    services: ["hospital-website"],
  },
  {
    category: "hospital",
    q: "홈페이지 진단 점수와 AI 답변 노출은 어떻게 다른가요?",
    a: "진단 점수는 진료 정보와 페이지 구조처럼 홈페이지에서 개선할 항목을 점검한 결과입니다. AI 답변 노출은 정해진 질문에서 우리 병원이 언급되는지 별도로 확인한 결과입니다.",
    services: ["geo"],
  },
  {
    category: "hospital",
    q: "AI 검색 최적화를 하면 진료 정보를 어떻게 개선하나요?",
    a: "병원 기본 정보, 진료 항목별 안내, 자주 묻는 질문 등을 점검합니다. 진단 결과에서 먼저 고칠 내용을 확인할 수 있고, 관리형에서는 사피어가 홈페이지 수정까지 지원합니다.",
    services: ["geo"],
  },
  {
    category: "hospital",
    q: "병원 홈페이지 기본형에도 AI 검색 최적화가 들어가나요?",
    a: "네. 기본형에 GEO 기본 세팅이 포함됩니다. 표준형에는 전체 구조화데이터를 적용합니다.",
    services: ["hospital-website"],
  },
  {
    category: "hospital",
    q: "환자가 홈페이지에서 바로 예약하거나 상담할 수 있나요?",
    a: "진료 안내를 읽던 페이지에서 병원의 네이버 예약과 카카오 채널로 바로 이동할 수 있게 연결합니다. 두 채널 연결은 기본형에도 포함됩니다.",
    services: ["hospital-website"],
  },
  {
    category: "hospital",
    q: "우리 병원에는 어떤 제작 패키지가 맞나요?",
    a: "병원 소개와 진료 안내, 예약 연결부터 시작한다면 기본형을 살펴보세요. 진료 항목별 페이지를 구성하려면 표준형, 맞춤 디자인·다국어·CRM 연동이 필요하면 프리미엄을 상담할 수 있습니다.",
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
    a: "스마트스토어, 쿠팡, 카페24, 워드로브를 지원합니다. 마켓 추가 시 세팅비가 별도로 듭니다.",
    services: ["connect"],
  },
  {
    category: "solution",
    q: "ERP는 한 번에 바꿔야 하나요?",
    a: "아니요. 1단계 진단·설계부터 시작해 단계적으로 바꾸고, 쓰던 데이터를 옮겨 드립니다.",
    services: ["erp"],
  },
  {
    category: "hospital",
    q: "사피어에 AI 검색 최적화를 맡기면 어떤 점이 좋은가요?",
    a: "병원 홈페이지를 진단해 어떤 진료 정보와 페이지부터 손봐야 할지 정리해 드립니다. 구독하면 같은 질문으로 AI 답변을 다시 확인해 병원 언급의 변화를 볼 수 있고, 관리형은 진단 결과에 따른 홈페이지 수정도 지원합니다.",
    services: ["geo"],
    defaultOpen: true,
  },
  {
    category: "hospital",
    q: "사피어에 병원 CRM을 맡기면 어떤 점이 좋은가요?",
    a: "병원의 진료 항목과 방문 이력을 기준으로 환자를 나누고, 누구에게 언제 어떤 안내를 보낼지 함께 정합니다. 직원이 환자 명단과 발송 내역을 따로 대조할 필요가 줄고, 발송 결과와 안내 후 예약 여부를 한 화면에서 확인할 수 있습니다.",
    services: ["crm"],
    defaultOpen: true,
  },
  {
    category: "solution",
    q: "사피어에 커머스 연동을 맡기면 어떤 점이 좋은가요?",
    a: "지금 쓰는 마켓과 상품 규모를 먼저 확인한 뒤 필요한 채널을 연결합니다. 연결한 마켓의 새 주문을 한 화면에서 확인하고 재고를 자동으로 동기화할 수 있어, 채널마다 관리자 화면을 열고 수량을 맞추는 일이 줄어듭니다.",
    services: ["connect"],
    defaultOpen: true,
  },
  {
    category: "solution",
    q: "사피어에 업무 통합 ERP를 맡기면 어떤 점이 좋은가요?",
    a: "현재 쓰는 엑셀과 재고·발주·정산 흐름부터 살펴보고 먼저 옮길 업무를 정합니다. 업무 단위로 전환하면서 기존 데이터의 누락과 형식을 점검해, 전환한 업무가 실제로 돌아가는지 확인한 뒤 다음 단계로 넘어갈 수 있습니다.",
    services: ["erp"],
    defaultOpen: true,
  },
  {
    category: "common",
    q: "사피어에 맞춤 개발을 맡기면 어떤 점이 좋은가요?",
    a: "한 팀이 기획·디자인·개발부터 납품 후 운영까지 이어서 맡습니다. 단계마다 포털에서 진행 상황과 산출물을 확인하고 승인할 수 있어, 화면이나 기능이 필요한 방향으로 만들어지고 있는지 중간에 확인할 수 있습니다.",
    services: ["development"],
    defaultOpen: true,
  },
  {
    category: "common",
    q: "기획서나 디자인이 없어도 견적을 요청할 수 있나요?",
    a: "네. 만들려는 서비스의 목적, 주요 사용자, 꼭 필요한 기능을 먼저 알려주세요. 참고 화면이나 현재 쓰는 서비스가 있다면 함께 주시면, 필요한 화면과 우선순위를 정리하는 데 도움이 됩니다.",
    services: ["development"],
  },
  {
    category: "common",
    q: "처음에는 핵심 기능만 개발할 수 있나요?",
    a: "네. 먼저 검증할 사용자 흐름과 필수 기능을 정해 MVP로 시작할 수 있습니다. 초기 사용 결과를 확인한 뒤 다음 단계에 추가할 기능과 범위를 함께 정합니다.",
    services: ["development"],
  },
  {
    category: "common",
    q: "이미 쓰고 있는 시스템이나 데이터도 연결할 수 있나요?",
    a: "기존 시스템에서 제공하는 API와 데이터 내보내기 방식을 먼저 확인합니다. 연동할 항목, 필요한 계정 권한, 데이터 이관 범위를 검토한 뒤 견적에 반영합니다.",
    services: ["development"],
  },
  {
    category: "common",
    q: "개발 비용과 일정은 어떻게 정하나요?",
    a: "필요한 화면과 기능, 외부 서비스 연동, 데이터 이관 여부를 기준으로 범위와 일정을 잡습니다. 범위를 먼저 정한 뒤 견적을 안내하고, 진행 중 요구사항이 바뀌면 추가 작업의 영향도 확인합니다.",
    services: ["development"],
  },
  {
    category: "common",
    q: "납품 후에도 기능을 수정하거나 추가할 수 있나요?",
    a: "납품 후 유지보수에서 오류 수정과 운영 중 필요한 변경을 협의합니다. 새 기능이나 추가 연동이 필요하면 기존 구조를 확인하고 작업 범위와 일정을 별도로 정합니다.",
    services: ["development"],
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
    services: ["crm", "connect", "erp"],
  },
  {
    category: "billing",
    q: "맞춤 개발은 어떻게 결제하나요?",
    a: "계약금과 잔금으로 나눠 냅니다. 정찰가 패키지의 계약금은 요금 안내에서 바로 결제할 수 있습니다.",
    services: ["development"],
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
  return faqItems
    .filter((item) => item.services?.includes(service))
    .sort((a, b) => Number(b.defaultOpen ?? false) - Number(a.defaultOpen ?? false))
    .map(({ q, a, defaultOpen }) => ({ q, a, defaultOpen }));
}
