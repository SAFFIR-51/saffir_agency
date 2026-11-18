import { faqForService } from "@/content/faq";
import { routes } from "@/shared/config";
import type { FeatureRow, SolutionPageContent } from "@/shared/sections";

export type BusinessSolutionContent = Omit<
  SolutionPageContent,
  "eyebrow" | "screens" | "features"
> & {
  title: string;
  heroTitle?: string;
  features: readonly (FeatureRow & { showPointsInOverview?: boolean })[];
};

export const solutionsOverviewContent = {
  closing: {
    title: "어떤 솔루션이 맞을지 모르겠다면",
    description: "지금 일하는 방식을 들려주시면 맞는 솔루션이나 개발 범위를 안내해 드립니다.",
  },
  title: "비즈니스 솔루션",
  lead: "반복해서 만들어 온 기능을 솔루션으로 갖췄습니다. 개발 대신 세팅으로 도입합니다.",
};

export const connectContent: BusinessSolutionContent = {
  path: routes.solutions.connect,
  name: "사피어 커머스 연동",
  title: "Commerce Connect",
  heroTitle: "Commerce\nConnect",
  message:
    "스마트스토어·쿠팡·카페24 등 여러 마켓을 한 화면에 연결하세요. 채널별 주문을 모아 보고, 재고는 자동으로 동기화합니다.",
  problems: ["마켓마다 재고와 주문을 따로 확인한다"],
  features: [
    {
      title: "지원 마켓 연결",
      photo: "/images/solutions/cafe24-product-filters.webp",
      photoAlt: "카페24 어드민의 상품 목록과 검색 필터",
      description: "사용 중인 마켓을 연결해 재고와 주문을 한곳에서 관리합니다.",
      points: ["스마트스토어 · 쿠팡", "카페24 · 워드로브"],
    },
    {
      title: "재고·주문 동기화",
      photo: "/images/solutions/cafe24-sync-preview.webp",
      photoAlt: "자동 동기화가 켜져 있고 연결한 마켓의 진행 상태가 표시된 예시 화면",
      description: "전용 서버에서 연결한 마켓의 재고와 주문을 동기화합니다.",
      points: [
        "연결한 마켓의 신규 주문을 한 화면에서 확인합니다.",
        "상품 재고가 바뀌면 연결된 마켓에 자동으로 반영합니다.",
        "마켓별 동기화 진행 상태를 확인합니다.",
      ],
      showPointsInOverview: false,
    },
  ],
  cases: [
    {
      title: "카페24 연동 커머스 어드민 (12만 상품)",
      href: routes.portfolioDetail("cafe24-admin"),
    },
    { title: "워드로브 패션 쇼핑 앱", href: routes.portfolioDetail("wardrobe-app") },
    { title: "이퓨어 뷰티 커머스 앱", href: routes.portfolioDetail("cosmetics-shop-app") },
  ],
  process: [
    { step: "상담", detail: "쓰는 마켓과 상품 수를 확인합니다." },
    { step: "세팅", detail: "사용 중인 마켓을 연결합니다. 추가 마켓 연동은 별도입니다." },
    { step: "운영", detail: "전용 서버에서 재고와 주문을 동기화합니다." },
  ],
  faq: faqForService("connect"),
  cta: { label: "도입 상담", href: routes.contactFor("connect") },
};

export const connectOverview = {
  story: {
    context:
      "출고할 주문을 정리하려고 쿠팡 관리자 화면을 엽니다. 스마트스토어와 카페24에도 들어가 새 주문을 확인하고, 같은 상품이 팔렸다면 다른 마켓의 재고도 다시 확인합니다.",
    orders: "커머스 연동을 도입하면 연결한 마켓의 주문을 한 화면에서 확인합니다.",
    inventory: "상품 재고는 마켓 간에 동기화됩니다.",
  },
  comparison: [
    {
      before: "새 주문이 들어왔는지 마켓별 관리자 화면을 열어 확인합니다.",
      after: "연결한 마켓의 주문을 한 화면에 모아 확인합니다.",
    },
    {
      before: "같은 상품이 팔리면 다른 마켓의 재고도 일일이 수정합니다.",
      after: "연결한 마켓 사이의 상품 재고를 자동으로 동기화합니다.",
    },
  ],
};

