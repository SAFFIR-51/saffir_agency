"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { applyFieldErrors, formatPhone, track } from "@/shared/lib";
import { LandingSection, fieldA11y } from "@/shared/ui";
import { submitContact } from "../api/submit-contact";
import {
  consentText,
  contactContent,
  contactTypeLabels,
  quickInquiryContent as c,
} from "../model/content";
import { contactSchema, type ContactInput } from "../model/schema";
import "./quick-inquiry.css";

const defaultValues: ContactInput = {
  organization: "",
  contactName: "",
  phone: "",
  type: "",
  message: "",
  agree: false,
};

/** 질문 한 묶음: 영문 질문 + 한글 설명 + 입력칸 */
function Question({
  id,
  en,
  ko,
  plain,
  children,
}: {
  id: string;
  en: string;
  ko: string;
  /** true면 영문 없이 한글 질문만 */
  plain: boolean;
  children: ReactNode;
}) {
  return (
    <fieldset className="qi-q" aria-labelledby={`${id}-q`}>
      {plain ? (
        <legend id={`${id}-q`} className="qi-q-title">
          {ko}
        </legend>
      ) : (
        <>
          <legend id={`${id}-q`} className="qi-q-en" lang="en">
            {en}
          </legend>
          <p className="qi-q-ko">{ko}</p>
        </>
      )}
      <div className="qi-fields">{children}</div>
    </fieldset>
  );
}

/** 입력칸 아래 에러 (없으면 아무것도 그리지 않음) */
function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={`${id}-error`} role="alert" className="qi-error">
      {message}
    </p>
  ) : null;
}

/**
 * 메인 맨 아래에 바로 보이는 문의 폼. 문의 페이지와 같은 검증·전송을 쓴다.
 * 큰 화면에서는 왼쪽에 이름·연락처·유형, 오른쪽에 프로젝트 설명.
 */
export function QuickInquiry({
  preselect = "",
  source = "home",
  heading = { title: c.title, subtitle: c.subtitle, lead: c.lead },
  plain = false,
}: {
  /** 미리 고를 문의 유형 이름 (/contact?type=...) */
  preselect?: string;
  source?: "home" | "contact";
  /** title이 없으면 작은 섹션 머리(한글 부제가 제목)로 그린다 */
  heading?: { title?: string; subtitle: string; lead: string };
  /** 문의 페이지처럼 깔끔하게: 한글 질문만, 작은 입력칸·버튼 */
  plain?: boolean;
} = {}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { ...defaultValues, type: preselect },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await submitContact(values);
    if (!result.ok) {
      setServerError(result.error);
      applyFieldErrors(setError, result.fieldErrors);
      return;
    }
    track("consult_submitted", { source, type: values.type });
    setDone(true);
  });

  const q = c.questions;
  const p = c.placeholders;
  const doneText = contactContent.done;

  return (
    <LandingSection
      id="qi-title"
      title={heading.title ?? ""}
      size={heading.title ? "display" : "compact"}
      subtitle={heading.subtitle}
      ko={heading.lead}
    >
      {done ? (
        <div role="status" className="qi-done">
          <p className="qi-done-title">{doneText.title}</p>
          <p>{doneText.description}</p>
          <ol>
            {doneText.steps.map((s, i) => (
              <li key={s.step}>
                <span lang="en">{String(i + 1).padStart(2, "0")}</span>
                <strong>{s.step}</strong>
                <p>{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          noValidate
          className="qi-form"
          data-plain={plain ? "" : undefined}
        >
          {/* 큰 화면: 왼쪽 세 질문, 오른쪽 프로젝트 설명 (오른쪽 칸 전체) */}
          <div className="qi-grid">
            <div className="qi-col">
              <Question id="qi-who" en={q.who.en} ko={q.who.ko} plain={plain}>
                <div className="qi-two">
                  <div>
                    <input
                      className="qi-input"
                      placeholder={p.contactName}
                      aria-label="담당자 이름"
                      autoComplete="name"
                      {...fieldA11y("qi-contactName", errors.contactName?.message)}
                      {...register("contactName")}
                    />
                    <FieldError id="qi-contactName" message={errors.contactName?.message} />
                  </div>
                  <div>
                    <input
                      className="qi-input"
                      placeholder={p.organization}
                      aria-label="병원명 또는 회사명"
                      autoComplete="organization"
                      {...fieldA11y("qi-organization", errors.organization?.message)}
                      {...register("organization")}
                    />
                    <FieldError id="qi-organization" message={errors.organization?.message} />
                  </div>
                </div>
              </Question>

              <Question id="qi-phone" en={q.phone.en} ko={q.phone.ko} plain={plain}>
                <input
                  className="qi-input"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder={p.phone}
                  aria-label="연락처"
                  {...fieldA11y("qi-phone", errors.phone?.message)}
                  maxLength={13}
                  {...register("phone", {
                    // 숫자를 치는 대로 하이픈을 붙인다 (010-1234-5678)
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                      setValue("phone", formatPhone(event.target.value)),
                  })}
                />
                <FieldError id="qi-phone" message={errors.phone?.message} />
              </Question>

              <Question id="qi-type" en={q.type.en} ko={q.type.ko} plain={plain}>
                <select
                  className="qi-input qi-select"
                  aria-label="문의 유형"
                  // 서버에서 그린 select에도 미리 고른 값이 보이도록 DOM 기본값을 함께 준다
                  defaultValue={preselect}
                  {...fieldA11y("qi-type", errors.type?.message)}
                  {...register("type")}
                >
                  <option value="">{p.type}</option>
                  {contactTypeLabels.map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
                <FieldError id="qi-type" message={errors.type?.message} />
              </Question>
            </div>
            <Question id="qi-message" en={q.message.en} ko={q.message.ko} plain={plain}>
              <textarea
                className="qi-input qi-textarea"
                placeholder={p.message}
                aria-label="문의 내용"
                rows={8}
                {...fieldA11y("qi-message", errors.message?.message)}
                {...register("message")}
              />
              <FieldError id="qi-message" message={errors.message?.message} />
            </Question>
          </div>

          <div className="qi-submit">
            <label className="qi-consent">
              <input
                type="checkbox"
                aria-invalid={errors.agree ? true : undefined}
                aria-describedby={errors.agree ? "qi-agree-error" : undefined}
                {...register("agree")}
              />
              <span>{consentText}</span>
            </label>
            <FieldError id="qi-agree" message={errors.agree?.message} />
            {serverError ? (
              <p role="alert" className="qi-error">
                {serverError}
              </p>
            ) : null}
            <button
              type="submit"
              className="qi-send"
              disabled={isSubmitting}
              lang={plain ? undefined : "en"}
            >
              {plain
                ? isSubmitting
                  ? c.plainSending
                  : c.plainSubmit
                : isSubmitting
                  ? c.sending
                  : c.submit}
              <svg viewBox="0 0 15 26" aria-hidden="true">
                <path d="M2 2l11 11L2 24" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </LandingSection>
  );
}
