import { homeContent } from "../model/content";
import { FitWordmark } from "./fit-wordmark";

const t = homeContent.layout.type;
const pad = "px-5 lg:px-10";

/**
 * 1. 첫 화면: 왼쪽 위 짧은 영문 태그 + 한글 소개, 아래 큰 워드마크 (ANCORS 참고).
 * 워드마크 오른쪽 끝은 아래 두 번째 카드의 오른쪽 끝에 맞춘다(데스크톱).
 * 높이를 화면보다 약 13rem(모바일 7rem) 낮게 잡아 첫 화면에 아래 카드 윗부분이 보이게 한다.
 */
export function TypeHero() {
  return (
    <section
      aria-labelledby="home-title"
      className={`relative flex min-h-[calc(100svh-4rem-7rem)] flex-col justify-end overflow-hidden pt-16 lg:min-h-[calc(100svh-80px-13rem)] ${pad}`}
    >
      <div className="flex items-start justify-between gap-8">
        <div>
          <p className="w-fit text-[0.9375rem] leading-[1.35] tracking-[-0.01em] uppercase lg:text-lg">
            <span className="block font-bold">{t.tagline[0]}</span>
            <span className="block">{t.tagline[1]}</span>
            <span className="block">{t.tagline[2]}</span>
          </p>
          <p className="mt-8 text-sm leading-[1.6] text-neutral-700 lg:text-[0.9375rem]">
            {t.intro[0]}
            <br />
            {t.intro[1]}
          </p>
        </div>
      </div>

      <FitWordmark
        id="home-title"
        text={t.wordmark}
        className="mt-6 -mb-[0.11em] text-[22vw] leading-none font-black tracking-[-0.06em] whitespace-nowrap text-black md:text-[calc(21.2vw-9px)] lg:mt-8 lg:text-[calc(21.2vw-17.7px)]"
      />
    </section>
  );
}
