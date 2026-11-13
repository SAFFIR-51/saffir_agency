import { Big_Shoulders } from "next/font/google";

/**
 * 메인 첫 화면 영문 글꼴 (가변: 굵기 + 광학 크기).
 * 광학 크기(opsz)는 글자 크기를 따라 자동으로 바뀌므로 큰 제목은 좁고 굵게, 작은 글자는 넓게 보인다.
 */
export const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
  display: "swap",
});
