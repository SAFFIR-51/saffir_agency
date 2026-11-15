import { Suspense } from "react";
import { SubpageSection } from "@/shared/sections";
import { contactContent as c } from "../model/content";
import { ContactForm } from "./contact-form";

/**
 * 프로젝트 문의: 포트폴리오·요금 안내와 같은 시작(영문 제목 + 한글 두 줄).
 * 검은 선 아래 왼쪽은 진행 순서, 오른쪽은 문의서.
 */
export function ContactPage() {
  return (
    <div className="bg-white pb-28 text-black lg:pb-40">
      <h1 className="sr-only">{c.title}</h1>
      <SubpageSection
        id="contact-title"
        first
        en="Contact"
        sub={[c.lead, "문의 유형을 고르면 맞는 담당자가 영업일 기준 1~2일 안에 연락드립니다."]}
      >
        <div className="grid gap-12 border-t border-black pt-8 lg:grid-cols-12 lg:gap-x-4 lg:pt-10">
          <div className="lg:col-span-4">
            {/* 진행 순서: 엑셀식 표 (단계 · 진행 · 내용) */}
            <table className="w-full border-collapse text-[0.9375rem] leading-[1.5]">
              <caption className="mb-3 text-left text-sm font-semibold text-neutral-500">
                진행 순서
              </caption>
              <thead>
                <tr>
                  {["단계", "진행", "내용"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="border border-neutral-300 bg-[#f3f3f3] px-3 py-2.5 text-left text-sm font-semibold whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.done.steps.map((s, i) => (
                  <tr key={s.step}>
                    <td className="border border-neutral-300 px-3 py-3 text-left text-sm text-neutral-500 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <th
                      scope="row"
                      className="border border-neutral-300 px-3 py-3 text-left font-semibold whitespace-nowrap"
                    >
                      {s.step}
                    </th>
                    <td className="border border-neutral-300 px-3 py-3 text-sm text-neutral-700">
                      {s.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {/* 주소의 ?type= 값을 읽으므로 Suspense 안에서 그린다 */}
            <Suspense fallback={<div aria-hidden="true" className="h-96 bg-[#f3f3f3]" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </SubpageSection>
    </div>
  );
}