export const erpContent: BusinessSolutionContent = {
  path: routes.solutions.erp,
  name: "사피어 업무 통합 ERP",
  title: "Business ERP",
  message:
    "재고 확인부터 발주·정산까지 한 시스템에서 관리하세요. 기존 엑셀 데이터는 업무 단위로 정리해 단계적으로 옮깁니다.",
  problems: ["재고·발주·정산이 여러 엑셀에 흩어져 있다"],
  features: [
    {
      title: "재고·발주·정산 통합",
      photo: "/images/solutions/erp-inventory-overview.webp",
      photoAlt: "ERP의 재고 현황, 창고 선택, 상품 검색 화면",
      description: "여러 엑셀에 흩어진 재고·발주·정산 내역을 한 시스템에서 관리합니다.",
      points: [
        "상품·창고별 재고와 입출고 이력을 확인합니다.",
        "재고가 부족한 품목을 파악하고 발주 내역을 관리합니다.",
        "판매 채널별 매출과 정산 현황을 함께 봅니다.",
      ],
    },
    {
      title: "단계적 전환",
      photo: "/images/solutions/erp-operations-folders.webp",
      photoAlt: "All Operations가 Inventory, Purchasing, Settlements로 나뉘는 폴더 다이어그램",
      description: "지금 일하는 방식을 살펴보고, 업무별로 전환 순서를 정합니다.",
      points: [
        "재고·발주·정산 중 먼저 옮길 업무를 정합니다.",
        "담당자마다 어떤 정보를 입력하고 확인할지 정리합니다.",
        "전환한 업무가 실제 흐름대로 처리되는지 확인하고 다음 단계로 넘어갑니다.",
      ],
      showPointsInOverview: false,
    },
    {
      title: "기존 엑셀 데이터 이관",
      photo: "/images/solutions/erp-excel-to-saffir.webp",
      photoAlt: "왼쪽의 엑셀 로고와 오른쪽의 싸피어 로고를 잇는 데이터 흐름",
      description: "기존 엑셀 파일을 ERP에 맞게 정리하고 검증한 뒤 옮깁니다.",
      points: [
        "상품코드·SKU 등 엑셀의 열을 ERP의 입력 항목과 맞춥니다.",
        "등록 전에 필수값 누락과 형식 오류를 확인합니다.",
        "이관 후 건수와 주요 항목을 원본 엑셀과 대조합니다.",
      ],
      showPointsInOverview: false,
    },
  ],
  cases: [
    { title: "제조·운영 통합 ERP", href: routes.portfolioDetail("business-erp-admin") },
    { title: "커머스 재고 관리 ERP", href: routes.portfolioDetail("commerce-inventory-erp") },
    { title: "병원 ERP 리뉴얼", href: routes.portfolioDetail("hospital-erp-2") },
  ],
  process: [
    { step: "진단·설계", detail: "지금 쓰는 엑셀과 업무를 정리합니다." },
    { step: "구축 견적", detail: "진단 결과로 범위와 금액을 정합니다." },
    { step: "단계적 전환", detail: "업무 단위로 나눠 옮깁니다." },
    { step: "데이터 이관", detail: "기존 엑셀 데이터를 옮깁니다." },
  ],
  faq: faqForService("erp"),
  cta: { label: "1단계 진단 신청", href: routes.contactFor("erp") },
};

export const erpOverview = {
  story: [
    "발주할 수량을 정하려면 재고 파일부터 엽니다. 최신 입고 내역은 다른 파일에 있고, 월말에는 정산표와 금액이 맞는지 다시 대조합니다.",
    "업무 통합 ERP는 재고·발주·정산을 한 시스템으로 연결합니다. 지금 쓰는 엑셀과 업무 흐름을 먼저 확인하고, 기존 데이터와 업무를 단계별로 옮깁니다.",
  ],
  comparison: [
    {
      before: "재고와 발주 내역이 다른 파일에 있어 발주 전에 숫자를 맞춰 봅니다.",
      after: "재고와 발주 내역을 한 시스템에서 함께 확인합니다.",
    },
    {
      before: "월말마다 여러 엑셀 파일을 모아 정산 내역을 확인합니다.",
      after: "재고·발주를 관리하는 시스템에서 정산 내역도 확인합니다.",
    },
    {
      before: "기존 엑셀 파일마다 양식과 기록 방식이 달라 한 번에 옮기기 어렵습니다.",
      after: "기존 데이터를 정리하고, 업무 단위로 나눠 새 시스템에 옮깁니다.",
    },
  ],
};

/** 요금표 아래 한 줄 */
export const pricingCaptions = {
  erp: "구축은 1단계 진단 후 견적을 드리고, 단계별로 계약합니다.",
};
