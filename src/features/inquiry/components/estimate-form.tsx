"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
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
import { EstimateSelect } from "./estimate-select";

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

/** 단계 제목 */
function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-neutral-300 pt-6 first:border-t-0 first:pt-0">
      <h3 className="text-lg font-bold tracking-[-0.02em]">{title}</h3>
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
      <Step title="담당자 정보">
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

      <Step title="만들 것">
        <Controller
          control={control}
          name="area"
          render={({ field: f }) => (
            <EstimateSelect
              label="개발 분야"
              options={developmentAreaOptions}
              {...f}
              error={errors.area?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="readiness"
          render={({ field: f }) => (
            <EstimateSelect
              label="지금 준비된 것"
              options={readinessOptions}
              {...f}
              error={errors.readiness?.message}
            />
          )}
        />
        <div className="sm:col-span-2">
          <Controller
            control={control}
            name="platforms"
            render={({ field: f }) => (
              <EstimateSelect
                label="만들 화면"
                options={platformOptions}
                multiple
                placeholder="여러 개 고를 수 있어요"
                {...f}
                error={errors.platforms?.message}
              />
            )}
          />
        </div>
      </Step>

      <Step title="예산 · 일정">
        <Controller
          control={control}
          name="budget"
          render={({ field: f }) => (
            <EstimateSelect
              label="예산 범위"
              options={budgetOptions}
              {...f}
              error={errors.budget?.message}
            />
          )}
        />
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

      <Step title="요구사항">
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
