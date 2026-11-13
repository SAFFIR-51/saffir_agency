"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { applyFieldErrors, formatPhone, track } from "@/shared/lib";
import { Button, ConsentField, FormField, Input, Select, Textarea, fieldA11y } from "@/shared/ui";
import { submitEstimate } from "../api/submit-estimate";
import {
  budgetOptions,
  consentText,
  developmentAreaOptions,
  estimateContent,
} from "../model/content";
import { estimateSchema, type EstimateInput } from "../model/schema";
import { DoneView } from "./done-view";

const defaultValues: EstimateInput = {
  company: "",
  contactName: "",
  phone: "",
  area: "",
  budget: "",
  schedule: "",
  requirements: "",
  agree: false,
};

export function EstimateForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EstimateInput>({ resolver: zodResolver(estimateSchema), defaultValues });

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
    <form onSubmit={onSubmit} noValidate className="max-w-xl space-y-4">
      <FormField id="company" label="회사명" required error={errors.company?.message}>
        <Input
          autoComplete="organization"
          {...fieldA11y("company", errors.company?.message)}
          {...register("company")}
        />
      </FormField>
      <FormField id="contactName" label="담당자 이름" required error={errors.contactName?.message}>
        <Input
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
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          {...fieldA11y("phone", errors.phone?.message)}
          maxLength={13}
          {...register("phone", {
            // 숫자를 치는 대로 하이픈을 붙인다 (010-1234-5678)
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              setValue("phone", formatPhone(event.target.value)),
          })}
        />
      </FormField>
      <FormField id="area" label="개발 분야" error={errors.area?.message}>
        <Select
          options={developmentAreaOptions}
          {...fieldA11y("area", errors.area?.message)}
          {...register("area")}
        />
      </FormField>
      <FormField id="budget" label="예산 범위" error={errors.budget?.message}>
        <Select
          options={budgetOptions}
          {...fieldA11y("budget", errors.budget?.message)}
          {...register("budget")}
        />
      </FormField>
      <FormField
        id="schedule"
        label="희망 일정"
        hint="예) 2027년 3월 오픈"
        error={errors.schedule?.message}
      >
        <Input {...fieldA11y("schedule", errors.schedule?.message)} {...register("schedule")} />
      </FormField>
      <FormField id="requirements" label="요구사항" required error={errors.requirements?.message}>
        <Textarea
          className="min-h-40"
          {...fieldA11y("requirements", errors.requirements?.message)}
          {...register("requirements")}
        />
      </FormField>
      <ConsentField error={errors.agree?.message} {...register("agree")}>
        {consentText}
      </ConsentField>
      {serverError ? (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      ) : null}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "보내는 중…" : "견적 요청 보내기"}
      </Button>
    </form>
  );
}
