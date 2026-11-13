"use client";

import { useSearchParams } from "next/navigation";
import { contactContent, contactTypeLabelFor } from "../model/content";
import { QuickInquiry } from "./quick-inquiry";

/** 문의 페이지 폼: 다른 페이지 버튼에서 ?type=으로 문의 유형을 미리 골라 온다 */
export function ContactInquiry() {
  const preselect = contactTypeLabelFor(useSearchParams().get("type"));
  return (
    <QuickInquiry
      key={preselect}
      preselect={preselect}
      source="contact"
      heading={contactContent.form}
      plain
    />
  );
}
