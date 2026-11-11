import "server-only";
import type { MemberKind } from "@/shared/config";

/**
 * 데모 계정 (실제 회원 DB 전까지). 회원 종류마다 포털 메뉴가 다르게 보인다.
 * 토스 심사용 테스트 계정은 "all"을 쓴다 (GEO 구독 결제, 샘플 프로젝트, 미결제 청구 포함).
 * 비밀번호는 데모 전용이다. 실제 회원 기능을 붙이면 이 파일을 지운다.
 */
export type DemoAccount = {
  id: string;
  email: string;
  name: string;
  organization: string;
  kinds: MemberKind[];
  label: string;
};

export const DEMO_PASSWORD = "saffir-demo-2026";

export const demoAccounts: DemoAccount[] = [
  {
    id: "member",
    email: "member@demo.saffir.co.kr",
    name: "데모 실장",
    organization: "데모 치과의원",
    kinds: ["member"],
    label: "일반 회원 (무료 진단만 써 본 병원)",
  },
  {
    id: "subscriber",
    email: "geo@demo.saffir.co.kr",
    name: "데모 원장",
    organization: "데모 피부과의원",
    kinds: ["member", "subscriber"],
    label: "GEO 구독 병원",
  },
  {
    id: "project",
    email: "project@demo.saffir.co.kr",
    name: "데모 팀장",
    organization: "데모 커머스",
    kinds: ["project"],
    label: "외주 고객 (웹앱 개발 진행 중)",
  },
  {
    id: "solution",
    email: "solution@demo.saffir.co.kr",
    name: "데모 실장",
    organization: "데모 내과의원",
    kinds: ["solution"],
    label: "솔루션 고객 (병원 CRM 도입)",
  },
  {
    id: "all",
    email: "review@demo.saffir.co.kr",
    name: "데모 담당자",
    organization: "데모 종합병원",
    kinds: ["member", "subscriber", "project", "solution"],
    label: "모든 서비스 이용 고객 (심사용)",
  },
];

export function findDemoAccount(id: string) {
  return demoAccounts.find((account) => account.id === id) ?? null;
}
