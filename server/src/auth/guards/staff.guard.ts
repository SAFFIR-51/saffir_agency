import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

/** 사피어 내부 계정 (admin 또는 staff). 프로젝트 관리 어드민 API용 */
@Injectable()
export class StaffGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const role = ctx.switchToHttp().getRequest().user?.role;
    if (role !== 'admin' && role !== 'staff') {
      throw new ForbiddenException('Staff only');
    }
    return true;
  }
}
