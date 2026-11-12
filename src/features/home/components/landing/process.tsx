import { landing } from "../../model/landing-content";
import { Cate, RevealText, Wrap } from "./parts";

const c = landing.process;

/** 주황 띠: 소개 글 + 일하는 순서 4단계 */
export function LandingProcess() {
  return (
    <section className="mt-[clamp(100px,14vw,240px)] bg-(--landing-signal) py-[clamp(56px,7vw,110px)] text-white">
      <Wrap>
        <div className="grid gap-6 lg:grid-cols-[38%_1fr]">
          <Cate className="text-[calc(var(--lr)*1.875)]!">{c.label}</Cate>
          <RevealText tone="light">{c.text}</RevealText>
        </div>
        <ol className="mt-[clamp(56px,9vw,150px)] grid gap-x-[30px] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {c.steps.map((step, i) => (
            <li
              key={step.step}
              className="landing-fade border-t-4 border-white pt-[calc(var(--lr)*1.2)]"
            >
              <span className="lt-more block tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="lt-acc-title mt-[calc(var(--lr)*2)] block">{step.step}</span>
              <span className="lt-side-text mt-2 block text-white/80">{step.detail}</span>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}
