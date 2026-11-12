import { landing } from "../../model/landing-content";
import { Cate, Wrap } from "./parts";
import { RiseLetters } from "./rise-letters";

const c = landing.message;

/** 마무리 문구: 두 줄 큰 글자가 엇갈려 올라온다 */
export function LandingMessage() {
  return (
    <section className="pt-[clamp(100px,12vw,200px)]">
      <Wrap>
        <Cate className="text-[calc(var(--lr)*1.875)]!">{c.label}</Cate>
        <p className="lt-message mt-6">
          <span className="block pl-[22%]">
            <RiseLetters text={c.top} />
          </span>
          <span className="block">
            <RiseLetters text={c.bottom} startIndex={c.top.length} />
          </span>
        </p>
      </Wrap>
    </section>
  );
}
