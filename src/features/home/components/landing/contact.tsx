import Link from "next/link";
import { landing } from "../../model/landing-content";
import { Wrap } from "./parts";

const c = landing.contact;

/** 상담 띠: 알약 모양 큰 버튼(올리면 검정이 차오름) + 주황 원 화살표 */
export function LandingContact() {
  return (
    <section className="py-[clamp(48px,6vw,80px)]">
      <Wrap className="flex items-stretch">
        <Link
          href={c.href}
          className="group relative flex aspect-[738/316] w-[70%] items-center justify-center overflow-hidden rounded-full bg-[#333] text-center text-white"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-[37%] bg-black transition-[width] duration-700 ease-out group-hover:w-full"
          />
          <span className="lt-contact relative px-[8%] text-balance">{c.title}</span>
        </Link>
        <Link
          href={c.href}
          className="group flex aspect-square w-[30%] items-center justify-center rounded-full bg-(--landing-signal) text-white transition-colors duration-300 hover:bg-black"
        >
          <span className="sr-only">{c.cta}</span>
          <svg
            aria-hidden
            viewBox="0 0 64 24"
            className="w-[34%] transition-transform duration-300 group-hover:translate-x-2"
          >
            <path d="M0 12h62M51 1l11 11-11 11" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </Link>
      </Wrap>
      <p className="sr-only">{c.description}</p>
    </section>
  );
}
