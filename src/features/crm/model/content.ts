import { routes } from "@/shared/config";

/**
 * 병원 CRM 세부 페이지 문구.
 * 구조 참고: 메시지 서비스 소개 페이지(유형 비교표 · 기능 교차 · 보안 카드 · 문의 카드 2개),
 * 개발사 메인(짧은 제목 + 버튼 2개 · 3단계 흐름). 문구·이미지는 사피어 것으로 새로 쓴다.
 * 효과 수치(재진율이 몇 % 오른다 등)는 확인된 자료가 없어 쓰지 않는다.
 */
export const crmPage = {
  hero: {
    lead: "한 번 온 환자가 다시 오도록.\n분류하고, 알맞은 때 안내하고, 결과를 봅니다.",
    title: "Hospital CRM",
    srTitle: "사피어 병원 CRM",
    primary: { label: "데모 신청", href: routes.contactFor("crm-demo") },
    secondary: { label: "도입 상담", href: routes.contactFor("crm-adopt") },
  },

  problems: {
    title: "Why CRM",
    sub: ["예약은 들어오는데, 그다음이 없다면"],
    story: [
      "진료가 끝난 뒤에도 환자마다 챙겨야 할 일이 남습니다. 시술 후 주의사항이나 다음 검진 시기를 직원이 엑셀과 전화로 하나씩 확인하면, 바쁜 진료 시간에 안내 시점을 놓치기 쉽습니다.",
      "병원 CRM은 진료와 방문 이력에 따라 환자를 분류하고, 병원이 정한 시점에 안내를 보냅니다. 발송 결과와 이후 예약을 같은 화면에서 확인해 다음 안내에 반영할 수 있습니다.",
    ],
    rows: [
      {
        before: "예약·문의가 들어와도 진료가 끝나면 연락이 끊긴다",
        after: "진료 내용과 방문 이력으로 환자를 자동으로 나눕니다",
      },
      {
        before: "다시 와야 할 환자를 놓친다 (정기 검진, 재처치 시기)",
        after: "시기가 된 환자에게 안내 메시지를 예약해 보냅니다",
      },
      {
        before: "직원이 엑셀과 전화로 하나씩 챙긴다",
        after: "보낼 대상·문구·시간을 정해 두면 정해진 때에 나갑니다",
      },
      {
        before: "보낸 안내가 효과가 있었는지 모른다",
        after: "발송 결과와 이후 예약을 한 화면에서 봅니다",
      },
    ],
  },

  /** 메시지 종류 비교 (단가는 content/pricing의 messagePriceRows) */
  channels: {
    title: "Messages",
    sub: ["환자에게 닿는 두 가지 길"],
    items: [
      {
        name: "알림톡",
        tag: "정보 안내",
        image: "/images/hospital/crm-kakao-chat-actions.webp",
        imageAlt: "사피어의원 카카오톡 진료 예약 알림톡과 건강 강좌 채널 광고 예시",
        prices: [{ name: "알림톡", label: "" }],
      },
      {
        name: "문자",
        tag: "모든 휴대폰",
        image: "/images/hospital/crm-sms-mms.webp",
        imageAlt: "사피어의원 SMS 진료 예약 안내와 MMS 건강 강좌 광고 예시",
        prices: [
          { name: "문자(SMS)", label: "" },
          { name: "장문(LMS)", label: "장문" },
        ],
      },
    ],
    rows: [
      {
        label: "쓰는 곳",
        values: ["예약 확인, 검진·재처치 시기 안내", "알림톡을 못 받는 환자, 긴 안내(장문)"],
      },
      { label: "받는 사람", values: ["카카오톡을 쓰는 환자", "휴대폰 번호가 있는 모든 환자"] },
      {
        label: "광고 문구",
        values: [
          "보낼 수 없음 (정보성만)",
          "수신 동의한 환자에게만, (광고) 표시와 수신 거부 안내 포함",
        ],
      },
      {
        label: "준비할 것",
        values: ["병원 카카오톡 채널, 문구(템플릿) 검수", "병원 발신 번호 등록"],
      },
    ],
    note: "리콜 문자는 광고성 정보에 해당할 수 있어 수신 동의를 확인하고 야간(21시~다음 날 8시)에는 보내지 않도록 막아 둡니다.",
  },

  features: {
    sub: ["진료 다음 단계를 대신 챙기는 네 가지"],
    items: [
      {
        no: "01",
        name: "환자 분류",
        title: "방문 이력으로 환자를 나눕니다",
        description:
          "첫 방문, 정기 관리 대상, 한동안 오지 않은 환자처럼 병원이 정한 기준으로 자동 분류합니다.",
        points: [
          "진료 항목·마지막 방문일 기준",
          "분류마다 담당 직원 지정",
          "엑셀로 기존 환자 옮기기",
        ],
        photo: "/images/hospital/crm-patient-segmentation.webp",
        photoAlt: "노트북으로 작업하며 서류를 확인하는 모습",
        photoClassName: "object-cover object-[25%_center]",
      },
      {
        no: "02",
        name: "리콜·사후관리 메시지",
        title: "알맞은 때에 안내가 나갑니다",
        description:
          "시술 후 주의사항, 재처치 시기, 정기 검진처럼 시점이 정해진 안내를 미리 만들어 둡니다.",
        points: ["문구 틀(템플릿) 관리", "보낼 시간 예약", "수신 동의·야간 발송 확인"],
        photo: "/images/hospital/crm-feature-sms-template.webp",
        photoClassName: "bg-black object-contain",
        photoAlt:
          "사피어의원 진료 예약 안내 템플릿 등록 화면. 왼쪽은 문구 편집기와 예약 날짜 입력칸, 오른쪽은 SMS 미리보기.",
      },
      {
        no: "03",
        name: "현황 대시보드",
        title: "보낸 뒤를 한 화면에서 봅니다",
        description:
          "분류별 환자 수, 발송 결과, 안내 이후 예약을 원장님과 실장님이 같은 화면으로 봅니다.",
        points: ["분류별 환자 수", "발송 성공·실패", "안내 후 예약 여부"],
        photo: "/images/hospital/crm-outcome-diagram.webp",
        photoAlt:
          "병원 CRM에서 오른쪽으로 뻗는 세 화살표가 분류별 환자 수, 발송 성공·실패, 안내 후 예약 여부를 각각 가리키는 다이어그램.",
      },
      {
        no: "04",
        name: "병원 전용 서버",
        title: "환자 정보는 병원 서버에만",
        description: "병원마다 서버와 DB를 따로 만들어 다른 병원과 데이터가 섞이지 않습니다.",
        points: ["병원별 전용 서버·DB", "암호화·접근 권한", "백업 정책"],
        photo: "/images/hospital/crm-aws-server.webp",
        photoAlt: "AWS 로고",
        photoClassName: "object-cover",
      },
    ],
  },

  flow: {
    title: "Process",
    sub: ["도입부터 첫 발송까지"],
    steps: [
      { step: "데모", detail: "샘플 병원 데이터가 들어간 체험 계정으로 먼저 써 봅니다." },
      { step: "세팅", detail: "병원 전용 서버를 만들고 기존 환자 목록을 옮깁니다." },
      { step: "기준 정하기", detail: "분류 기준과 안내 문구, 보낼 시점을 병원과 함께 정합니다." },
      {
        step: "운영",
        detail: "메시지가 정해진 때에 나가고, 포털에서 서버 상태와 사용량을 봅니다.",
      },
    ],
  },

  security: {
    title: "Security",
    sub: ["환자 정보를 다루는 만큼"],
    cards: [
      {
        icon: "server",
        name: "전용 서버·DB",
        detail: "병원마다 따로 만들어 데이터가 섞이지 않습니다.",
      },
      { icon: "lock", name: "암호화", detail: "저장하고 주고받는 환자 정보를 암호화합니다." },
      { icon: "shield", name: "접근 권한", detail: "직원마다 볼 수 있는 메뉴와 정보를 나눕니다." },
      { icon: "backup", name: "백업", detail: "정해진 주기로 백업하고 복구 절차를 둡니다." },
    ],
    link: { label: "보안·데이터 정책 보기", href: routes.legal.security },
  },

  pricing: {
    title: "Pricing",
    sub: ["병원 규모에 맞춰 시작합니다"],
    setupLabel: "도입 세팅비",
    monthlyLabel: "월 이용료",
    consultLabel: "도입 상담",
    messageTitle: "메시지 발송비 (건당)",
    vat: "금액은 VAT 포함입니다. 서버 운영비는 사용 규모에 따라 별도로 청구합니다.",
    more: { label: "전체 요금 보기", href: routes.pricing },
  },

  faq: { title: "Questions & Answers", sub: ["자주 묻는 질문"] },

  closing: {
    title: "다시 올 환자를 놓치지 않게",
    description: "샘플 데이터로 먼저 써 보고 결정하세요.",
    detail: "체험 계정을 기한을 정해 드립니다. 병원 규모·EMR 연동·기존 데이터 이관을 상담합니다.",
  },
} as const;
