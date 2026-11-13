import Link from "next/link";
import { ImageSlot, LandingSection } from "@/shared/ui";
import { aboutContent as c } from "../model/content";
import "./about.css";

/** 핵심 가치 아래에 붙는 선 그림 3종 (장식) */
function ValueMark({ index }: { index: number }) {
  const rays = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI;
    const dx = Math.cos(a) * 270;
    const dy = Math.sin(a) * 270;
    return `M${270 - dx} ${270 - dy}L${270 + dx} ${270 + dy}`;
  }).join("");
  return (
    <svg viewBox="0 0 540 540" fill="none" stroke="currentColor" aria-hidden="true">
      {index === 0 ? (
        <>
          <path d={rays} />
          <circle cx={270} cy={270} r={56} fill="#f8f8f8" />
        </>
      ) : null}
      {index === 1
        ? [250, 200, 150, 100, 50].map((r, i) => (
            <circle key={r} cx={270 - i * 30} cy={270} r={r} />
          ))
        : null}
      {index === 2
        ? Array.from({ length: 7 }, (_, i) => (
            <rect
              key={i}
              x={20 + i * 25}
              y={20 + i * 25}
              width={500 - i * 50}
              height={500 - i * 50}
            />
          ))
        : null}
    </svg>
  );
}

export function AboutPage() {
  return (
    <div className="ab">
      {/* 첫 화면: 큰 제목 + 넓은 이미지 칸 */}
      <section className="ab-hero ls-sec" aria-labelledby="about-title">
        <div className="ls-inner">
          <h1 id="about-title" className="ls-title ab-hero-title" lang="en">
            {c.hero.title[0]}
            <br />
            {c.hero.title[1]}
          </h1>
          <div className="ab-hero-media">
            <ImageSlot label={c.hero.slot} />
          </div>
        </div>
      </section>

      {/* 우리는 누구인가 */}
      <LandingSection
        id="about-who"
        title={c.who.title}
        subtitle={c.who.subtitle}
        en={c.who.en}
        ko={c.who.ko}
      />

      {/* 핵심 가치 3가지 */}
      <LandingSection id="about-values" title={c.values.title}>
        <ul className="ab-values">
          {c.values.items.map((item, i) => (
            <li key={item.title}>
              <h3 className="ls-sub" lang="en">
                {item.title}
              </h3>
              <div className="ls-desc">
                <p lang="en">{item.en}</p>
                <p className="ls-ko">{item.ko}</p>
              </div>
              <div className="ab-value-mark">
                <ValueMark index={i} />
              </div>
            </li>
          ))}
        </ul>
      </LandingSection>

      {/* 비전: 왼쪽 두 항목, 오른쪽 이미지 칸 */}
      <LandingSection id="about-vision" title={c.vision.title}>
        <div className="ab-vision">
          <ul className="ab-vision-list">
            {c.vision.items.map((item) => (
              <li key={item.title[0]}>
                <h3 className="ls-sub" lang="en">
                  {item.title[0]}
                  <br />
                  {item.title[1]}
                </h3>
                <div className="ls-desc">
                  <p lang="en">{item.en}</p>
                  <p className="ls-ko">{item.ko}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="ab-vision-media">
            <ImageSlot label={c.vision.slot} tone={6} />
          </div>
        </div>
      </LandingSection>

      {/* 하는 일: 검은 배경, 정사각형 카드 6장 */}
      <LandingSection
        id="about-what"
        title={c.what.title}
        subtitle={c.what.subtitle}
        ko={c.what.ko}
      >
        <ul className="ab-cards">
          {c.what.cards.map((card, i) => (
            <li key={card.title}>
              <Link href={card.href}>
                <ImageSlot label={card.slot} tone={i % 3} />
                <div className="ab-card-info">
                  <strong lang="en">{card.title}</strong>
                  <div className="ab-card-desc">
                    <p lang="en">{card.en}</p>
                    <p className="ls-ko">{card.ko}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </LandingSection>

      {/* 정체성: 설명 + 이미지 칸 두 개 */}
      <section className="ab-identity ls-sec" aria-labelledby="about-identity">
        <div className="ls-inner">
          <h2 id="about-identity" className="ls-title" lang="en">
            {c.identity.title}
          </h2>
          <div className="ls-desc ab-identity-desc">
            <h3 className="ls-sub" lang="en">
              {c.identity.subtitle}
            </h3>
            <p lang="en">{c.identity.en}</p>
            <p className="ls-ko">{c.identity.ko}</p>
          </div>
          <div className="ab-banners">
            {c.identity.slots.map((slot, i) => (
              <div key={slot} className="ab-banner">
                <ImageSlot label={slot} tone={i * 3} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
