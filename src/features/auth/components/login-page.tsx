import { loginNote, loginPurposes, loginStates, memberTypes } from "@/content/membership";
import { routes } from "@/shared/config";
import Link from "next/link";
import { Suspense } from "react";
import { DEMO_PASSWORD, demoAccounts, demoLoginEnabled } from "@/server/auth";
import { ButtonLink, DataTable, PageHeader, Section, StateTable, WireBox } from "@/shared/ui";
import { LoginForm } from "./login-form";

export function LoginPage() {
  return (
    <div className="w-full max-w-3xl">
      <PageHeader label="S1 · 제목" title="로그인" lead="진단 기록, 프로젝트, 청구를 확인하세요." />
      <Section label="S2 · 로그인">
        <div className="space-y-4">
          {/* ?next= 를 읽으므로 Suspense 안에서 그린다 */}
          <Suspense fallback={<WireBox label="로그인" />}>
            <LoginForm
              demo={
                demoLoginEnabled
                  ? {
                      accounts: demoAccounts.map((a) => ({ email: a.email, label: a.label })),
                      password: DEMO_PASSWORD,
                    }
                  : undefined
              }
            />
          </Suspense>
          <Link
            href={routes.auth.forgotPassword}
            className="block text-sm underline underline-offset-4"
          >
            비밀번호를 잊으셨나요?
          </Link>
        </div>
        <ButtonLink href={routes.auth.signup} variant="secondary">
          무료 회원가입
        </ButtonLink>
      </Section>
      <Section
        label="S3 · 볼 수 있는 것"
        title="로그인하면 볼 수 있는 것"
        description={`${loginPurposes.join(", ")}. ${loginNote}`}
      >
        <DataTable
          columns={["회원 유형", "대상", "볼 수 있는 것"]}
          rows={memberTypes.map((m) => [m.type, m.target, m.access])}
        />
      </Section>
      <Section label="S4 · 상태" title="로그인 안내">
        <StateTable states={loginStates} />
      </Section>
    </div>
  );
}
