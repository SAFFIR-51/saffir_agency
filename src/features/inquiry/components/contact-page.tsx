import Link from "next/link";
import { BulletList, PageHeader, Section, Todo } from "@/shared/ui";
import { contactContent } from "../model/content";

export function ContactPage() {
  return (
    <>
      <PageHeader title={contactContent.title} lead={contactContent.lead} />
      <Section title="문의 유형 (안)">
        <BulletList
          items={contactContent.types.map((t) => (
            <Link key={t.label} href={t.href} className="underline underline-offset-4">
              {t.label}
            </Link>
          ))}
        />
      </Section>
      <Section title="문의 입력 항목 (안)">
        <BulletList items={contactContent.fields} />
        <Todo>문의 폼</Todo>
      </Section>
    </>
  );
}
