import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StaffGuard } from '../auth/guards/staff.guard';
import {
  ClientDto,
  DecisionDto,
  MeetingDto,
  MemberDto,
  NewProjectDto,
  NewRequestDto,
  PmDeliverableDto,
  PmMilestoneDto,
  PmPaymentDto,
  PmProjectDto,
  ReportDto,
  RequestUpdateDto,
  ShareDto,
  StaffDto,
  TaskDto,
} from './pm.dto';
import { PmService } from './pm.service';
import { AuthUser } from './pm.types';

const me = (req: Request) => req.user as AuthUser;
const Id = (name = 'id') => Param(name, ParseIntPipe);

/**
 * 프로젝트 관리 API (/api/pm/...).
 * 고객도 쓰는 것: 프로젝트 목록·보드(공개 항목), 산출물 승인, 요청 보내기·목록, 포털.
 * 나머지는 내부 계정(admin·staff)만.
 */
@Controller('pm')
@UseGuards(JwtAuthGuard)
export class PmController {
  constructor(private readonly pm: PmService) {}

  /* 고객·내부 공통 */

  @Get('portal')
  portal(@Req() req: Request) {
    return this.pm.portal(me(req));
  }

  /** 고객 포털 청구·결제 내역 */
  @Get('billing')
  billing(@Req() req: Request) {
    return this.pm.billing(me(req));
  }

  @Get('projects')
  projects(@Req() req: Request) {
    return this.pm.listProjects(me(req));
  }

  @Get('projects/:id')
  board(@Req() req: Request, @Id() id: number) {
    return this.pm.board(me(req), id);
  }

  @Post('deliverables/:id/decision')
  decide(@Req() req: Request, @Id() id: number, @Body() dto: DecisionDto) {
    return this.pm.decide(me(req), id, dto);
  }

  @Get('requests')
  requests(@Req() req: Request, @Query('projectId') projectId?: string) {
    return this.pm.listRequests(me(req), projectId ? Number(projectId) : undefined);
  }

  @Post('requests')
  createRequest(@Req() req: Request, @Body() dto: NewRequestDto) {
    return this.pm.createRequest(me(req), dto);
  }
}

/** 내부 계정 전용 */
@Controller('pm')
@UseGuards(JwtAuthGuard, StaffGuard)
export class PmAdminController {
  constructor(private readonly pm: PmService) {}

  /* 고객사·팀 */
  @Get('clients') clients() { return this.pm.listClients(); }
  @Post('clients') createClient(@Body() dto: ClientDto) { return this.pm.createClient(dto); }
  @Patch('clients/:id') renameClient(@Id() id: number, @Body() dto: ClientDto) { return this.pm.renameClient(id, dto); }
  @Delete('clients/:id') removeClient(@Id() id: number) { return this.pm.removeClient(id); }
  @Post('clients/:id/members') addMember(@Id() id: number, @Body() dto: MemberDto) { return this.pm.addMember(id, dto); }
  @Delete('clients/:id/members/:userId') removeMember(@Id() id: number, @Id('userId') userId: number) {
    return this.pm.removeMember(id, userId);
  }

  @Get('staff') staff() { return this.pm.listStaff(); }
  @Post('staff') addStaff(@Body() dto: StaffDto) { return this.pm.addStaff(dto.name); }
  @Patch('staff/:name') renameStaff(@Param('name') name: string, @Body() dto: StaffDto) { return this.pm.renameStaff(name, dto.name); }
  @Delete('staff/:name') removeStaff(@Param('name') name: string) { return this.pm.removeStaff(name); }

  /* 프로젝트 */
  @Post('projects') createProject(@Req() req: Request, @Body() dto: NewProjectDto) { return this.pm.createProject(dto, me(req).name); }
  @Patch('projects/:id') updateProject(@Req() req: Request, @Id() id: number, @Body() dto: PmProjectDto) {
    return this.pm.updateProject(id, dto, me(req).name);
  }
  @Delete('projects/:id') deleteProject(@Id() id: number) { return this.pm.deleteProject(id); }

