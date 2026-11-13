import { Suspense } from "react";
import { PageHead } from "@/shared/ui";
import { contactContent as c } from "../model/content";
import { ContactInquiry } from "./contact-inquiry";
import { QuickInquiry } from "./quick-inquiry";

/** 문의 페이지: 머리 → 문의 폼 */
export function ContactPage() {
  return (
    <div className="lc">
      <PageHead eyebrow={c.eyebrow} lead={c.lead} />
      {/* 주소의 ?type= 값을 읽으므로 Suspense 안에서 그린다. 그 전에는 빈 폼 */}
      <Suspense fallback={<QuickInquiry source="contact" heading={c.form} plain />}>
        <ContactInquiry />
      </Suspense>
    </div>
  );
}
