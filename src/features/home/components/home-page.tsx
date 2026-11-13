import {
  EntrySection,
  ModelsSection,
  ModulesSection,
  PricingSection,
  WorkflowSection,
} from "./landing/home-sections";
import { LandingHero } from "./landing/landing-hero";
import { LandingWorks } from "./landing/landing-works";

/**
 * 메인: 첫 화면 → 세 갈래 → 대표 포트폴리오 → 제공 방식 → 진행 순서 → 보유 모듈 → 요금.
 * 맨 아래 문의 폼은 페이지(app)에서 붙이고, 푸터는 레이아웃에 있다.
 */
export function HomePage() {
  return (
    <>
      <LandingHero />
      <EntrySection />
      <LandingWorks />
      <ModelsSection />
      <WorkflowSection />
      <ModulesSection />
      <PricingSection />
    </>
  );
}
