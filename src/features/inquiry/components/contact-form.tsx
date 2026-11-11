"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { applyFieldErrors, track } from "@/shared/lib";
import { Button, ConsentField, FormField, Input, Select, Textarea, fieldA11y } from "@/shared/ui";
import { submitContact } from "../api/submit-contact";
import { consentText, contactContent, contactTypeLabels } from "../model/content";
import { contactSchema, type ContactInput } from "../model/schema";

const defaultValues: ContactInput = {
  organization: "",
  contactName: "",
  phone: "",
  type: "",
  message: "",
  agree: false,
};

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues });

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

  if (done) {
    return (
      <p role="status" className="rounded-md border border-foreground/20 p-5">
        {contactContent.done}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl space-y-4">
      <FormField
        id="organization"
        label="병원명 또는 회사명"
        required
        error={errors.organization?.message}
      >
        <Input
          {...fieldA11y("organization", errors.organization?.message)}
          {...register("organization")}
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
          {...register("phone")}
        />
      </FormField>
      <FormField id="type" label="문의 유형" required error={errors.type?.message}>
        <Select
          options={contactTypeLabels}
          {...fieldA11y("type", errors.type?.message)}
          {...register("type")}
        />
      </FormField>
      <FormField id="message" label="문의 내용" required error={errors.message?.message}>
        <Textarea {...fieldA11y("message", errors.message?.message)} {...register("message")} />
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
        {isSubmitting ? "보내는 중…" : "문의 보내기"}
      </Button>
    </form>
  );
}
