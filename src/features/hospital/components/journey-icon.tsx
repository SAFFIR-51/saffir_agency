/**
 * 진행 흐름 목록 아이콘 (24px, 1.5 선).
 * 페이지 안에서 같은 아이콘을 두 번 쓰지 않는다: 항목마다 다른 모양을 쓴다.
 */
const paths = {
  /** 무료 진단: 돋보기 */
  diagnose: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5M8 10.5h5M10.5 8v5" />
    </>
  ),
  /** 의료광고 문구 검사: 방패 + 체크 */
  shield: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  /** 분야별 진단 항목: 체크리스트 */
  list: (
    <>
      <path d="m4 6.5 1.5 1.5L8 5.5M4 12.5 5.5 14 8 11.5M4 18.5 5.5 20 8 17.5" />
      <path d="M11 7h9M11 13h9M11 19h9" />
    </>
  ),
  /** 문구 붙여넣기: 입력창과 커서 */
  textbox: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10v4M6 10h2M6 14h2M11 12h6" />
    </>
  ),
  /** 무료로 검사: 반복 화살표 */
  repeat: (
    <>
      <path d="M4 11V9.5A3.5 3.5 0 0 1 7.5 6H19m0 0-3-3m3 3-3 3" />
      <path d="M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H5m0 0 3 3m-3-3 3-3" />
    </>
  ),
  /** 참고용 결과: 안내 i */
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.75h.01" />
    </>
  ),
  /** 회원가입: 사람 + 더하기 */
  signup: (
    <>
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M3 19.5c.8-3.3 3.4-5 6.5-5s5.7 1.7 6.5 5M18.5 7v6M15.5 10h6" />
    </>
  ),
  /** 월간 추적: 꺾은선 그래프 */
  track: (
    <>
      <path d="M3.5 4v16h17" />
      <path d="m7 15 4-4.5 3 3L19.5 8" />
    </>
  ),
  /** 홈페이지 개선: 브라우저 창 */
  website: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9h18M6 6.75h.01M8.5 6.75h.01M7 13h6M7 16h9" />
    </>
  ),
  /** 진료 항목별 페이지: 겹친 문서 */
  pages: (
    <>
      <path d="M8 3.5h8.5L20 7v10.5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1z" />
      <path d="M16.5 3.5V7H20M4 7.5v12a1 1 0 0 0 1 1h10M10 11h6M10 14h6" />
    </>
  ),
  /** 예약·상담 연결: 이어진 고리 */
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
  /** 예약 버튼 누름: 손가락 포인터 */
  pointer: (
    <>
      <path d="M9.5 11V4.75a1.75 1.75 0 0 1 3.5 0V10l4.6.9a2 2 0 0 1 1.6 2.2l-.6 4.4A3 3 0 0 1 15.6 20H11a3 3 0 0 1-2.4-1.2L5.4 14.6a1.6 1.6 0 0 1 2.4-2.1z" />
    </>
  ),
  /** 바로 연결: 종이비행기 */
  send: (
    <>
      <path d="M20.5 3.5 3.5 10.5l7 2.5 2.5 7z" />
      <path d="m10.5 13 10-9.5" />
    </>
  ),
  /** 월 관리: 달력 */
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2" />
    </>
  ),
  /** 환자 관리: 클립보드 */
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="16" rx="2" />
      <path d="M9 3h6v3H9zM8.5 11h7M8.5 14.5h7M8.5 18h4" />
    </>
  ),
  /** 환자 분류: 겹친 층 */
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />
    </>
  ),
  /** 리콜·사후관리 메시지: 말풍선 */
  message: (
    <>
      <path d="M4 5.5h16v11H9.5L5 20v-3.5H4z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  /** 전용 서버: 서버 랙 */
  server: (
    <>
      <rect x="4" y="3.5" width="16" height="7" rx="1.5" />
      <rect x="4" y="13.5" width="16" height="7" rx="1.5" />
      <path d="M7.5 7h.01M7.5 17h.01M11 7h5.5M11 17h5.5" />
    </>
  ),
} as const;

export type JourneyIconName = keyof typeof paths;

export function JourneyIcon({ name }: { name: JourneyIconName }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
