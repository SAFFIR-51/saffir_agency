import { projectStages } from "@/content/company";

/** 포털 메뉴별 내용 (기획서 "로그인과 고객 포털"). 메뉴는 가입한 서비스에 따라 보이거나 숨겨진다. */
export const portalMenus = [
  { menu: "홈", items: ["진행 중인 프로젝트", "미결제 청구", "최근 알림"] },
  {
    menu: "프로젝트",
    items: [`단계 (${projectStages.join(" → ")})`, "진행률", "일정", "산출물", "확인·승인 버튼"],
  },
  { menu: "작업 보고", items: ["주간 스프린트 보고", "정례 미팅 기록"] },
  { menu: "요청·문의", items: ["수정 요청", "장애 신고", "처리 상태"] },
  {
    menu: "내 솔루션",
    items: [
      "도입한 솔루션 목록",
      "전용 서버 바로가기",
      "서버 상태",
      "월 사용량 (서버 운영비 산정 근거)",
      "버전·업데이트 내역",
    ],
  },
  { menu: "GEO", items: ["진단 리포트", "AI 가시성", "진단 기록", "의료광고 점검"] },
  {
    menu: "청구·결제",
    items: ["청구 목록", "결제하기", "자동결제 카드 관리", "영수증·세금계산서 요청", "구독 해지"],
  },
  { menu: "계정", items: ["회사·병원 정보", "담당자 추가 (여러 명이 같은 고객사 계정 사용)"] },
] as const;

export function menuItems(menu: (typeof portalMenus)[number]["menu"]) {
  return [...(portalMenus.find((m) => m.menu === menu)?.items ?? [])];
}

export const coreServerNotes = [
  "서버 상태와 사용량은 중앙 코어 서버에서 가져옵니다.",
  "코어 서버가 집계한 사용량이 곧 월 서버 운영비의 청구 근거가 됩니다.",
];
