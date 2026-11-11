# 예시 2. 폼 (react-hook-form + 스키마 + server action)

> 이 예시는 **zod 4.6.7**을 가정합니다. zod는 아직 설치되지 않았습니다(지침 13번 제안 대상). 승인 후 `npm i zod@4.6.7`로 설치하면 그대로 동작합니다. `tsc`, `eslint`, `prettier` 통과를 확인한 코드입니다.

## 파일 배치

```
src/features/inquiry/
├─ model/consult-schema.ts      스키마 + 입력 타입 (클라이언트·서버 공용)
├─ api/submit-consult.ts        "use server" — 같은 스키마로 재검증
└─ components/consult-form.tsx  "use client" — useForm + zodResolver
src/shared/lib/action-result.ts  server action 반환 형식
src/shared/lib/analytics.ts      track() 전환 이벤트
```

## 흐름

1. 클라이언트: `zodResolver(consultSchema)`로 즉시 검증 → 필드 아래 한국어 에러
2. 제출: server action `submitConsult(values)` 호출 (제출 중 버튼 비활성화)
3. 서버: 같은 스키마로 `safeParse` → 실패하면 `{ ok: false, error, fieldErrors }`
4. 클라이언트: `fieldErrors`를 `setError`로 필드에 다시 표시, 성공하면 `track("consult_submitted")` 후 완료 화면

## 스키마

```ts
// src/features/inquiry/model/consult-schema.ts
import { z } from "zod";

/** 상담 신청 스키마. 클라이언트(resolver)와 서버(action)가 같은 스키마로 검증한다. */
export const consultSchema = z.object({
  hospitalName: z.string().trim().min(1, "병원명을 입력해 주세요.").max(50),
  contactName: z.string().trim().min(1, "담당자 이름을 입력해 주세요.").max(30),
  phone: z
    .string()
    .trim()
    .regex(/^0\d{1,2}-?\d{3,4}-?\d{4}$/, "연락처 형식을 확인해 주세요. 예) 010-1234-5678"),
  homepageUrl: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || /^https?:\/\/[^\s/]+\.[^\s]+$/.test(v),
      "http:// 또는 https://로 시작하는 주소를 입력해 주세요.",
    ),
  message: z.string().trim().max(1000, "1,000자 이내로 입력해 주세요."),
  agree: z.boolean().refine((v) => v, "개인정보 수집·이용에 동의해 주세요."),
});

export type ConsultInput = z.input<typeof consultSchema>;
export type ConsultValues = z.output<typeof consultSchema>;
```

## server action

```ts
// src/features/inquiry/api/submit-consult.ts
"use server";

import { z } from "zod";
import type { ActionResult } from "@/shared/lib";
import { consultSchema } from "../model/consult-schema";

/** 상담 신청 접수. 클라이언트 검증과 별개로 서버에서 반드시 다시 검증한다. */
export async function submitConsult(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsed = consultSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "입력값을 다시 확인해 주세요.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  // TODO: server/에 저장 함수를 만들고 호출 (DB 저장 + 담당자 알림)
  return { ok: true, data: { id: crypto.randomUUID() } };
}
```

## 반환 형식 (shared/lib)

```ts
// src/shared/lib/action-result.ts
/** 모든 server action의 반환 형식. 화면은 ok 값만 보고 분기한다. */
export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[] | undefined> };
```

## 전환 이벤트 (shared/lib)

```ts
// src/shared/lib/analytics.ts
/**
 * 전환 이벤트 기록. 분석 도구(GA4 등)는 정해지면 이 함수 안만 바꾼다.
 * 이벤트 이름은 여기 목록에 있는 것만 쓴다 (지침 9번).
 */
export type EventName =
  | "geo_diagnosis_started"
  | "geo_diagnosis_completed"
  | "geo_result_cta_clicked"
  | "consult_submitted"
  | "estimate_submitted"
  | "pricing_viewed";

export function track(name: EventName, props?: Record<string, string | number | boolean>) {
  if (process.env.NODE_ENV !== "production") {
    console.info("[track]", name, props ?? {});
  }
}
```

## 폼 컴포넌트

```tsx
// src/features/inquiry/components/consult-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { track } from "@/shared/lib";
import { Button, FormField, Input, fieldA11y, inputClassName } from "@/shared/ui";
import { submitConsult } from "../api/submit-consult";
import { consultSchema, type ConsultInput } from "../model/consult-schema";

const defaultValues: ConsultInput = {
  hospitalName: "",
  contactName: "",
  phone: "",
  homepageUrl: "",
  message: "",
  agree: false,
};

export function ConsultForm({ source }: { source: "geo-result" | "hospital-website" | "contact" }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ConsultInput>({ resolver: zodResolver(consultSchema), defaultValues });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await submitConsult(values);
    if (!result.ok) {
      setServerError(result.error);
      for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
        // 서버 스키마와 폼 스키마가 같으므로 field는 ConsultInput의 키다
        if (messages?.[0]) setError(field as keyof ConsultInput, { message: messages[0] });
      }
      return;
    }
    track("consult_submitted", { source });
    setDone(true);
  });

  if (done) {
    return (
      <p role="status" className="rounded-xl bg-foreground/5 p-6">
        상담 신청이 접수됐습니다. 영업일 기준 1일 안에 연락드리겠습니다.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <FormField id="hospitalName" label="병원명" required error={errors.hospitalName?.message}>
        <Input
          {...fieldA11y("hospitalName", errors.hospitalName?.message)}
          {...register("hospitalName")}
        />
      </FormField>
      <FormField id="contactName" label="담당자 이름" required error={errors.contactName?.message}>
        <Input
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
          {...register("phone")}
        />
      </FormField>
      <FormField
        id="homepageUrl"
        label="현재 홈페이지 주소"
        hint="있으면 입력해 주세요."
        error={errors.homepageUrl?.message}
      >
        <Input
          type="url"
          inputMode="url"
          placeholder="https://"
          {...fieldA11y("homepageUrl", errors.homepageUrl?.message)}
          {...register("homepageUrl")}
        />
      </FormField>
      <FormField id="message" label="문의 내용" error={errors.message?.message}>
        <textarea
          rows={4}
          className={inputClassName}
          {...fieldA11y("message", errors.message?.message)}
          {...register("message")}
        />
      </FormField>
      <div className="space-y-1.5">
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-0.5"
            aria-invalid={errors.agree ? true : undefined}
            {...register("agree")}
          />
          <span>
            개인정보 수집·이용에 동의합니다. (병원명, 담당자 이름, 연락처 · 상담 목적 · 상담 종료 후
            1년 보관)
          </span>
        </label>
        {errors.agree ? (
          <p role="alert" className="text-sm text-red-600">
            {errors.agree.message}
          </p>
        ) : null}
      </div>
      {serverError ? (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "접수 중…" : "상담 신청하기"}
      </Button>
    </form>
  );
}
```

## 화면에서 쓰기

`features/inquiry/index.ts`에서 `ConsultForm`을 export하고, 다른 feature 화면이 아니라 **app의 page**나 inquiry feature 화면 안에서 렌더한다. GEO 결과 화면에서 상담 폼이 필요하면 폼을 geo로 복사하지 말고, page에서 두 feature 화면을 조합하거나 공통 부분을 shared로 올린다.
