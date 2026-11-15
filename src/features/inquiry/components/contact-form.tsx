"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { applyFieldErrors, cn, track } from "@/shared/lib";
import { ButtonLabel, darkButton } from "@/shared/sections";
import { ConsentField, FormField, Input, Select, Textarea, fieldA11y } from "@/shared/ui";
import { submitContact } from "../api/submit-contact";
import {
  consentText,
  contactContent,
  contactTypeLabelFor,
  contactTypeLabels,
} from "../model/content";
import { contactSchema, type ContactInput } from "../model/schema";
import { DoneView } from "./done-view";

const defaultValues: ContactInput = {
  organization: "",
  contactName: "",
  phone: "",
  type: "",
  message: "",
  agree: false,
};

/** 사피어 입력칸: 버튼과 같은 높이 48·모서리 8, 옅은 테두리, 고르면 검은 테두리 */
const field =
  "h-12 rounded-lg border-neutral-300 bg-white px-4 text-[0.9375rem] focus-visible:border-black";
const area =
  "min-h-44 rounded-lg border-neutral-300 bg-white px-4 py-3 text-[0.9375rem] focus-visible:border-black";

/** 다른 페이지 버튼에서 ?type=으로 문의 유형을 미리 골라 온다 */
export function ContactForm() {
  const preselected = contactTypeLabelFor(useSearchParams().get("type"));
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { ...defaultValues, type: preselected },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await submitContact(values);
    if (!result.ok) {
      setServerError(result.error);
      applyFieldErrors(setError, result.fieldErrors);
      return;
    }
    track("consult_submitted", { source: "contact", type: values.type });
    setDone(true);
  });

  if (done) return <DoneView content={contactContent.done} />;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-x-4 gap-y-6 sm:grid-cols-2 [&_label]:text-[0.9375rem] [&_label]:font-semibold"
    >
      <FormField
        id="organization"
        label="병원명 또는 회사명"
        required
        error={errors.organization?.message}
      >
        <Input
          className={field}
          {...fieldA11y("organization", errors.organization?.message)}
          {...register("organization")}
        />
      </FormField>
      <FormField id="contactName" label="담당자 이름" required error={errors.contactName?.message}>
        <Input
          className={field}
          autoComplete="name"
          {...fieldA11y("contactName", errors.contactName?.message)}
          {...register("contactName")}
        />
      </FormField>
      <FormField
        id="phone"
        label="연락처"
        required
        hint="예) 010-1234-5678"
        error={errors.phone?.message}
      >
        <Input
          className={field}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          {...fieldA11y("phone", errors.phone?.message)}
          {...register("phone")}
        />
      </FormField>
      <FormField id="type" label="문의 유형" required error={errors.type?.message}>
        <Select
          className={field}
          options={contactTypeLabels}
          // 서버에서 그린 select에도 미리 고른 값이 보이도록 DOM 기본값을 함께 준다
          defaultValue={preselected}
          {...fieldA11y("type", errors.type?.message)}
          {...register("type")}
        />
      </FormField>
      <div className="sm:col-span-2">
        <FormField id="message" label="문의 내용" required error={errors.message?.message}>
          <Textarea
            className={area}
            placeholder="지금 상황과 필요한 것을 편하게 적어 주세요."
            {...fieldA11y("message", errors.message?.message)}
            {...register("message")}
          />
        </FormField>
      </div>
      <div className="border-t border-neutral-200 pt-6 sm:col-span-2 [&_input]:accent-black [&_label]:text-sm! [&_label]:font-normal! [&_label]:text-neutral-700">
        <ConsentField error={errors.agree?.message} {...register("agree")}>
          {consentText}
        </ConsentField>
      </div>
      {serverError ? (
        <p role="alert" className="text-sm text-red-600 sm:col-span-2">
          {serverError}
        </p>
      ) : null}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(darkButton, "disabled:pointer-events-none disabled:opacity-50")}
        >
          <ButtonLabel>{isSubmitting ? "보내는 중…" : "문의 보내기"}</ButtonLabel>
        </button>
      </div>
    </form>
  );
}
