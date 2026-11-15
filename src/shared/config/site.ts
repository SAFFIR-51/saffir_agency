/**
 * 회사·사업자 정보. 하단 푸터, 약관, 결제(토스 심사) 화면이 모두 이 값을 씁니다.
 * 기존 saffir.co.kr 하단 표기 기준. 사업자등록증과 한 번 더 대조할 것.
 */
export const site = {
  name: "사피어",
  legalName: "주식회사 사피어테크놀로지",
  domain: "https://saffir.co.kr",
  /** 회사 소개서 PDF. TODO: 실제 파일을 public/brochure/에 넣고 이름 확정 */
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
