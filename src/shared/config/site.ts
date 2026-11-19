/**
 * 회사·사업자 정보. 하단 푸터, 약관, 결제(토스 심사) 화면이 모두 이 값을 씁니다.
 * 기존 saffir.co.kr 하단 표기 기준. 사업자등록증과 한 번 더 대조할 것.
 */
export const site = {
  name: "사피어",
  legalName: "주식회사 사피어테크놀로지",
  domain: "https://saffir.co.kr",
  /** 로고 (구조화데이터·OG). public 기준 경로 */
  logo: "/brand/saffir-logo.png",
  /**
   * 회사 공식 채널 (블로그·인스타그램·링크드인 등 전체 주소).
   * 구조화데이터 sameAs로 나가 AI·검색이 같은 회사로 묶는다. 실제 운영 중인 채널만 넣는다.
   */
  sameAs: [
    // 사람인 기업정보
    "https://www.saramin.co.kr/zf_user/company-info/view/csn/RllkcUMyZUp1RE53cVJXU1h0WjZPZz09/company_nm/(%EC%A3%BC)%EC%82%AC%ED%94%BC%EC%96%B4%ED%85%8C%ED%81%AC%EB%86%80%EB%A1%9C%EC%A7%80",
    // 크몽 전문가 프로필
    "https://kmong.com/@%EC%82%AC%ED%94%BC%EC%96%B4%ED%85%8C%ED%81%AC%EB%86%80%EB%A1%9C%EC%A7%80",
  ] as readonly string[],
  /** 회사 소개서 PDF (2026.11). 공개 다운로드 파일. */
  brochure: "/brochure/saffir-company-profile.pdf",
  tagline: "만들고 끝내지 않습니다. 계속 돌아가게 책임집니다.",
  description: "병원·커머스·업무 시스템을 빠르게 만들고, 납품 뒤 운영까지 사피어가 맡습니다.",
  business: {
    ceo: "박봉근",
    registrationNumber: "148-88-03457",
    mailOrderNumber: "제2026-서울성북-0480호",
    address: "서울특별시 성북구 삼선교로10바길 38, 305-D호(상상밸리3)",
    email: "saffir.kr@gmail.com",
    phone: "010-9068-9681",
    privacyOfficer: "박봉근",
    hosting: "Amazon Web Services",
    paymentAgent: "토스페이먼츠(주)",
  },
} as const;
