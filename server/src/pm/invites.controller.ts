import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { IsEmail, IsInt, IsOptional, MaxLength } from 'class-validator';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InvitesService } from './invites.service';
import { AuthUser } from './pm.types';

class InviteDto {
  @IsEmail() @MaxLength(200) email!: string;
  /** 내부 계정이 초대할 때만 */
  @IsOptional() @IsInt() clientOrgId?: number;
}

const me = (req: Request) => req.user as AuthUser;
const TOKEN = /^[a-f0-9]{64}$/;

/** 고객 포털 동료 초대 (/api/pm/invites) */
@Controller('pm/invites')
export class InvitesController {
  constructor(private readonly invites: InvitesService) {}

  /** 초대 링크 화면 (로그인 없이) */
  @Get('lookup/:token')
  @Throttle({ default: { ttl: 60_000, limit: 30 } })
  lookup(@Param('token') token: string) {
    return TOKEN.test(token) ? this.invites.lookup(token) : { status: 'invalid' as const };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  pending(@Req() req: Request, @Query('clientOrgId') clientOrgId?: string) {
    return this.invites.pending(me(req), clientOrgId ? Number(clientOrgId) : undefined);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { ttl: 600_000, limit: 20 } })
  invite(@Req() req: Request, @Body() dto: InviteDto) {
    return this.invites.invite(me(req), dto.email, dto.clientOrgId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  cancel(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.invites.cancel(me(req), id);
  }

  @Post('accept/:token')
  @UseGuards(JwtAuthGuard)
  accept(@Req() req: Request, @Param('token') token: string) {
    return this.invites.accept(me(req), token);
  }
}
