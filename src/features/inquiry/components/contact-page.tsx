import Link from "next/link";
import { Suspense } from "react";
import { PageHeader, WireBox } from "@/shared/ui";
import { contactContent as c, contactTypes } from "../model/content";
import { ContactForm } from "./contact-form";

/** 문의 (NHN Cloud 하위 페이지 구성): 검정 띠 → 왼쪽 문의 유형 안내 + 오른쪽 문의서 카드 */
export function ContactPage() {
  return (
    <>
      <PageHeader title={c.title} lead={c.lead} tone="teal" />
      <div className="nc-container grid gap-10 py-16 lg:grid-cols-[360px_minmax(0,1fr)] lg:py-[100px]">
        <section aria-labelledby="ct-types">
          <h2 id="ct-types" className="text-[24px] leading-[34px] font-bold text-[#111]">
            어떤 상담이 필요하세요?
          </h2>
          <p className="mt-2 text-[15px] leading-[22px] text-[#51565f]">
            유형별 안내 페이지를 먼저 둘러봐도 좋습니다.
          </p>
          <ul className="mt-6 divide-y divide-[#e2e5eb] border-y border-[#e2e5eb]">
            {contactTypes.map((t) => (
              <li key={t.label}>
                <Link
                  href={t.href}
                  className="flex items-center justify-between gap-4 py-4 text-[15px] text-[#111] hover:text-[#125de6]"
                >
                  {t.label}
                  <span aria-hidden className="text-[#9499a2]">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section
          aria-labelledby="ct-form"
          className="rounded-xl border border-[#e2e5eb] bg-white p-6 sm:p-10"
        >
          <h2 id="ct-form" className="text-[24px] leading-[34px] font-bold text-[#111]">
            문의 남기기
          </h2>
          <div className="mt-6">
            {/* 주소의 ?type= 값을 읽으므로 Suspense 안에서 그린다 */}
            <Suspense fallback={<WireBox label="문의서" size="lg" />}>
              <ContactForm />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}
