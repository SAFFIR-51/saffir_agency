import Link from "next/link";
import { routes } from "@/shared/config";
import { PortalTitle, pBtnLight } from "@/shared/ui";

/** 가입하지 않은 서비스의 포털 메뉴로 주소를 직접 쳐서 들어왔을 때 */
export function PortalNoAccess({ title, audience }: { title: string; audience: string }) {
  return (
    <>
      <PortalTitle title={title} sub={`이 메뉴는 ${audience} 회원에게 보입니다.`} />
      <Link href={routes.portal.home} className={pBtnLight}>
        포털 홈으로
      </Link>
    </>
  );
}
