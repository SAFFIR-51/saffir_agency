import { landingContent as c } from "../../model/landing-content";
import { bigShoulders } from "../../model/big-shoulders";
import { GlassCube } from "./glass-cube";
import { TextRing } from "./text-ring";
import { TopFace } from "./top-face";
import "./landing.css";

/**
 * 메인 첫 화면. 화면 높이 전체를 쓰고 헤더가 위에 겹친다.
 * 왼쪽 큐브와 오른쪽 원형 글자는 장식, 가운데에 제목·설명·서비스 정사각형.
 */
export function LandingHero() {
  return (
    <section className={`lp-hero ${bigShoulders.variable}`} aria-labelledby="lp-hero-title">
      <div className="lp-stage" aria-hidden="true">
        <div className="lp-stage-inner">
          <span className="lp-ice">
            <GlassCube />
          </span>
          <span className="lp-ring">
            <TextRing text={c.ring} />
          </span>
        </div>
      </div>
      <div className="lp-center">
        <div className="lp-title">
          <h1 id="lp-hero-title">
            {c.title[0]}
            <br />
            {c.title[1]}
          </h1>
          <p>{c.description}</p>
        </div>
        <div className="lp-face">
          <TopFace lines={c.services} />
        </div>
      </div>
    </section>
  );
}
