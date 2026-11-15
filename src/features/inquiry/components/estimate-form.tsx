"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch, type UseFormRegisterReturn } from "react-hook-form";
import { applyFieldErrors, cn, track } from "@/shared/lib";
import { ButtonLabel, darkButton } from "@/shared/sections";
import { ConsentField, FormField, Input, Textarea, fieldA11y } from "@/shared/ui";
import { submitEstimate } from "../api/submit-estimate";
import {
  budgetOptions,
  consentText,
  developmentAreaOptions,
  estimateContent,
  platformOptions,
  readinessOptions,
} from "../model/content";
import { estimateSchema, type EstimateInput } from "../model/schema";
import { DoneView } from "./done-view";

const defaultValues: EstimateInput = {
  company: "",
  contactName: "",
  phone: "",
  email: "",
  area: "",
  platforms: [],
  readiness: "",
  budget: "",
  schedule: "",
  reference: "",
  requirements: "",
  agree: false,
};

/** 문의 폼과 같은 입력칸 (높이 48·모서리 8) */
const field =
  "h-12 rounded-lg border-neutral-300 bg-white px-4 text-[0.9375rem] focus-visible:border-black";
const area =
  "min-h-52 rounded-lg border-neutral-300 bg-white px-4 py-3 text-[0.9375rem] leading-[1.7] focus-visible:border-black";

/** 고르는 칸: 누르면 검게 채워지는 버튼 모양 (라디오·체크박스) */
function Chips({
  legend,
  hint,
  options,
  type,
  registration,
  error,
}: {
  legend: string;
  hint?: string;
  options: readonly string[];
  type: "radio" | "checkbox";
  registration: UseFormRegisterReturn;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="text-[0.9375rem] font-semibold">
        {legend}
        {hint ? <span className="ml-2 text-sm font-normal text-neutral-500">{hint}</span> : null}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input type={type} value={option} className="peer sr-only" {...registration} />
            <span
              className={cn(
                "inline-flex h-10 items-center rounded-lg border border-neutral-300 px-4 text-sm text-neutral-700 select-none",
                "hover:border-black hover:text-black",
                "peer-checked:border-black peer-checked:bg-black peer-checked:font-semibold peer-checked:text-white",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black",
                "motion-safe:transition-colors",
              )}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/** 단계 제목: 01 담당자 정보 */
function Step({ no, title, children }: { no: number; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-neutral-300 pt-6 first:border-t-0 first:pt-0">
      <h3 className="flex items-baseline gap-3 text-lg font-bold tracking-[-0.02em]">
        <span className="font-display text-sm font-semibold text-neutral-400 tabular-nums">
          {String(no).padStart(2, "0")}
        </span>
        {title}
      </h3>
      <div className="mt-5 grid gap-x-4 gap-y-6 sm:grid-cols-2 [&_label]:text-[0.9375rem] [&_label]:font-semibold">
        {children}
      </div>
    </section>
  );
}

export function EstimateForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EstimateInput>({ resolver: zodResolver(estimateSchema), defaultValues });
  const requirementsLength = useWatch({ control, name: "requirements" }).length;

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await submitEstimate(values);
    if (!result.ok) {
      setServerError(result.error);
      applyFieldErrors(setError, result.fieldErrors);
      return;
    }
    track("estimate_submitted", { area: values.area || "미선택" });
    setDone(true);
  });

  if (done) return <DoneView content={estimateContent.done} />;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-10">
      <Step no={1} title="담당자 정보">
        <FormField id="company" label="회사명" required error={errors.company?.message}>
          <Input
            className={field}
            autoComplete="organization"
            {...fieldA11y("company", errors.company?.message)}
            {...register("company")}
          />
        </FormField>
        <FormField
          id="contactName"
          label="담당자 이름"
          required
          error={errors.contactName?.message}
        >
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
        <FormField
          id="email"
          label="이메일"
          hint="견적서를 받을 주소 (선택)"
          error={errors.email?.message}
        >
          <Input
            className={field}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="name@company.com"
            {...fieldA11y("email", errors.email?.message)}
            {...register("email")}
          />
        </FormField>
      </Step>

      <Step no={2} title="만들 것">
        <div className="flex flex-col gap-7 sm:col-span-2">
          <Chips
            legend="개발 분야"
            options={developmentAreaOptions}
            type="radio"
            registration={register("area")}
            error={errors.area?.message}
          />
          <Chips
            legend="만들 화면"
            hint="여러 개 고를 수 있습니다"
            options={platformOptions}
            type="checkbox"
            registration={register("platforms")}
            error={errors.platforms?.message}
          />
          <Chips
            legend="지금 준비된 것"
            options={readinessOptions}
            type="radio"
            registration={register("readiness")}
            error={errors.readiness?.message}
          />
        </div>
      </Step>

      <Step no={3} title="예산 · 일정">
        <div className="sm:col-span-2">
          <Chips
            legend="예산 범위"
            options={budgetOptions}
            type="radio"
            registration={register("budget")}
            error={errors.budget?.message}
          />
        </div>
        <FormField
          id="schedule"
          label="희망 오픈 시기"
          hint="예) 2027년 3월 오픈"
          error={errors.schedule?.message}
        >
          <Input
            className={field}
            {...fieldA11y("schedule", errors.schedule?.message)}
            {...register("schedule")}
          />
        </FormField>
      </Step>

      <Step no={4} title="요구사항">
        <div className="sm:col-span-2">
          <FormField
            id="requirements"
            label="필요한 기능과 상황"
            required
            error={errors.requirements?.message}
          >
            <Textarea
              className={area}
              placeholder={
                "예)\n- 누가 쓰나요? (고객, 직원, 관리자)\n- 꼭 필요한 기능 3가지\n- 지금 쓰는 서비스나 엑셀이 있다면 무엇인지"
              }
              {...fieldA11y("requirements", errors.requirements?.message)}
              {...register("requirements")}
            />
          </FormField>
          <p className="mt-1.5 text-right text-xs text-neutral-400 tabular-nums">
            {requirementsLength.toLocaleString()} / 3,000
          </p>
        </div>
        <div className="sm:col-span-2">
          <FormField
            id="reference"
            label="참고 자료 링크"
            hint="기획서, 디자인, 비슷한 서비스 주소 (선택)"
            error={errors.reference?.message}
          >
            <Input
              className={field}
              placeholder="https://"
              {...fieldA11y("reference", errors.reference?.message)}
              {...register("reference")}
            />
          </FormField>
        </div>
      </Step>

      <div className="border-t border-neutral-200 pt-6 [&_input]:accent-black [&_label]:text-sm! [&_label]:font-normal! [&_label]:text-neutral-700">
        <ConsentField error={errors.agree?.message} {...register("agree")}>
          {consentText}
        </ConsentField>
      </div>
      {serverError ? (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      ) : null}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(darkButton, "disabled:pointer-events-none disabled:opacity-50")}
        >
          <ButtonLabel>{isSubmitting ? "보내는 중…" : "견적 요청 보내기"}</ButtonLabel>
        </button>
      </div>
    </form>
  );
}
