import { SolutionTemplate } from "@/shared/sections";
import { routes } from "@/shared/config";
import { ButtonLink, DataTable, Note, WireBox, WireInput } from "@/shared/ui";
import { adCheckContent, adCheckDisclaimer, adCheckLimits } from "../model/content";

export function AdCheckPage() {
  return (
    <SolutionTemplate
      content={adCheckContent}
      slots={{
        afterFeatures: (
          <Note title="고지">
            <p>{adCheckDisclaimer}</p>
          </Note>
        ),
        screens: (
          <div id="check" className="space-y-5">
            <WireInput
              label="광고 문구"
              kind="textarea"
              placeholder="검사할 문구를 붙여 넣으세요"
            />
            <WireBox label="검사 결과 · 위험 표현 표시" size="lg" />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={routes.auth.signupFrom(`${routes.hospital.adCheck}#check`)}>
                가입하고 검사 기록 저장
              </ButtonLink>
              <ButtonLink href={routes.contactFor("hospital-website")} variant="secondary">
                홈페이지 문구 점검·제작 상담
              </ButtonLink>
            </div>
          </div>
        ),
        pricing: (
          <DataTable
            columns={["등급", "검사 횟수"]}
            rows={adCheckLimits.map((l) => [l.plan, l.limit])}
          />
        ),
      }}
    />
  );
}
