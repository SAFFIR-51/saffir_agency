import Link from "next/link";
import { outsourcingDeposits } from "@/content/pricing";
import { routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import { detailPageWidth, SubpageSection, underlineLink } from "@/shared/sections";
import { estimateContent as c } from "../model/content";
import { EstimateForm } from "./estimate-form";

const th =
  "border border-neutral-300 bg-[#f3f3f3] px-3 py-2.5 text-left text-sm font-semibold whitespace-nowrap";
const td = "border border-neutral-300 px-3 py-3";

/**
 * 맞춤 개발 견적 요청: 문의 페이지와 같은 시작(영문 제목 + 한글 두 줄).
 * 검은 선 아래 왼쪽은 진행 순서와 정찰가 패키지, 오른쪽은 단계별 요청서.
 */
export function EstimatePage() {
  return (
    <div className={`${detailPageWidth} bg-white pb-28 text-black lg:pb-40`}>
      <h1 className="sr-only">{c.title}</h1>
      <SubpageSection id="estimate-title" first en="Estimate" sub={c.sub}>
        <div className="grid gap-12 border-t border-black pt-8 lg:grid-cols-12 lg:gap-x-4 lg:pt-10">
          <div className="flex flex-col gap-12 lg:col-span-4">
            <table className="w-full border-collapse text-[0.9375rem] leading-[1.5]">
              <caption className="mb-3 text-left text-sm font-semibold text-neutral-500">
                견적 진행 순서
              </caption>
              <thead>
                <tr>
                  {["단계", "진행", "내용"].map((h) => (
                    <th key={h} scope="col" className={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.steps.map((s, i) => (
                  <tr key={s.step}>
                    <td className={`${td} text-sm text-neutral-500 tabular-nums`}>
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <th scope="row" className={`${td} text-left font-semibold whitespace-nowrap`}>
                      {s.step}
                    </th>
                    <td className={`${td} text-sm text-neutral-700`}>{s.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <table className="w-full border-collapse text-[0.9375rem] leading-[1.5]">
                <caption className="mb-3 text-left text-sm font-semibold text-neutral-500">
                  {c.fixed.caption}
                </caption>
                <thead>
                  <tr>
                    {["상품", "계약금", ""].map((h, i) => (
                      <th key={i} scope="col" className={th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {outsourcingDeposits.map((p) => (
                    <tr key={p.id}>
                      <th scope="row" className={`${td} text-left font-semibold`}>
                        {p.name}
                      </th>
                      <td className={`${td} whitespace-nowrap tabular-nums`}>
                        {p.setup != null ? formatKRW(p.setup) : "-"}
                      </td>
                      <td className={`${td} whitespace-nowrap`}>
                        <Link href={routes.order(p.id)} className={underlineLink}>
                          결제하기
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-sm text-neutral-600">{c.fixed.note}</p>
            </div>

            <p className="text-sm leading-[1.7] text-neutral-600">
              요청서를 쓰기 어렵다면{" "}
              <Link href={routes.contactFor("development-estimate")} className={underlineLink}>
                문의하기
              </Link>
              로 편하게 남겨 주세요. 통화로 같이 정리해 드립니다.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <EstimateForm />
          </div>
        </div>
      </SubpageSection>
    </div>
  );
}
