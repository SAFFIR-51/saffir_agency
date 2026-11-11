import Link from "next/link";
import { Suspense } from "react";
import { DataTable, PageHeader, Section, WireBox } from "@/shared/ui";
import { contactContent as c, contactTypes } from "../model/content";
import { ContactForm } from "./contact-form";

export function ContactPage() {
  return (
    <>
      <PageHeader title={c.title} lead={c.lead} />
      <Section label="S2 · 문의 유형" title="어떤 상담이 필요하세요?">
        <DataTable
          columns={["문의 유형", "자세히 보기"]}
          rows={contactTypes.map((t) => [
            t.label,
            <Link key={t.label} href={t.href} className="underline underline-offset-4">
              보기
            </Link>,
          ])}
        />
      </Section>
      <Section label="S3 · 문의서" title="문의 남기기">
        {/* 주소의 ?type= 값을 읽으므로 Suspense 안에서 그린다 */}
        <Suspense fallback={<WireBox label="문의서" size="lg" />}>
          <ContactForm />
        </Suspense>
      </Section>
    </>
  );
}
