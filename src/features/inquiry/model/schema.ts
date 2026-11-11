import { z } from "zod";
import { budgetOptions, contactTypeLabels, developmentAreaOptions } from "./content";

/** 클라이언트(resolver)와 서버(action)가 같은 스키마로 검증한다 (frontend-guide 8번) */
const phone = z
  .string()
  .trim()
  .regex(/^0\d{1,2}-?\d{3,4}-?\d{4}$/, "연락처 형식을 확인해 주세요. 예) 010-1234-5678");
const agree = z.boolean().refine((v) => v, "개인정보 수집·이용에 동의해 주세요.");
const oneOf = (options: readonly string[], message: string) =>
  z.string().refine((v) => options.includes(v), message);
const optionalOneOf = (options: readonly string[]) =>
  z.string().refine((v) => v === "" || options.includes(v), "목록에서 골라 주세요.");

export const contactSchema = z.object({
  organization: z.string().trim().min(1, "병원명 또는 회사명을 입력해 주세요.").max(50),
  contactName: z.string().trim().min(1, "담당자 이름을 입력해 주세요.").max(30),
  phone,
  type: oneOf(contactTypeLabels, "문의 유형을 골라 주세요."),
  message: z
    .string()
    .trim()
    .min(1, "문의 내용을 입력해 주세요.")
    .max(2000, "2,000자 이내로 입력해 주세요."),
  agree,
});

export const estimateSchema = z.object({
  company: z.string().trim().min(1, "회사명을 입력해 주세요.").max(50),
  contactName: z.string().trim().min(1, "담당자 이름을 입력해 주세요.").max(30),
  phone,
  area: optionalOneOf(developmentAreaOptions),
  budget: optionalOneOf(budgetOptions),
  schedule: z.string().trim().max(100, "100자 이내로 입력해 주세요."),
  requirements: z
    .string()
    .trim()
    .min(1, "요구사항을 입력해 주세요.")
    .max(3000, "3,000자 이내로 입력해 주세요."),
  agree,
});

export type ContactInput = z.input<typeof contactSchema>;
export type EstimateInput = z.input<typeof estimateSchema>;
