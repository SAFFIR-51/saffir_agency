import Link from "next/link";
import { landing } from "../../model/landing-content";
import { Cate, ColorSlot, MainTitle, MoreLink, Wrap } from "./parts";

const c = landing.solutions;

/**
 * 솔루션 목록: 줄마다 번호·이름·한 줄 설명·썸네일·분류.
 * 올리면 위 선이 생기고 썸네일이 살짝 커지며 화살표가 움직인다.
 */
export function LandingSolutions() {
  return (
    <section className="pt-[clamp(100px,12vw,200px)]">
      <Wrap>
        <Cate>{c.label}</Cate>
        <MainTitle className="mt-1">{c.title}</MainTitle>
        <ul className="mt-[clamp(40px,6vw,90px)] border-b-2 border-black/10">
          {c.items.map((item, i) => (
            <li key={item.href} className="landing-fade">
              <Link
                href={item.href}
                className="group grid grid-cols-[1fr_auto] gap-x-6 gap-y-4 border-t-2 border-black/10 py-[clamp(24px,3vw,48px)] transition-colors hover:border-black focus-visible:border-black focus-visible:outline-none lg:grid-cols-[30%_22.5%_1fr_auto]"
              >
                <span className="flex flex-col justify-between gap-4">
                  <span>
                    <span className="lt-body block font-semibold text-black/40 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="lt-row-title mt-1 block transition-transform duration-300 group-hover:translate-x-2">
                      {item.title}
                    </span>
                  </span>
                  <span className="lt-row-meta text-[#666]">{item.note}</span>
                </span>
                <span className="col-start-2 row-start-1 flex flex-col items-end justify-between lg:col-start-4">
                  <span
                    aria-hidden
                    className="lt-row-title leading-none transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-(--landing-signal)"
                  >
                    ↗
                  </span>
                  <span className="lt-row-meta whitespace-nowrap text-[#666] uppercase">
                    {item.line}
                  </span>
                </span>
                <ColorSlot
                  color={c.colors[i % c.colors.length] ?? "#ddd"}
                  label={`${item.title} 화면`}
                  className="col-span-2 aspect-[235/134] w-2/3 transition-transform duration-500 group-hover:scale-[1.03] lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:w-full"
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <MoreLink href={c.more.href}>{c.more.label}</MoreLink>
        </div>
      </Wrap>
    </section>
  );
}