  /* 마일스톤 */
  @Post('projects/:id/milestones') addMilestone(@Req() req: Request, @Id() id: number, @Body() dto: PmMilestoneDto) {
    return this.pm.addMilestone(id, dto, me(req).name);
  }
  @Patch('milestones/:id') updateMilestone(@Req() req: Request, @Id() id: number, @Body() dto: PmMilestoneDto) {
    return this.pm.updateMilestone(id, dto, me(req).name);
  }
  @Delete('milestones/:id') removeMilestone(@Req() req: Request, @Id() id: number) { return this.pm.removeMilestone(id, me(req).name); }

  /* 작업 */
  @Post('projects/:id/tasks') addTask(@Req() req: Request, @Id() id: number, @Body() dto: TaskDto) { return this.pm.addTask(id, dto, me(req).name); }
  @Patch('tasks/:id') updateTask(@Req() req: Request, @Id() id: number, @Body() dto: TaskDto) { return this.pm.updateTask(id, dto, me(req).name); }
  @Delete('tasks/:id') removeTask(@Req() req: Request, @Id() id: number) { return this.pm.removeTask(id, me(req).name); }

  /* 산출물 */
  @Post('projects/:id/deliverables') addDeliverable(
    @Req() req: Request, @Id() id: number, @Body() dto: PmDeliverableDto, @Query('request') request?: string,
  ) {
    return this.pm.addDeliverable(id, dto, me(req).name, request === '1');
  }
  @Patch('deliverables/:id') updateDeliverable(@Req() req: Request, @Id() id: number, @Body() dto: PmDeliverableDto) {
    return this.pm.updateDeliverable(id, dto, me(req).name);
  }
  @Post('deliverables/:id/request') requestApproval(@Req() req: Request, @Id() id: number) { return this.pm.requestApproval(id, me(req).name); }
  @Post('deliverables/:id/withdraw') withdraw(@Req() req: Request, @Id() id: number) { return this.pm.withdrawApproval(id, me(req).name); }
  @Delete('deliverables/:id') removeDeliverable(@Req() req: Request, @Id() id: number) { return this.pm.removeDeliverable(id, me(req).name); }

  /* 청구 */
  @Post('projects/:id/payments') addPayment(@Req() req: Request, @Id() id: number, @Body() dto: PmPaymentDto) { return this.pm.addPayment(id, dto, me(req).name); }
  @Post('payments/:id/paid') markPaid(@Req() req: Request, @Id() id: number) { return this.pm.markPaymentPaid(id, me(req).name); }
  @Delete('payments/:id') removePayment(@Req() req: Request, @Id() id: number) { return this.pm.removePayment(id, me(req).name); }

  /* 주간 보고·회의록 */
  @Post('projects/:id/reports') saveReport(@Req() req: Request, @Id() id: number, @Body() dto: ReportDto) { return this.pm.saveReport(id, dto, me(req).name); }
  @Patch('reports/:id/share') shareReport(@Req() req: Request, @Id() id: number, @Body() dto: ShareDto) { return this.pm.shareReport(id, dto.share, me(req).name); }
  @Delete('reports/:id') removeReport(@Req() req: Request, @Id() id: number) { return this.pm.removeReport(id, me(req).name); }

  @Post('projects/:id/meetings') addMeeting(@Req() req: Request, @Id() id: number, @Body() dto: MeetingDto) { return this.pm.addMeeting(id, dto, me(req).name); }
  @Patch('meetings/:id') updateMeeting(@Req() req: Request, @Id() id: number, @Body() dto: MeetingDto) { return this.pm.updateMeeting(id, dto, me(req).name); }
  @Patch('meetings/:id/share') shareMeeting(@Req() req: Request, @Id() id: number, @Body() dto: ShareDto) { return this.pm.shareMeeting(id, dto.share, me(req).name); }
  @Delete('meetings/:id') removeMeeting(@Req() req: Request, @Id() id: number) { return this.pm.removeMeeting(id, me(req).name); }

  /* 요청 처리 */
  @Patch('requests/:id') updateRequest(@Req() req: Request, @Id() id: number, @Body() dto: RequestUpdateDto) {
    return this.pm.updateRequest(id, dto, me(req).name);
  }
  @Delete('requests/:id') removeRequest(@Id() id: number) { return this.pm.removeRequest(id); }
}
