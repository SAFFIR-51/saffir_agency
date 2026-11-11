/**
 * 회사·사업자 정보. 하단 푸터, 약관, 결제(토스 심사) 화면이 모두 이 값을 씁니다.
 * TODO: 사업자등록증과 대조 후 확정 (305-D호, 상상밸리3 표기 확인 필요)
 */
export const site = {
  name: "사피어",
  legalName: "주식회사 사피어테크놀로지",
  domain: "https://saffir.co.kr",
  tagline: "만들고 끝내지 않습니다. 계속 돌아가게 책임집니다.",
  description: "병원·커머스·업무 시스템을 빠르게 만들고, 납품 뒤 운영까지 사피어가 맡습니다.",
  business: {
    ceo: "TODO",
    registrationNumber: "TODO",
    mailOrderNumber: "TODO",
    address: "TODO",
    email: "TODO",
    phone: "TODO",
  },
} as const;
