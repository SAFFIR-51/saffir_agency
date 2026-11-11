import { Section } from "@/shared/ui";

/** 화면 작업 전 임시 자리. 각 feature 화면이 완성되면 사라집니다. */
export function PagePlaceholder({
  title,
  description,
  sections = [],
}: {
  title: string;
  description?: string;
  sections?: string[];
}) {
  return (
    <Section title={title} description={description}>
      {sections.length > 0 ? (
        <ol className="list-decimal space-y-2 pl-5 text-foreground/70">
          {sections.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      ) : null}
    </Section>
  );
}
