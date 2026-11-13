import { SalesPage } from "@/shared/sections";
import { TryBox } from "@/shared/ui";
import { adCheckDisclaimer, adCheckLimits } from "../model/content";
import { adCheckSales } from "../model/sales-content";

/** 의료광고 검사기: 첫 화면에서 바로 문구를 붙여 넣어 보게 한다. 법률 자문이 아니라는 고지는 상자 안에 */
export function AdCheckPage() {
  return (
    <SalesPage
      content={adCheckSales}
      slots={{
        hero: (
          <TryBox
            id="check"
            title="무료 검사"
            label="광고 문구"
            placeholder="검사할 문구를 붙여 넣으세요"
            kind="textarea"
            button="무료 검사하기"
            notes={[adCheckDisclaimer, "회원은 월 5회 무료입니다."]}
            pending="검사 기능은 준비 중입니다."
          />
        ),
        pricing: (
          <ul className="sp-limits">
            {adCheckLimits.map((l) => (
              <li key={l.plan}>
                <span>{l.plan}</span>
                <strong>{l.limit}</strong>
              </li>
            ))}
          </ul>
        ),
      }}
    />
  );
}
