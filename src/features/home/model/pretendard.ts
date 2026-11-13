import localFont from "next/font/local";

/** 한글 본문 글꼴 (Pretendard, SIL OFL). 영문 제목 옆 한글 설명에 쓴다. */
export const pretendard = localFont({
  src: "../assets/PretendardVariable.woff2",
  weight: "45 920",
  display: "swap",
  variable: "--font-pretendard",
});
