import type { Route } from "next";
import { routes } from "@/shared/config";
import { ButtonPair } from "@/shared/sections";
import type { DoneContent } from "../model/content";

/** 접수 완료 화면: 회신 안내 + 다음 절차(번호 줄) + 둘러볼 곳 */
export function DoneView({ content }: { content: DoneContent }) {
  return (
    <div role="status" className="border-t border-black pt-8">
      <p className="text-2xl leading-[1.3] font-bold tracking-[-0.03em]">{content.title}</p>
      <p className="mt-2 text-[0.9375rem] leading-[1.6] text-neutral-700">{content.description}</p>
      <ol className="mt-10 grid gap-x-4 gap-y-6 sm:grid-cols-2">
        {content.steps.map((s, i) => (
          <li key={s.step} className="border-t border-neutral-300 pt-4">
            <span className="font-display text-sm text-neutral-400 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-lg font-bold tracking-[-0.02em]">{s.step}</p>
            <p className="mt-1 text-[0.9375rem] leading-[1.6] text-neutral-700">{s.detail}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <ButtonPair
          secondary={{ href: routes.portfolio as Route, label: "만든 것 보기" }}
          primary={{ href: routes.pricing as Route, label: "요금 보기" }}
        />
      </div>
    </div>
  );
}
