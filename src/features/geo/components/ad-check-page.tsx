import { SolutionTemplate } from "@/shared/sections";
import { Note, Todo } from "@/shared/ui";
import { adCheckContent, adCheckDisclaimer } from "../model/content";

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
        demo: (
          <div id="check">
            <Todo>광고 문구 입력창 (검사 기능 연결 예정)</Todo>
          </div>
        ),
      }}
    />
  );
}
