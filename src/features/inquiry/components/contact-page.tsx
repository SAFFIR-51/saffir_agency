import Link from "next/link";
import { DataTable, PageHeader, Section, WireButton, WireInput } from "@/shared/ui";
import { contactContent as c } from "../model/content";

export function ContactPage() {
  return (
    <>
      <PageHeader title={c.title} lead={c.lead} />
      <Section label="S2 · 문의 유형" title="어떤 상담이 필요하세요?">
        <DataTable
          columns={["문의 유형", "자세히 보기"]}
          rows={c.types.map((t) => [
            t.label,
            <Link key={t.label} href={t.href} className="underline underline-offset-4">
              보기
            </Link>,
          ])}
        />
      </Section>
      <Section label="S3 · 문의서" title="문의 남기기">
        <div className="max-w-xl space-y-4">
          {c.fields.map((f) => (
            <WireInput key={f.label} {...f} />
          ))}
          <WireButton>문의 보내기</WireButton>
        </div>
      </Section>
    </>
  );
}
