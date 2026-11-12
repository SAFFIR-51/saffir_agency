import { LandingAbout } from "./about";
import { LandingContact } from "./contact";
import { LandingHero } from "./hero";
import { LandingMessage } from "./message";
import { LandingPortfolio } from "./portfolio";
import { LandingProcess } from "./process";
import { LandingService } from "./service";
import { LandingSolutions } from "./solutions";
import { LandingTeam } from "./team";

/** 메인 시안: 히어로 → 소개 → 사례 → 진행 순서 → 서비스 → 일하는 방식 → 솔루션 → 문구 → 상담 */
export function LandingPage() {
  return (
    <>
      <LandingHero />
      <LandingAbout />
      <LandingPortfolio />
      <LandingProcess />
      <LandingService />
      <LandingTeam />
      <LandingSolutions />
      <LandingMessage />
      <LandingContact />
    </>
  );
}
