import type { PortfolioCaseStudy } from "./case-studies";

/** Published project descriptions and imported screens: saffir.co.kr/portfolio. */
export const additionalCaseStudies = {
  "hearing-health-app": {
    title: "Earguard 도시 소음 케어",
    introduction:
      "도시의 소음을 다섯 가지 결로 나눠 지도에 담고, 청각 건강 습관을 만들어주는 앱입니다.",
    cover: {
      src: "/images/home/portfolio-earguard-centered.webp",
      width: 1448,
      height: 1086,
      alt: "Earguard 도시 소음 케어 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "의료·헬스케어",
      },
      {
        label: "유형",
        value: "모바일 앱 · 지도 기반 서비스",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "도시의 소음을 일상의 케어로",
      paragraphs: [
        "같은 도시 안에서도 소리는 다섯 개의 결로 다릅니다. 소음 환경을 유형화해 한 장의 지도에 담고, 조용한 곳을 발견하고 · 방문하고 · 청력을 지키는 행동 루프를 설계했습니다.",
      ],
    },
    features: [
      {
        title: "소리를 확인하고, 조용한 장소를 발견합니다",
        description:
          "소음 환경을 지도에 담고 측정 정보와 장소 탐색을 연결했습니다. 사용자가 주변의 소리를 확인한 뒤 조용한 곳을 찾아 방문하는 흐름입니다.",
        points: ["도시 소음 유형 지도", "소음 노출 측정", "장소 발견과 방문 기록"],
        image: {
          src: "/images/portfolio/screens/hearing-2.webp",
          width: 1080,
          height: 2402,
          alt: "Earguard 도시 소음 케어 · 지도·측정과 서비스 경험",
        },
        presentation: "page",
        caption: "지도·측정과 서비스 경험",
      },
      {
        title: "매일의 행동을 캐릭터와 연결해서",
        description:
          "소음 환경과 청각 건강 습관을 캐릭터의 상태로 표현했습니다. 측정한 정보를 읽는 데서 끝나지 않고 일상에서 케어 행동을 이어가도록 구성했습니다.",
        points: [
          "소음 환경에 따른 캐릭터 표현",
          "청각 건강 습관 루프",
          "장소 탐색과 케어 경험 연결",
        ],
        image: {
          src: "/images/portfolio/screens/hearing-3.webp",
          width: 1080,
          height: 1583,
          alt: "Earguard 도시 소음 케어 · 청각 건강 습관과 캐릭터",
        },
        presentation: "page",
        caption: "청각 건강 습관과 캐릭터",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "소음 측정·장소 발견·방문 기록으로 이어지는 서비스 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "지도 기반 화면과 청각 건강 습관을 전달하는 시각 경험을 구성했습니다.",
      },
      {
        item: "앱 개발",
        detail: "지도·측정 정보와 장소 기록을 연결한 모바일 앱을 구현했습니다.",
      },
    ],
    relatedSlugs: ["smart-planter-ble", "tinnitus-mental-app"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "vivarium-iot-camera": {
    title: "파충류 사육장 IoT 카메라",
    introduction:
      "사육장에 부착하는 관찰 카메라와 AI 행동 분석까지, 하드웨어부터 소프트웨어 전 과정을 자체 개발한 제품입니다.",
    cover: {
      src: "/images/home/portfolio-lizard-cam.webp",
      width: 1448,
      height: 1086,
      alt: "파충류 사육장 IoT 카메라 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "IoT·하드웨어",
      },
      {
        label: "유형",
        value: "IoT 카메라 · AI 분석",
      },
      {
        label: "수행 범위",
        value: "제품 기획 · 하드웨어 · 개발 · AI 분석",
      },
    ],
    background: {
      title: "사육장 관찰을 기록과 분석으로",
      paragraphs: [
        "파충류 사육장에 부착하는 IoT 관찰 카메라입니다. 기기 설계부터 촬영 · 스트리밍, 그리고 키포인트 기반 AI가 개체의 움직임을 추적해 활동 히트맵을 그리는 분석 파이프라인까지 전 과정을 직접 만들었습니다. 하드웨어와 소프트웨어를 한 팀이 다룬다는 사피어의 IoT 역량을 그대로 보여주는 자체 제품입니다.",
      ],
    },
    features: [
      {
        title: "사육장에 붙여, 떨어진 곳에서도 관찰합니다",
        description:
          "사육장 부착형 카메라의 기기 설계부터 촬영과 스트리밍까지 연결했습니다. 하드웨어와 관찰 화면을 함께 다루는 자체 제품입니다.",
        points: ["사육장 부착형 카메라", "실시간 촬영·스트리밍", "기기와 소프트웨어 연계"],
        image: {
          src: "/images/portfolio/screens/lizard-cam-1.webp",
          width: 1479,
          height: 956,
          alt: "파충류 사육장 IoT 카메라 · 카메라와 관찰 화면",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/lizard-cam-2.webp",
            width: 1440,
            height: 938,
            alt: "파충류 사육장 IoT 카메라 · 카메라와 관찰 화면",
          },
        ],
        caption: "카메라와 관찰 화면",
      },
      {
        title: "움직임을 추적해 활동의 흐름을 봅니다",
        description:
          "키포인트 기반으로 개체의 움직임을 추적하고 활동 히트맵으로 표현했습니다. 촬영한 화면에서 행동 데이터를 확인하는 분석 흐름을 만들었습니다.",
        points: ["키포인트 기반 개체 추적", "컴퓨터 비전 분석", "활동 히트맵"],
        image: {
          src: "/images/portfolio/screens/lizard-cam-3.webp",
          width: 1440,
          height: 857,
          alt: "파충류 사육장 IoT 카메라 · 개체 추적과 활동 분석",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/lizard-cam-4.webp",
            width: 1440,
            height: 934,
            alt: "파충류 사육장 IoT 카메라 · 개체 추적과 활동 분석",
          },
        ],
        caption: "개체 추적과 활동 분석",
      },
    ],
    scope: [
      {
        item: "제품 기획",
        detail: "사육장 관찰과 활동 분석을 연결하는 제품 구성을 설계했습니다.",
      },
      {
        item: "하드웨어·개발",
        detail: "카메라 기기와 촬영·스트리밍 소프트웨어를 직접 개발했습니다.",
      },
      {
        item: "AI 분석",
        detail: "키포인트 기반 개체 추적과 활동 히트맵 분석 파이프라인을 구현했습니다.",
      },
    ],
    relatedSlugs: ["smart-planter-ble", "pixel-rpg"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "smart-planter-ble": {
    title: "CUBER 스마트 화분",
    introduction:
      "스마트 화분과 BLE로 동기화해 4종 센서 데이터를 보고, 케어를 경험치로 쌓는 식물 케어 앱입니다.",
    cover: {
      src: "/images/home/portfolio-smart-planter-cuber.webp",
      width: 1448,
      height: 1086,
      alt: "CUBER 스마트 화분 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "IoT·하드웨어",
      },
      {
        label: "유형",
        value: "IoT 연동 모바일 앱",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "화분의 상태와 돌봄을 하나로",
      paragraphs: [
        "화분에서 앱까지 BLE로 동기화합니다. 4종 센서(수분 · 조도 등)의 실시간 데이터를 확인하고, 물주기 같은 케어 행동이 경험치가 되어 캐릭터가 자라는 게이미피케이션을 얹었습니다. 스플래시 → 권한 → 페어링으로 이어지는 온보딩 흐름까지 설계했습니다.",
      ],
    },
    features: [
      {
        title: "처음 연결하는 순간부터 쉽게",
        description:
          "기기 권한과 페어링을 거쳐 스마트 화분을 등록하는 흐름입니다. 연결 단계마다 캐릭터와 안내를 배치해 사용자가 다음 행동을 찾을 수 있게 했습니다.",
        points: ["BLE 페어링", "기기 등록과 연결 안내", "캐릭터를 활용한 온보딩"],
        image: {
          src: "/images/portfolio/screens/plant-iot-1.webp",
          width: 375,
          height: 812,
          alt: "CUBER 스마트 화분 · 기기 등록과 연결 안내",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/plant-iot-2.webp",
            width: 375,
            height: 812,
            alt: "CUBER 스마트 화분 · 기기 등록과 연결 안내",
          },
        ],
        presentation: "screens",
        caption: "기기 등록과 연결 안내",
      },
      {
        title: "센서 데이터가 케어 행동으로 이어지도록",
        description:
          "수분·조도 등을 포함한 네 종류의 센서 데이터를 확인하고, 물주기 같은 케어를 기록하는 앱입니다. 돌봄 행동을 경험치와 캐릭터 보상으로 연결했습니다.",
        points: ["4종 센서 데이터 확인", "케어 기록과 경험치", "캐릭터 보상·케어 리마인드"],
        image: {
          src: "/images/portfolio/screens/plant-iot-3.webp",
          width: 375,
          height: 812,
          alt: "CUBER 스마트 화분 · 기기 연결 과정",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/plant-iot-4.webp",
            width: 375,
            height: 812,
            alt: "CUBER 스마트 화분 · 기기 연결 과정",
          },
        ],
        presentation: "screens",
        caption: "기기 연결 과정",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "기기 연결부터 센서 확인, 케어 기록까지의 사용자 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "온보딩 안내와 캐릭터를 활용한 식물 케어 화면을 디자인했습니다.",
      },
      {
        item: "앱 개발",
        detail: "BLE 연동과 센서 데이터 확인, 케어 기록·보상 기능을 구현했습니다.",
      },
    ],
    relatedSlugs: ["vivarium-iot-camera", "hearing-health-app"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "pixel-rpg": {
    title: "DirepX 픽셀 RPG",
    introduction:
      "모든 화면이 게임기 — 사육장 관리에 4종 미니게임과 온라인 광장을 더한 픽셀 RPG입니다.",
    cover: {
      src: "/images/home/portfolio-direpx.webp",
      width: 1448,
      height: 1086,
      alt: "DirepX 픽셀 RPG 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "앱·게임·콘텐츠",
      },
      {
        label: "유형",
        value: "모바일 픽셀 RPG",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "사육장 관리가 게임이 되는 경험",
      paragraphs: [
        "파충류 IP를 활용한 픽셀 아트 게임으로, 사육장 관리가 곧 게임 플레이가 됩니다. NPC와 대화하고, 매일의 미니게임 4종을 돌고, 온라인 광장에서 다른 유저를 만납니다. 핵심 6화면 · 게임 기능 8종 규모입니다.",
      ],
    },
    features: [
      {
        title: "대화하고 돌보는, 손안의 사육장",
        description:
          "파충류 IP를 픽셀 아트로 풀어내고 사육장 관리를 게임 플레이로 연결했습니다. 게임기 형태의 화면 안에서 캐릭터를 움직이고 NPC와 대화합니다.",
        points: ["사육장 관리 게임 루프", "NPC 대화 시스템", "픽셀 아트와 게임 UI"],
        image: {
          src: "/images/portfolio/screens/reptile-game-1.webp",
          width: 375,
          height: 812,
          alt: "DirepX 픽셀 RPG · 사육장과 NPC 대화",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/reptile-game-2.webp",
            width: 375,
            height: 812,
            alt: "DirepX 픽셀 RPG · 사육장과 NPC 대화",
          },
        ],
        presentation: "screens",
        caption: "사육장과 NPC 대화",
      },
      {
        title: "혼자 시작해 함께 즐기는 플레이",
        description:
          "소셜·게스트 로그인으로 게임에 진입하고, 개체 선택과 미니게임, 온라인 광장으로 경험을 넓혔습니다. 네 종류의 미니게임을 포함한 게임 기능을 구성했습니다.",
        points: ["소셜·게스트 로그인", "미니게임 4종", "온라인 광장"],
        image: {
          src: "/images/portfolio/screens/reptile-game-3.webp",
          width: 375,
          height: 812,
          alt: "DirepX 픽셀 RPG · 게임 진입과 개체 선택",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/reptile-game-4.webp",
            width: 375,
            height: 812,
            alt: "DirepX 픽셀 RPG · 게임 진입과 개체 선택",
          },
        ],
        presentation: "screens",
        caption: "게임 진입과 개체 선택",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "사육장 관리·미니게임·온라인 광장으로 이어지는 플레이 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "파충류 IP를 활용한 픽셀 아트와 게임기 형태의 UI를 구성했습니다.",
      },
      {
        item: "게임 개발",
        detail: "NPC 대화, 미니게임과 온라인 광장을 포함한 모바일 게임을 구현했습니다.",
      },
    ],
    relatedSlugs: ["vivarium-iot-camera", "smart-planter-ble"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "tinnitus-mental-app": {
    title: "이명 · 멘탈헬스 케어 앱",
    introduction: "이명과 멘탈 케어, 두 분야를 한 앱에 담은 디지털 헬스케어 서비스입니다.",
    cover: {
      src: "/images/portfolio/mindtone.webp",
      width: 1448,
      height: 1086,
      alt: "이명 · 멘탈헬스 케어 앱 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "의료·헬스케어",
      },
      {
        label: "유형",
        value: "디지털 헬스케어 앱",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "이명과 멘탈 케어를 한 앱에서",
      paragraphs: [
        "'이명은 곧 멘탈 이슈'라는 문제의식에서 출발해 두 분야를 한 앱으로 통합했습니다. 6종 의학 검사로 상태를 진단하고, 3가지 치료 세션을 진행하며, 정원 · 아바타 보상으로 꾸준함을 만듭니다. 나의 인사이트와 모두의 루틴, 구독 모델까지 총 8개 핵심 기능 규모입니다.",
      ],
    },
    features: [
      {
        title: "상태 확인과 케어 세션을 연결합니다",
        description:
          "관리 모드를 고르고 상태를 확인한 뒤 케어 세션을 진행하도록 구성했습니다. 검사와 세션, 완료 후 피드백이 하나의 흐름으로 이어집니다.",
        points: ["관리 모드 선택", "의학 검사 6종", "케어 세션 3종과 진행 화면"],
        image: {
          src: "/images/portfolio/screens/mindcare-1.webp",
          width: 375,
          height: 812,
          alt: "이명 · 멘탈헬스 케어 앱 · 관리 모드와 세션 완료",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/mindcare-2.webp",
            width: 375,
            height: 750,
            alt: "이명 · 멘탈헬스 케어 앱 · 관리 모드와 세션 완료",
          },
        ],
        presentation: "screens",
        caption: "관리 모드와 세션 완료",
      },
      {
        title: "꾸준함이 쌓이는 보상과 기록",
        description:
          "정원과 아바타 보상을 케어 경험에 더했습니다. 자신의 상태를 돌아보는 인사이트와 루틴 커뮤니티, 구독 기능을 함께 구성했습니다.",
        points: ["정원·아바타 보상", "나의 인사이트", "루틴 커뮤니티·구독"],
        image: {
          src: "/images/portfolio/screens/mindcare-3.webp",
          width: 375,
          height: 750,
          alt: "이명 · 멘탈헬스 케어 앱 · 검사 안내와 아바타",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/mindcare-4.webp",
            width: 375,
            height: 750,
            alt: "이명 · 멘탈헬스 케어 앱 · 검사 안내와 아바타",
          },
        ],
        presentation: "screens",
        caption: "검사 안내와 아바타",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "상태 확인과 케어 세션, 기록·보상으로 이어지는 서비스 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "관리 모드와 세션 진행 화면, 정원·아바타 경험을 디자인했습니다.",
      },
      {
        item: "앱 개발",
        detail: "검사·세션·인사이트·커뮤니티와 구독 기능을 구현했습니다.",
      },
    ],
    relatedSlugs: ["hearing-health-app", "emotion-ai-coaching"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "emotion-ai-coaching": {
    title: "감정 기록 & AI 코칭 앱",
    introduction:
      "비폭력 대화(NVC)의 관찰 · 감정 · 욕구 · 부탁 네 칸으로 기록하고, AI가 코칭하는 감정 일기 앱입니다.",
    cover: {
      src: "/images/portfolio/talkbetter.webp",
      width: 1448,
      height: 1086,
      alt: "감정 기록 & AI 코칭 앱 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "의료·헬스케어",
      },
      {
        label: "유형",
        value: "감정 기록 · AI 코칭 앱",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "감정을 적고, 돌아보고, 나누도록",
      paragraphs: [
        "매일 네 칸의 짧은 대화 — 비폭력 대화(NVC)의 관찰 · 감정 · 욕구 · 부탁 구조로 감정을 기록하면 AI가 기록을 분석해 피드백을 줍니다. 친구와 기록을 잔잔하게 공유하고, 한 달의 감정을 색으로 돌아보는 무드 캘린더까지 담았습니다.",
      ],
    },
    features: [
      {
        title: "오늘의 감정을 네 칸의 기록으로",
        description:
          "관찰·감정·욕구·부탁으로 이어지는 NVC 구조를 기록에 적용했습니다. 기분 매트릭스와 감정 통계를 통해 자신이 쌓은 기록을 다시 살펴볼 수 있습니다.",
        points: ["NVC 4칸 감정 기록", "4분면 기분 매트릭스", "AI 기록 분석·코칭 피드백"],
        image: {
          src: "/images/portfolio/screens/emotion-1.webp",
          width: 375,
          height: 812,
          alt: "감정 기록 & AI 코칭 앱 · 기분 선택과 감정 통계",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/emotion-2.webp",
            width: 375,
            height: 812,
            alt: "감정 기록 & AI 코칭 앱 · 기분 선택과 감정 통계",
          },
        ],
        presentation: "screens",
        caption: "기분 선택과 감정 통계",
      },
      {
        title: "기록이 캘린더와 관계로 이어집니다",
        description:
          "하루의 감정을 색으로 돌아보는 무드 캘린더와 친구 간 기록 공유를 함께 구성했습니다. 소셜 로그인부터 메시지와 공유까지 일상의 사용 흐름을 연결했습니다.",
        points: ["색으로 보는 무드 캘린더", "친구 추가와 기록 공유", "소셜 로그인"],
        image: {
          src: "/images/portfolio/screens/emotion-3.webp",
          width: 375,
          height: 812,
          alt: "감정 기록 & AI 코칭 앱 · 메시지와 캘린더 공유",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/emotion-4.webp",
            width: 375,
            height: 812,
            alt: "감정 기록 & AI 코칭 앱 · 메시지와 캘린더 공유",
          },
        ],
        presentation: "screens",
        caption: "메시지와 캘린더 공유",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "NVC 기록과 AI 코칭, 친구 공유를 연결하는 서비스 구조를 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "감정 매트릭스·통계·무드 캘린더를 포함한 앱 화면을 구성했습니다.",
      },
      {
        item: "앱 개발",
        detail: "기록 분석과 코칭 피드백, 소셜 로그인·공유 기능을 구현했습니다.",
      },
    ],
    relatedSlugs: ["tinnitus-mental-app", "mentoring-app"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "group-buying-platform": {
    title: "지역 기반 공동소비 플랫폼",
    introduction:
      "동네 이웃 간 배달 · 공동구매 · 나눔 · 중고거래를 잇는 GPS 위치 기반 플랫폼입니다.",
    cover: {
      src: "/images/portfolio/group-buying-logo.webp",
      width: 1448,
      height: 1086,
      alt: "지역 기반 공동소비 플랫폼 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "커머스",
      },
      {
        label: "유형",
        value: "위치 기반 앱 · 관리자 웹",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "같은 동네의 사람들을 연결하는 서비스",
      paragraphs: [
        "'같은 동네라서 닿는 거리'를 컨셉으로, 배달 · 공구 · 나눔 · 중고거래를 하나의 앱에 담았습니다. 설정 → 발견 → 모집 → 완료로 이어지는 4단계 모집 플로우와 모집 단위 그룹 채팅이 핵심입니다. 관리자 웹을 함께 구축했습니다.",
      ],
    },
    features: [
      {
        title: "우리 동네에서 시작하는 탐색",
        description:
          "GPS를 이용해 동네를 설정하고 가까운 모집 글을 발견하도록 구성했습니다. 지도와 거리 범위 설정을 통해 지역 기반 서비스의 탐색 기준을 만들었습니다.",
        points: ["GPS 동네 설정", "지도 기반 위치 확인", "거리 범위에 따른 탐색"],
        image: {
          src: "/images/portfolio/screens/local-1.webp",
          width: 375,
          height: 812,
          alt: "지역 기반 공동소비 플랫폼 · 동네 설정과 위치 확인",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/local-2.webp",
            width: 375,
            height: 812,
            alt: "지역 기반 공동소비 플랫폼 · 동네 설정과 위치 확인",
          },
        ],
        presentation: "screens",
        caption: "동네 설정과 위치 확인",
      },
      {
        title: "모집에서 대화와 완료까지",
        description:
          "배달·공동구매·나눔·중고거래를 하나의 앱에 담았습니다. 모집 상태를 단계별로 관리하고, 모집 단위 그룹 채팅과 문의 채팅을 연결했습니다.",
        points: ["4단계 모집 플로우", "그룹 채팅·1:1 문의", "관리자 웹"],
        image: {
          src: "/images/portfolio/screens/local-3.webp",
          width: 375,
          height: 812,
          alt: "지역 기반 공동소비 플랫폼 · 모집 목록과 동네 범위",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/local-4.webp",
            width: 375,
            height: 812,
            alt: "지역 기반 공동소비 플랫폼 · 모집 목록과 동네 범위",
          },
        ],
        presentation: "screens",
        caption: "모집 목록과 동네 범위",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "동네 설정·모집·채팅·완료로 이어지는 지역 서비스 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "지도와 모집 목록, 다섯 탭으로 구성한 앱 화면을 디자인했습니다.",
      },
      {
        item: "앱·웹 개발",
        detail: "위치 기반 앱과 실시간 채팅, 운영용 관리자 웹을 함께 구현했습니다.",
      },
    ],
    relatedSlugs: ["side-dish-order", "cosmetics-shop-app"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "sports-ai-prediction": {
    title: "스포츠 · 로또 AI 예측 플랫폼",
    introduction:
      "5대 리그 경기 데이터를 AI로 분석해 예측 · 통계 · 팁을 제공하는 구독형 플랫폼입니다.",
    cover: {
      src: "/portfolio/sports-ai-prediction.webp",
      width: 1200,
      height: 1200,
      alt: "스포츠 · 로또 AI 예측 플랫폼 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "AI 서비스",
      },
      {
        label: "유형",
        value: "AI 분석 · 구독형 앱",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "경기와 회차 데이터를 읽는 여러 관점",
      paragraphs: [
        "예측 · 통계 · 베팅 정보를 한 흐름의 AI 모듈로 엮었습니다. 5대 리그 경기마다 AI Tip이 붙고, 5가지 통계 모드로 데이터를 다각도로 볼 수 있습니다. 로또 회차 통계 분석까지 한 앱에서 제공합니다.",
      ],
    },
    features: [
      {
        title: "경기별 데이터와 AI Tip을 함께",
        description:
          "다섯 개 리그의 경기 정보와 AI Tip을 한 흐름에 배치했습니다. 경기별로 데이터를 확인하고 통계 모드를 바꾸며 여러 관점에서 살펴보는 구조입니다.",
        points: ["5대 리그 경기 정보", "경기별 AI Tip", "5가지 통계 모드"],
        image: {
          src: "/images/portfolio/screens/sports-ai-1.webp",
          width: 375,
          height: 812,
          alt: "스포츠 · 로또 AI 예측 플랫폼 · 경기 정보와 분석 화면",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/sports-ai-2.webp",
            width: 375,
            height: 812,
            alt: "스포츠 · 로또 AI 예측 플랫폼 · 경기 정보와 분석 화면",
          },
        ],
        presentation: "screens",
        caption: "경기 정보와 분석 화면",
      },
      {
        title: "회차 통계와 구독 경험까지",
        description:
          "스포츠 분석에 더해 로또 회차 통계도 확인하도록 구성했습니다. 분석 콘텐츠를 이용하는 구독 흐름을 앱 안에 연결했습니다.",
        points: ["로또 회차 통계", "분석 데이터 시각화", "구독 결제"],
        image: {
          src: "/images/portfolio/screens/sports-ai-3.webp",
          width: 375,
          height: 914,
          alt: "스포츠 · 로또 AI 예측 플랫폼 · 통계와 구독 화면",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/sports-ai-4.webp",
            width: 375,
            height: 812,
            alt: "스포츠 · 로또 AI 예측 플랫폼 · 통계와 구독 화면",
          },
        ],
        presentation: "screens",
        caption: "통계와 구독 화면",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "경기·회차 데이터를 탐색하고 분석 콘텐츠를 이용하는 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "데이터 목록과 통계, AI Tip을 확인하는 앱 화면을 디자인했습니다.",
      },
      {
        item: "앱 개발",
        detail: "경기별 분석 모듈, 통계 시각화와 구독 기능을 구현했습니다.",
      },
    ],
    relatedSlugs: ["sports-ai-web", "emotion-ai-coaching"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "side-dish-order": {
    title: "찬찬 반찬가게 주문·예약",
    introduction:
      "주문 · 입금 · 배송 · 완료 파이프라인으로 운영을 한 흐름으로 묶은 로컬 반찬 커머스입니다.",
    cover: {
      src: "/images/home/portfolio-chanchan.webp",
      width: 1448,
      height: 1086,
      alt: "찬찬 반찬가게 주문·예약 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "커머스",
      },
      {
        label: "유형",
        value: "주문·예약 서비스 · 관리자 웹",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "반찬 주문과 매장 운영을 한 흐름으로",
      paragraphs: [
        "주문 · 예약 · 결제가 운영의 한 흐름이 되도록 설계했습니다. 클라이언트 6개 기능과 어드민 웹을 함께 구축했고, 주문 → 입금 → 배송 → 완료로 이어지는 주문 파이프라인과 외부 연동(알림 등)으로 사장님의 운영 부담을 줄였습니다.",
      ],
    },
    features: [
      {
        title: "고객은 반찬을 고르고, 방문을 예약합니다",
        description:
          "반찬 주문과 픽업 예약을 고객이 사용하는 화면에 담았습니다. 메뉴를 살펴보는 단계에서 주문과 예약 정보 확인까지 이어지도록 구성했습니다.",
        points: ["반찬 주문", "픽업 예약", "주문 정보 확인"],
        image: {
          src: "/images/portfolio/screens/sidedish-1.webp",
          width: 860,
          height: 1864,
          alt: "찬찬 반찬가게 주문·예약 · 고객 주문·예약 화면",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/sidedish-4.webp",
            width: 860,
            height: 1864,
            alt: "찬찬 반찬가게 주문·예약 · 고객 주문·예약 화면",
          },
        ],
        presentation: "screens",
        caption: "고객 주문·예약 화면",
      },
      {
        title: "주문 이후의 일도 한 화면에서",
        description:
          "운영자는 주문·입금·배송·완료 상태를 따라 주문을 관리합니다. 고객용 서비스와 관리자 웹을 함께 구축하고 외부 알림 연동을 더했습니다.",
        points: ["주문 상태 파이프라인", "관리자 웹 주문 관리", "외부 알림 연동"],
        image: {
          src: "/images/portfolio/screens/sidedish-2.webp",
          width: 1440,
          height: 900,
          alt: "찬찬 반찬가게 주문·예약 · 주문 관리 화면",
        },
        caption: "주문 관리 화면",
      },
      {
        title: "메뉴의 정보와 서비스 소개까지",
        description:
          "주문에 필요한 정보를 고객에게 전달하는 화면과 서비스 소개 화면을 함께 구성했습니다. 고객이 이용하는 화면과 매장이 운영하는 화면을 연결한 로컬 커머스입니다.",
        points: ["반찬 메뉴 안내", "주문·예약 동선", "고객 화면과 운영 화면 연결"],
        image: {
          src: "/images/portfolio/screens/sidedish-live.webp",
          width: 1440,
          height: 1000,
          alt: "찬찬 반찬가게 주문·예약 · 서비스 소개와 상세 화면",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/sidedish-3.webp",
            width: 860,
            height: 5330,
            alt: "찬찬 반찬가게 주문·예약 · 서비스 소개와 상세 화면",
          },
        ],
        presentation: "page",
        caption: "서비스 소개와 상세 화면",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "주문·예약부터 입금·배송·완료까지의 운영 흐름을 정리했습니다.",
      },
      {
        item: "디자인",
        detail: "고객용 주문 화면과 매장이 사용하는 주문 관리 화면을 디자인했습니다.",
      },
      {
        item: "앱·웹 개발",
        detail: "고객 서비스와 관리자 웹, 외부 알림 연동을 구현했습니다.",
      },
    ],
    relatedSlugs: ["group-buying-platform", "cafe24-admin"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "cosmetics-shop-app": {
    title: "이퓨어 뷰티 커머스",
    introduction:
      "5개 카테고리 큐레이션 중심의 뷰티 커머스 — 유저 앱과 관리자 웹을 함께 구축했습니다.",
    cover: {
      src: "/images/home/portfolio-epure.webp",
      width: 1448,
      height: 1086,
      alt: "이퓨어 뷰티 커머스 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "커머스",
      },
      {
        label: "유형",
        value: "뷰티 커머스 앱 · 관리자 웹",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "발견부터 구매까지 이어지는 뷰티 커머스",
      paragraphs: [
        "5개 카테고리 큐레이션으로 탐색 동선을 단순하게 만든 뷰티 커머스입니다. 유저 앱 핵심 3화면과 함께, 상품 관리를 위한 관리자 웹을 표준 어드민 테이블 패턴으로 구축해 운영팀이 바로 쓸 수 있게 했습니다.",
      ],
    },
    features: [
      {
        title: "카테고리와 큐레이션으로 상품을 찾습니다",
        description:
          "다섯 개 카테고리를 중심으로 상품 탐색을 구성했습니다. 랭킹과 기획 상품, 가격과 혜택을 확인하며 상품 상세와 결제로 이어지는 흐름입니다.",
        points: ["5개 카테고리 큐레이션", "상품 탐색·상세·결제", "랭킹과 기획 상품 안내"],
        image: {
          src: "/images/portfolio/screens/cosmetics-1.webp",
          width: 1242,
          height: 2688,
          alt: "이퓨어 뷰티 커머스 · 상품 랭킹과 기획 상품",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/cosmetics-4.webp",
            width: 1242,
            height: 2689,
            alt: "이퓨어 뷰티 커머스 · 상품 랭킹과 기획 상품",
          },
        ],
        presentation: "screens",
        caption: "상품 랭킹과 기획 상품",
      },
      {
        title: "앱의 첫인상부터 운영 화면까지",
        description:
          "브랜드 이미지를 앱의 진입 화면에 담고 고객용 쇼핑 경험을 구성했습니다. 상품을 등록하고 관리하는 관리자 웹은 표준 테이블 구조로 함께 구축했습니다.",
        points: ["브랜드 진입 화면", "고객용 모바일 앱", "관리자 웹 상품 관리"],
        image: {
          src: "/images/portfolio/screens/cosmetics-2.webp",
          width: 375,
          height: 812,
          alt: "이퓨어 뷰티 커머스 · 브랜드 진입 화면",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/cosmetics-3.webp",
            width: 375,
            height: 812,
            alt: "이퓨어 뷰티 커머스 · 브랜드 진입 화면",
          },
        ],
        presentation: "screens",
        caption: "브랜드 진입 화면",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "카테고리 큐레이션과 상품 탐색·구매, 상품 운영 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "브랜드 진입 화면과 상품 목록·상세 등 고객용 앱 화면을 디자인했습니다.",
      },
      {
        item: "앱·웹 개발",
        detail: "고객용 커머스 앱과 상품 관리용 관리자 웹을 함께 구현했습니다.",
      },
    ],
    relatedSlugs: ["wardrobe-app", "cafe24-admin"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "mentoring-app": {
    title: "츄 캘린더",
    introduction: "3가지 모드 매칭과 '매일 1칭찬'으로 멘토링 관계를 지속시키는 일정 케어 앱입니다.",
    cover: {
      src: "/images/home/portfolio-chur-calendar.webp",
      width: 1448,
      height: 1086,
      alt: "츄 캘린더 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "앱·게임·콘텐츠",
      },
      {
        label: "유형",
        value: "일정 공유 · 멘토링 앱",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "일정을 함께 보고, 관계를 이어가는 앱",
      paragraphs: [
        "멘토 · 멘티 · 관리자 3가지 모드로 진입해 각자의 화면을 씁니다. 일정 관리와 리마인드가 기본이고, '매일 1칭찬'이라는 가벼운 상호작용으로 관계가 끊기지 않게 설계했습니다. 4탭 구성, 핵심 기능 8종 규모입니다.",
      ],
    },
    features: [
      {
        title: "역할에 맞게 일정을 등록하고 확인합니다",
        description:
          "멘토·멘티·관리자 세 가지 모드에서 각자의 일정을 관리하도록 구성했습니다. 캘린더에서 일정을 등록하고 공유하며 필요한 순간에 리마인드합니다.",
        points: ["3모드 매칭", "일정 등록과 공유", "리마인드"],
        image: {
          src: "/images/portfolio/screens/mentoring-1.webp",
          width: 390,
          height: 844,
          alt: "츄 캘린더 · 일정 캘린더와 등록",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/mentoring-2.webp",
            width: 390,
            height: 844,
            alt: "츄 캘린더 · 일정 캘린더와 등록",
          },
        ],
        presentation: "screens",
        caption: "일정 캘린더와 등록",
      },
      {
        title: "하루의 일정과 작은 칭찬을 함께",
        description:
          "일정을 목록과 시간표로 확인하고, 매일 한 번의 칭찬으로 가볍게 상호작용하도록 설계했습니다. 일정 관리와 관계의 지속을 네 개 탭 안에 담았습니다.",
        points: ["목록·시간표 형태의 일정", "매일 1칭찬", "4탭 앱 구성"],
        image: {
          src: "/images/portfolio/screens/mentoring-3.webp",
          width: 390,
          height: 844,
          alt: "츄 캘린더 · 일정 목록과 주간 시간표",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/mentoring-4.webp",
            width: 390,
            height: 844,
            alt: "츄 캘린더 · 일정 목록과 주간 시간표",
          },
        ],
        presentation: "screens",
        caption: "일정 목록과 주간 시간표",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "역할별 매칭과 공유 일정, 리마인드·칭찬의 사용 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "일정 등록과 캘린더, 목록·시간표 화면을 디자인했습니다.",
      },
      {
        item: "앱 개발",
        detail: "멘토링 관계와 일정 관리, 상호작용 기능을 구현했습니다.",
      },
    ],
    relatedSlugs: ["emotion-ai-coaching", "group-buying-platform"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "reptile-care-app": {
    title: "파충류 반려동물 관리 앱",
    introduction: "등록 · 기록 · 도감 · 보상 루프로 매일 쓰게 만드는 특수 반려동물 케어 앱입니다.",
    cover: {
      src: "/portfolio/reptile-care-app.webp",
      width: 1200,
      height: 1200,
      alt: "파충류 반려동물 관리 앱 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "IoT·하드웨어",
      },
      {
        label: "유형",
        value: "반려동물 기록 · 케어 앱",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "매일의 사육 기록이 쌓이는 경험",
      paragraphs: [
        "개체 등록부터 도감까지, 매일 한 페이지씩 쌓이는 사육 기록 앱입니다. 온보딩 4단계로 진입 장벽을 낮추고, 토큰 충전 시스템과 보상 루프로 '매일 들어오는 이유'를 만들었습니다.",
      ],
    },
    features: [
      {
        title: "나에게 맞는 프로필과 개체를 등록합니다",
        description:
          "단계별 온보딩으로 프로필을 선택하고 반려동물을 등록합니다. 특수 반려동물에 맞는 정보와 도감, 사육 기록으로 이어지는 첫 사용 흐름입니다.",
        points: ["4단계 온보딩", "프로필·개체 등록", "사육 기록과 도감"],
        image: {
          src: "/images/portfolio/screens/reptile-app-1.webp",
          width: 393,
          height: 852,
          alt: "파충류 반려동물 관리 앱 · 프로필과 개체 등록",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/reptile-app-2.webp",
            width: 393,
            height: 852,
            alt: "파충류 반려동물 관리 앱 · 프로필과 개체 등록",
          },
        ],
        presentation: "screens",
        caption: "프로필과 개체 등록",
      },
      {
        title: "기록과 미션에 보상을 더합니다",
        description:
          "토큰 충전과 상점, 미션·보상으로 다시 방문할 이유를 만들었습니다. 기록과 컬렉션, 보상 시스템을 하나의 케어 앱에 담았습니다.",
        points: ["도감 컬렉션", "토큰 충전과 상점", "미션·보상 루프"],
        image: {
          src: "/images/portfolio/screens/reptile-app-3.webp",
          width: 393,
          height: 852,
          alt: "파충류 반려동물 관리 앱 · 상점과 미션",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/reptile-app-4.webp",
            width: 393,
            height: 852,
            alt: "파충류 반려동물 관리 앱 · 상점과 미션",
          },
        ],
        presentation: "screens",
        caption: "상점과 미션",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "개체 등록·사육 기록·도감·보상으로 이어지는 서비스 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "온보딩과 컬렉션, 상점·미션 화면을 디자인했습니다.",
      },
      {
        item: "앱 개발",
        detail: "사육 기록과 토큰 충전, 보상 시스템을 구현했습니다.",
      },
    ],
    relatedSlugs: ["pixel-rpg", "vivarium-iot-camera"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "cafe24-admin": {
    title: "카페24 연동 커머스 어드민",
    introduction:
      "12만+ 상품 카탈로그를 카페24 API로 조회 · 동기화하고, 자체 카테고리로 매핑 · 관리하는 어드민 도구입니다.",
    cover: {
      src: "/images/portfolio/cafe24-link-slate.webp",
      width: 1448,
      height: 1086,
      alt: "카페24 연동 커머스 어드민 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "커머스",
      },
      {
        label: "유형",
        value: "API 연동 · 커머스 어드민",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "대규모 상품 카탈로그를 운영하는 화면",
      paragraphs: [
        "카페24 쇼핑몰 API를 조회 · 동기화하는 자체 어드민 도구입니다. 12만 개가 넘는 상품 카탈로그를 자체 카테고리 체계로 매핑해 등록 · 관리하고, 회원 관리까지 한 화면에서 처리합니다. 총 9개 화면 규모입니다.",
      ],
    },
    features: [
      {
        title: "카페24 상품을 조회하고 동기화합니다",
        description:
          "카페24 API와 연결해 상품 카탈로그를 조회하고 동기화합니다. 12만 개가 넘는 상품을 검색하고 관리하는 운영용 어드민입니다.",
        points: ["카페24 API 연동", "상품 조회와 동기화", "12만+ 상품 카탈로그 처리"],
        image: {
          src: "/images/portfolio/screens/cafe24-1.webp",
          width: 1440,
          height: 1024,
          alt: "카페24 연동 커머스 어드민 · 상품 카탈로그와 연동 화면",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/cafe24-2.webp",
            width: 1440,
            height: 1024,
            alt: "카페24 연동 커머스 어드민 · 상품 카탈로그와 연동 화면",
          },
        ],
        caption: "상품 카탈로그와 연동 화면",
      },
      {
        title: "자체 카테고리 체계로 정리합니다",
        description:
          "외부 상품을 자체 카테고리에 매핑하고 일괄 등록하도록 구성했습니다. 카테고리별 상품 운영과 회원 관리까지 한 도구에서 처리합니다.",
        points: ["자체 카테고리 매핑", "일괄 등록과 상품 관리", "회원 관리"],
        image: {
          src: "/images/portfolio/screens/cafe24-3.webp",
          width: 1440,
          height: 1210,
          alt: "카페24 연동 커머스 어드민 · 분류와 운영 관리 화면",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/cafe24-4.webp",
            width: 1440,
            height: 1111,
            alt: "카페24 연동 커머스 어드민 · 분류와 운영 관리 화면",
          },
        ],
        caption: "분류와 운영 관리 화면",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "상품 조회·분류·등록과 회원 관리의 운영 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "상품 검색과 목록, 카테고리 매핑에 필요한 관리자 화면을 구성했습니다.",
      },
      {
        item: "웹 개발",
        detail: "카페24 API 연동과 상품 동기화, 분류·등록·회원 관리 기능을 구현했습니다.",
      },
    ],
    relatedSlugs: ["commerce-inventory-erp", "cosmetics-shop-app"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "hospital-erp-1": {
    title: "병원 ERP 관리 시스템 v1",
    introduction:
      "매출 · 환자 · 치료 · 재고 · CRM · 마케팅 모듈을 통합한 첫 번째 병원 풀스택 ERP입니다.",
    cover: {
      src: "/portfolio/hospital-erp-1.webp",
      width: 1200,
      height: 1200,
      alt: "병원 ERP 관리 시스템 v1 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "의료·헬스케어",
      },
      {
        label: "유형",
        value: "병원 운영 웹 ERP",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "병원의 여러 운영 업무를 하나로",
      paragraphs: [
        "병원 운영을 위한 풀스택 ERP 외주 첫 케이스입니다. 매출 · 환자 · 치료 · 재고 · CRM · 마케팅 등 운영 모듈을 통합해, 의료진이 매일 사용하는 운영 어드민으로 만들었습니다. 총 9개 화면 규모입니다.",
      ],
    },
    features: [
      {
        title: "업무별 현황을 같은 시스템에서 확인합니다",
        description:
          "매출·환자·치료 정보를 운영 대시보드와 업무별 메뉴로 구성했습니다. 병원의 일상 업무를 한 시스템 안에서 확인하는 첫 번째 ERP입니다.",
        points: ["매출·환자·치료 관리", "업무별 운영 메뉴", "운영 대시보드"],
        image: {
          src: "/images/portfolio/screens/hospital-erp-v1-1.webp",
          width: 1920,
          height: 1200,
          alt: "병원 ERP 관리 시스템 v1 · 병원 운영 화면",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/hospital-erp-v1-2.webp",
            width: 1920,
            height: 1200,
            alt: "병원 ERP 관리 시스템 v1 · 병원 운영 화면",
          },
        ],
        caption: "병원 운영 화면",
      },
      {
        title: "재고와 CRM, 마케팅까지 이어서",
        description:
          "진료 운영과 함께 필요한 재고, CRM과 마케팅 모듈을 통합했습니다. 개별 업무의 기록을 찾아가며 처리하는 운영 어드민입니다.",
        points: ["재고 관리", "고객 CRM", "마케팅 모듈"],
        image: {
          src: "/images/portfolio/screens/hospital-erp-v1-3.webp",
          width: 1920,
          height: 2820,
          alt: "병원 ERP 관리 시스템 v1 · 업무별 상세 화면",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/hospital-erp-v1-4.webp",
            width: 1920,
            height: 1200,
            alt: "병원 ERP 관리 시스템 v1 · 업무별 상세 화면",
          },
        ],
        presentation: "page",
        caption: "업무별 상세 화면",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "병원의 운영 업무와 모듈별 화면 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "대시보드와 매출·환자·치료·재고 등 업무 화면을 디자인했습니다.",
      },
      {
        item: "웹 개발",
        detail: "CRM·마케팅을 포함한 병원 운영 모듈을 통합 구현했습니다.",
      },
    ],
    relatedSlugs: ["hospital-erp-2", "business-erp-admin"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "sports-ai-web": {
    title: "GGYP 스포츠·로또 분석",
    introduction:
      "Hero → 서비스 → 구독으로 이어지는 반응형 랜딩. 한 · 영 i18n까지 1개월에 완성했습니다.",
    cover: {
      src: "/images/home/portfolio-ggyp-web-app.webp",
      width: 1448,
      height: 1086,
      alt: "GGYP 스포츠·로또 분석 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "AI 서비스",
      },
      {
        label: "유형",
        value: "반응형 웹 · 한·영 다국어",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "서비스 이해에서 구독까지 이어지는 웹",
      paragraphs: [
        "AI 예측 플랫폼의 웹 랜딩 페이지입니다. Hero · 서비스 소개 · 구독 · 푸터가 한 흐름으로 이어지는 구독 전환 중심 설계에, 한 · 영 다국어(i18n)와 데스크탑 · 태블릿 · 모바일 풀 반응형을 1개월 안에 구현했습니다.",
      ],
    },
    features: [
      {
        title: "서비스를 이해하고 구독으로 이어집니다",
        description:
          "첫 화면에서 서비스 소개와 구독 안내로 이어지는 흐름을 설계했습니다. 스포츠와 로또 분석 서비스의 정보를 반응형 랜딩 페이지로 전달합니다.",
        points: ["구독 중심 랜딩 흐름", "스포츠·로또 서비스 소개", "데스크톱·태블릿·모바일 대응"],
        image: {
          src: "/images/portfolio/screens/sports-web-1.webp",
          width: 1920,
          height: 4030,
          alt: "GGYP 스포츠·로또 분석 · 서비스 소개 웹 화면",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/sports-web-2.webp",
            width: 1920,
            height: 3235,
            alt: "GGYP 스포츠·로또 분석 · 서비스 소개 웹 화면",
          },
        ],
        presentation: "page",
        caption: "서비스 소개 웹 화면",
      },
      {
        title: "언어와 화면 크기가 달라도 같은 흐름",
        description:
          "한국어와 영어를 지원하고 화면 크기에 맞게 콘텐츠가 배치되도록 구현했습니다. 모바일에서도 서비스 소개와 구독 동선을 이어갈 수 있습니다.",
        points: ["한·영 i18n", "모바일 반응형", "구독 안내 동선"],
        image: {
          src: "/images/portfolio/screens/sports-web-3.webp",
          width: 1920,
          height: 5362,
          alt: "GGYP 스포츠·로또 분석 · 다국어·모바일 화면",
        },
        additionalImages: [
          {
            src: "/images/portfolio/screens/sports-web-4.webp",
            width: 720,
            height: 3110,
            alt: "GGYP 스포츠·로또 분석 · 다국어·모바일 화면",
          },
        ],
        presentation: "page",
        caption: "다국어·모바일 화면",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "서비스 소개에서 구독으로 이어지는 콘텐츠 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "데스크톱·태블릿·모바일의 반응형 웹 화면을 디자인했습니다.",
      },
      {
        item: "웹 개발",
        detail: "한·영 다국어와 반응형 랜딩 페이지를 구현했습니다.",
      },
    ],
    relatedSlugs: ["sports-ai-prediction", "cosmetics-oem-web"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "derma-clinic-web": {
    title: "피부과 의원 웹사이트",
    introduction:
      "매거진 무드의 반응형 랜딩 — Hero · 시술 · 의료진 · 위치가 한 흐름으로 이어집니다.",
    cover: {
      src: "/images/home/portfolio-derma-clinic.webp",
      width: 1448,
      height: 1086,
      alt: "피부과 의원 웹사이트 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "의료·헬스케어",
      },
      {
        label: "유형",
        value: "병원 브랜드 · 반응형 웹",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "병원의 분위기를 진료 정보와 함께",
      paragraphs: [
        "피부과 의원의 브랜드 웹사이트를 매거진 무드의 반응형 랜딩으로 만들었습니다. Hero부터 시술 안내, 의료진 소개, 위치 · 예약 안내까지 상담 전환을 목표로 한 흐름으로 설계했고, 1개월 안에 런칭했습니다.",
      ],
    },
    features: [
      {
        title: "브랜드에서 진료 안내, 상담까지",
        description:
          "매거진 무드의 첫 화면에서 시술·의료진 소개와 위치·예약 안내로 이어집니다. 방문자가 병원을 이해하고 상담 정보를 찾도록 콘텐츠 순서를 구성했습니다.",
        points: [
          "매거진 무드 브랜드 디자인",
          "시술·의료진 소개",
          "위치·상담 예약 안내",
          "데스크톱·모바일 반응형",
        ],
        image: {
          src: "/images/portfolio/screens/derma-clinic-1.webp",
          width: 1920,
          height: 1200,
          alt: "피부과 의원 웹사이트 · 피부과 브랜드 웹사이트",
        },
        caption: "피부과 브랜드 웹사이트",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "브랜드 소개·시술·의료진·상담으로 이어지는 콘텐츠 흐름을 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "병원의 분위기를 담은 매거진 무드의 브랜드 화면을 디자인했습니다.",
      },
      {
        item: "웹 개발",
        detail: "데스크톱과 모바일에 대응하는 반응형 웹사이트를 구현했습니다.",
      },
    ],
    relatedSlugs: ["internal-clinic-web", "hospital-consulting-web"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "internal-clinic-web": {
    title: "내과 · 인공신장실 웹사이트",
    introduction:
      "신장내과 · 인공신장실 중심의 진료 안내와 예약 상담 동선을 담은 의원 웹사이트입니다.",
    cover: {
      src: "/images/home/portfolio-internal-clinic-laptop.webp",
      width: 1448,
      height: 1086,
      alt: "내과 · 인공신장실 웹사이트 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "의료·헬스케어",
      },
      {
        label: "유형",
        value: "병원 안내 · 반응형 웹",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "내원 전 필요한 정보를 찾기 쉽게",
      paragraphs: [
        "신장내과와 인공신장실(혈액투석)을 운영하는 내과 의원의 브랜드 웹사이트입니다. 진료 과목 · 인공신장실 안내 · 의료진 소개 · 위치 안내가 상담 전환을 목표로 한 흐름으로 이어지도록 설계했고, 실제 운영 중인 사이트입니다.",
      ],
    },
    features: [
      {
        title: "진료와 인공신장실을 소개합니다",
        description:
          "신장내과와 인공신장실을 운영하는 의원의 진료 정보를 전달합니다. 병원의 첫인상과 함께 진료 과목·의료진·위치 정보를 확인하도록 구성했습니다.",
        points: ["진료 과목·클리닉 안내", "의료진 소개", "병원 위치와 상담 안내"],
        image: {
          src: "/images/portfolio/screens/internal-clinic-live.webp",
          width: 1440,
          height: 900,
          alt: "내과 · 인공신장실 웹사이트 · 의원 웹사이트 첫 화면",
        },
        caption: "의원 웹사이트 첫 화면",
      },
      {
        title: "진료 정보를 읽고 상담으로 이어지도록",
        description:
          "인공신장실과 야간투석 안내를 포함한 진료 정보를 반응형 화면에 담았습니다. 상세 정보를 살펴본 뒤 위치 확인과 예약 상담으로 이어지는 구조입니다.",
        points: ["인공신장실·야간투석 안내", "위치·상담 예약 동선", "데스크톱·모바일 반응형"],
        image: {
          src: "/images/portfolio/screens/internal-clinic-1.webp",
          width: 1440,
          height: 10695,
          alt: "내과 · 인공신장실 웹사이트 · 진료 안내 전체 화면",
        },
        presentation: "page",
        caption: "진료 안내 전체 화면",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "진료 과목과 인공신장실, 의료진·위치·상담 정보를 정리했습니다.",
      },
      {
        item: "디자인",
        detail: "내원 전 필요한 정보를 순서대로 살펴보는 브랜드 웹 화면을 디자인했습니다.",
      },
      {
        item: "웹 개발",
        detail: "진료 안내와 상담 동선을 담은 반응형 웹사이트를 구현했습니다.",
      },
    ],
    relatedSlugs: ["derma-clinic-web", "hospital-erp-2"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "hospital-consulting-web": {
    title: "병원 컨설팅 B2B 웹사이트",
    introduction:
      "병원 개원 · 운영 · 성장 컨설팅 기업의 B2B 랜딩 — 소개 · 서비스 · 실적 · 문의 한 흐름입니다.",
    cover: {
      src: "/images/portfolio/hospital-consulting.webp",
      width: 1448,
      height: 1086,
      alt: "병원 컨설팅 B2B 웹사이트 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "의료·헬스케어",
      },
      {
        label: "유형",
        value: "B2B 기업 소개 · 반응형 웹",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "컨설팅의 범위와 근거를 명확하게",
      paragraphs: [
        "병원 개원부터 운영 · 성장까지 함께하는 컨설팅 기업의 B2B 웹사이트입니다. 회사 소개 · 서비스 · 실적 · 문의가 리드 확보를 목표로 한 흐름으로 이어지도록 설계했습니다.",
      ],
    },
    features: [
      {
        title: "소개와 서비스, 실적을 보고 문의합니다",
        description:
          "병원 개원부터 운영·성장까지 제공하는 컨설팅을 한 흐름으로 설명합니다. 회사 소개와 서비스, 실적을 확인한 방문자가 문의로 이어지도록 구성했습니다.",
        points: ["B2B 서비스 소개", "실적과 회사 정보", "문의 동선", "반응형 웹"],
        image: {
          src: "/images/portfolio/screens/consulting-web-1.webp",
          width: 1920,
          height: 16112,
          alt: "병원 컨설팅 B2B 웹사이트 · 병원 컨설팅 기업 웹사이트",
        },
        presentation: "page",
        caption: "병원 컨설팅 기업 웹사이트",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "회사 소개·서비스·실적·문의를 연결하는 B2B 콘텐츠 구조를 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "컨설팅 기업의 서비스와 실적을 전달하는 웹 화면을 디자인했습니다.",
      },
      {
        item: "웹 개발",
        detail: "문의 동선을 포함한 반응형 기업 웹사이트를 구현했습니다.",
      },
    ],
    relatedSlugs: ["internal-clinic-web", "cosmetics-oem-web"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "cosmetics-oem-web": {
    title: "화장품 OEM · ODM B2B 웹사이트",
    introduction: "제조 공정 · R&D · 인증을 보여주는 화장품 제조 기업의 B2B 랜딩입니다.",
    cover: {
      src: "/images/portfolio/onview-website.webp",
      width: 1448,
      height: 1086,
      alt: "화장품 OEM · ODM B2B 웹사이트 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "커머스",
      },
      {
        label: "유형",
        value: "제조 기업 B2B · 반응형 웹",
      },
      {
        label: "수행 범위",
        value: "기획 · 디자인 · 개발",
      },
    ],
    background: {
      title: "제조 역량이 문의의 근거가 되도록",
      paragraphs: [
        "화장품 OEM · ODM 제조 기업의 B2B 웹사이트입니다. 회사 소개 · 제조 공정 · R&D 역량 · 인증 현황 · 문의가 한 흐름으로 이어져, 발주사가 신뢰를 갖고 문의하게 만드는 구조입니다.",
      ],
    },
    features: [
      {
        title: "공정과 연구, 인증을 한 흐름으로",
        description:
          "화장품 OEM·ODM 제조 기업의 공정과 R&D 역량, 인증 현황을 소개합니다. 발주사가 필요한 정보를 확인하고 제작 문의로 이어지도록 구성했습니다.",
        points: ["제조 공정과 R&D 소개", "인증 현황 안내", "B2B 문의 동선", "반응형 웹"],
        image: {
          src: "/images/portfolio/screens/oem-web-1.webp",
          width: 1289,
          height: 16000,
          alt: "화장품 OEM · ODM B2B 웹사이트 · 화장품 제조 기업 웹사이트",
        },
        presentation: "page",
        caption: "화장품 제조 기업 웹사이트",
      },
    ],
    scope: [
      {
        item: "기획",
        detail: "제조 공정·연구 역량·인증·문의로 이어지는 정보 구조를 설계했습니다.",
      },
      {
        item: "디자인",
        detail: "제조 기업의 역량을 설명하는 B2B 웹 화면을 디자인했습니다.",
      },
      {
        item: "웹 개발",
        detail: "기업 소개와 문의 동선을 담은 반응형 웹사이트를 구현했습니다.",
      },
    ],
    relatedSlugs: ["hospital-consulting-web", "cosmetics-shop-app"],
    closing: {
      title: "우리 서비스에도 이런 흐름이 필요하신가요?",
      description:
        "만들고 싶은 서비스와 필요한 기능을 알려주세요. 화면 구성부터 개발 범위, 진행 방법까지 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "wardrobe-app": {
    title: "워드로브 패션 쇼핑",
    introduction:
      "국내·해외 배송 상품부터 중고·자체 제작 상품까지 한곳에서 둘러보는 패션 쇼핑 앱입니다.",
    cover: {
      src: "/images/home/portfolio-wardrobe-gray.webp",
      width: 1448,
      height: 1086,
      alt: "워드로브 패션 쇼핑 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "커머스",
      },
      {
        label: "유형",
        value: "패션 쇼핑 앱",
      },
      {
        label: "주요 영역",
        value: "상품 탐색 · 브랜드·상품 목록 · 쇼핑 메뉴",
      },
    ],
    background: {
      title: "여러 상품군을 한 앱에서 둘러보도록",
      paragraphs: [
        "국내·해외 배송 상품과 중고·자체 제작 상품을 함께 탐색하는 패션 쇼핑 앱입니다. 카테고리와 브랜드를 기준으로 상품을 살펴보고, 가격과 할인 정보, 관심 상품을 확인하는 화면으로 구성되어 있습니다.",
      ],
    },
    features: [],
    scopeTitle: "화면에서 확인하는 구성",
    scope: [
      {
        item: "상품 탐색",
        detail: "국내배송·해외배송·중고·자체제작 상품을 구분해 살펴봅니다.",
      },
      {
        item: "브랜드·상품 목록",
        detail: "브랜드별 상품과 가격·할인 정보를 확인합니다.",
      },
      {
        item: "쇼핑 메뉴",
        detail: "검색·관심 상품·장바구니·마이페이지로 이어지는 메뉴를 배치했습니다.",
      },
    ],
    relatedSlugs: ["cosmetics-shop-app", "commerce-inventory-erp"],
    closing: {
      title: "우리 업무에 맞는 서비스가 필요하신가요?",
      description:
        "현재의 업무와 필요한 기능을 알려주세요. 개발 범위와 진행 방법을 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "business-erp-admin": {
    title: "제조·운영 통합 ERP",
    introduction:
      "재고·생산·품질과 결재 업무를 관리하고, 주요 지표와 오늘 할 일을 한 화면에서 확인하는 ERP입니다.",
    cover: {
      src: "/images/portfolio/business-erp-admin-laptop.webp",
      width: 1448,
      height: 1086,
      alt: "제조·운영 통합 ERP 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "커머스",
      },
      {
        label: "유형",
        value: "제조·운영 웹 ERP",
      },
      {
        label: "주요 영역",
        value: "운영 대시보드 · 업무 모듈 · 협업·관리",
      },
    ],
    background: {
      title: "오늘의 업무와 운영 현황을 같은 곳에서",
      paragraphs: [
        "재고·생산·품질·결재 등 제조와 운영에 필요한 업무를 모은 ERP입니다. 대시보드에서 매출과 재고, 결재 대기 현황을 확인하고, 조치가 필요한 항목과 오늘 할 일을 살펴보는 구조입니다.",
      ],
    },
    features: [
      {
        title: "현황에서 필요한 업무로 이어집니다",
        description:
          "대시보드에 매출·미수금·재고 평가액과 결재 대기 현황을 모았습니다. 품질 판정 대기나 원부자재 부족 등 확인할 항목과 오늘 할 일을 함께 배치했습니다.",
        points: [
          "운영 지표와 조치 필요 항목",
          "오늘 할 일과 결재함",
          "재고·생산·품질 등 업무별 메뉴",
        ],
        image: {
          src: "/images/portfolio/business-erp-admin.webp",
          width: 2533,
          height: 1262,
          alt: "제조·운영 통합 ERP 대시보드",
        },
        caption: "운영 대시보드",
      },
    ],
    scopeTitle: "화면에서 확인하는 구성",
    scope: [
      {
        item: "운영 대시보드",
        detail: "주요 지표, 조치가 필요한 항목과 오늘 할 일을 확인합니다.",
      },
      {
        item: "업무 모듈",
        detail: "거래·재고·배송·생산·제조·품질 등 업무별 메뉴를 구성했습니다.",
      },
      {
        item: "협업·관리",
        detail: "결재함과 회사 캘린더, 부서 계획·문서 메뉴를 배치했습니다.",
      },
    ],
    relatedSlugs: ["commerce-inventory-erp", "hospital-erp-2"],
    imageNote: "화면의 수치는 예시입니다.",
    closing: {
      title: "우리 업무에 맞는 서비스가 필요하신가요?",
      description:
        "현재의 업무와 필요한 기능을 알려주세요. 개발 범위와 진행 방법을 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
  "commerce-inventory-erp": {
    title: "커머스 재고 관리 ERP",
    introduction:
      "상품별 재고 현황, 입출고 이력과 채널 동기화 상태를 한곳에서 확인하는 커머스 ERP입니다.",
    cover: {
      src: "/images/portfolio/commerce-inventory-erp-dashboard-monitor.webp",
      width: 1448,
      height: 1086,
      alt: "커머스 재고 관리 ERP 대표 이미지",
    },
    facts: [
      {
        label: "분야",
        value: "커머스",
      },
      {
        label: "유형",
        value: "커머스 운영 웹 ERP",
      },
      {
        label: "주요 영역",
        value: "상품·재고 · 주문·채널 · 운영 지표",
      },
    ],
    background: {
      title: "주문과 재고, 채널 상태를 함께",
      paragraphs: [
        "상품별 재고와 입출고, 채널 연동 상태를 한곳에서 확인하는 커머스 ERP입니다. 대시보드에 오늘 처리할 일과 매출·주문·재고 정보를 배치하고, 업무별 관리 메뉴로 연결했습니다.",
      ],
    },
    features: [
      {
        title: "판매 현황과 처리할 일을 한눈에",
        description:
          "상품 준비와 출고 대기, 매칭 오류·클레임 등 처리할 항목을 상단에 모았습니다. 채널별 매출과 주문 상태, 재고 현황·정산 일정을 같은 대시보드에서 확인하는 화면입니다.",
        points: [
          "오늘 할 일과 처리 필요 항목",
          "채널별 매출·주문·재고 현황",
          "정산 일정과 운영 메뉴",
        ],
        image: {
          src: "/images/portfolio/commerce-inventory-erp-dashboard.webp",
          width: 2530,
          height: 1264,
          alt: "커머스 재고 관리 ERP 대시보드",
        },
        caption: "운영 대시보드",
      },
    ],
    scopeTitle: "화면에서 확인하는 구성",
    scope: [
      {
        item: "상품·재고",
        detail: "상품 관리와 재고 현황, 입출고 정보를 확인합니다.",
      },
      {
        item: "주문·채널",
        detail: "주문 관리와 채널 연동, 동기화 상태를 확인합니다.",
      },
      {
        item: "운영 지표",
        detail: "매출·정산, 고객 관리와 오늘 처리할 항목을 모았습니다.",
      },
    ],
    relatedSlugs: ["cafe24-admin", "business-erp-admin"],
    imageNote: "화면의 수치는 예시입니다.",
    closing: {
      title: "우리 업무에 맞는 서비스가 필요하신가요?",
      description:
        "현재의 업무와 필요한 기능을 알려주세요. 개발 범위와 진행 방법을 함께 정리합니다.",
      label: "맞춤 개발 견적 요청",
    },
  },
} satisfies Readonly<Record<string, PortfolioCaseStudy>>;
