import { routes } from "@/shared/config";
import { ButtonLink, DataTable } from "@/shared/ui";
import type { DoneContent } from "../model/content";

/** 접수 완료 화면: 회신 안내 + 다음 절차 + 둘러볼 곳 */
export function DoneView({ content }: { content: DoneContent }) {
  return (
    <div role="status" className="space-y-5 rounded-[18px] bg-surface p-7">
      <div>
        <p className="text-lg font-semibold">{content.title}</p>
        <p className="mt-1 text-foreground/70">{content.description}</p>
      </div>
      <DataTable
        columns={["다음 절차", "내용"]}
        rows={content.steps.map((s, index) => [`${index + 1}. ${s.step}`, s.detail])}
      />
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={routes.portfolio} variant="secondary">
          만든 것 보기
        </ButtonLink>
        <ButtonLink href={routes.pricing} variant="secondary">
          요금 보기
        </ButtonLink>
      </div>
    </div>
  );
}
