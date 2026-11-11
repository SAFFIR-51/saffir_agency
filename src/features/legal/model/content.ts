export const termsOutline = [
  "서비스 이용 조건",
  "회원 유형별 이용 범위",
  "구독·결제",
  "책임의 한계",
];

export const privacyOutline = [
  "수집 항목: 회원가입 시 병원명·연락처, 상담·견적 문의 입력 항목",
  "이용 목적, 보관 기간, 제3자 제공·처리 위탁",
  "병원 CRM 환자 데이터는 병원(고객사) 소유이며 병원별 전용 서버에 저장",
];

export const refundOutline = [
  {
    type: "정기결제",
    items: "GEO 구독, 솔루션 월 이용료",
    rule: "1개월 단위, 매월 자동갱신. 포털 청구·결제에서 해지",
  },
  {
    type: "단건 결제",
    items: "홈페이지 기본형, 외주 계약금, 솔루션 세팅비",
    rule: "[ 취소·환불 기준 ]",
  },
  { type: "변동 청구", items: "서버 운영비, 메시지 발송료, 외주 잔금", rule: "[ 정산 기준 ]" },
];

export const securityContent = {
  lead: "환자 정보 같은 민감한 데이터를 어떻게 다루는지 안내합니다.",
  details: "암호화 방식, 접근 권한 체계, 백업 주기·보관 기간, 계약 종료 시 데이터 반환·삭제 절차",
};
