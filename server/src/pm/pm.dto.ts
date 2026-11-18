import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import {
  PM_STAGES,
  REQUEST_KINDS,
  REQUEST_PRIORITIES,
  REQUEST_STATUSES,
  TASK_STATUSES,
} from './pm.types';

const DATE = /^\d{4}-\d{2}-\d{2}$/;

export class ClientDto {
  @IsString() @MinLength(1) @MaxLength(200) name!: string;
}

export class MemberDto {
  @IsString() @MaxLength(200) email!: string;
  @IsOptional() @IsIn(['owner', 'member']) role?: 'owner' | 'member';
}

export class StaffDto {
  @IsString() @MinLength(1) @MaxLength(100) name!: string;
}

export class PmProjectDto {
  @IsOptional() @IsString() @MaxLength(200) name?: string;
  @IsOptional() @IsInt() clientOrgId?: number;
  @IsOptional() @IsIn(PM_STAGES) stage?: string;
  @IsOptional() @IsString() @MaxLength(100) pm?: string;
  @IsOptional() @Matches(DATE) startDate?: string;
  @IsOptional() @Matches(DATE) targetDate?: string;
  @IsOptional() @IsBoolean() archived?: boolean;
}

export class NewProjectDto {
  @IsString() @MinLength(1) @MaxLength(200) name!: string;
  @IsOptional() @IsInt() clientOrgId?: number;
  @IsOptional() @IsString() @MaxLength(200) clientName?: string;
  @IsOptional() @IsString() @MaxLength(100) pm?: string;
  @Matches(DATE) startDate!: string;
  @Matches(DATE) targetDate!: string;
  @IsOptional() @IsIn(PM_STAGES, { each: true }) stages?: string[];
}

export class PmMilestoneDto {
  @IsOptional() @IsString() @MaxLength(200) title?: string;
  @IsOptional() @IsIn(PM_STAGES) stage?: string;
  @IsOptional() @Matches(DATE) date?: string;
  @IsOptional() @IsBoolean() shared?: boolean;
  @IsOptional() @IsBoolean() done?: boolean;
}

export class TaskDto {
  @IsOptional() @IsString() @MaxLength(300) title?: string;
  @IsOptional() @IsIn(PM_STAGES) stage?: string;
  @IsOptional() @IsString() @MaxLength(100) assignee?: string;
  @IsOptional() @Matches(DATE) startDate?: string;
  @IsOptional() @Matches(DATE) dueDate?: string;
  @IsOptional() @IsIn(TASK_STATUSES) status?: string;
  @IsOptional() @IsBoolean() shared?: boolean;
}

export class PmDeliverableDto {
  @IsOptional() @IsString() @MaxLength(200) name?: string;
  @IsOptional() @IsIn(PM_STAGES) stage?: string;
  @IsOptional() @IsString() @MaxLength(30) version?: string;
  @IsOptional() @IsString() url?: string;
  @IsOptional() @IsString() note?: string;
  @IsOptional() @IsInt() milestoneId?: number | null;
}

export class DecisionDto {
  @IsBoolean() approve!: boolean;
  @IsOptional() @IsString() @MaxLength(1000) feedback?: string;
}

export class ReportDto {
  @Matches(DATE) weekOf!: string;
  @IsOptional() @IsString() done?: string;
  @IsOptional() @IsString() next?: string;
  @IsOptional() @IsString() issues?: string;
  @IsOptional() @IsString() asks?: string;
  @IsOptional() @IsBoolean() share?: boolean;
}

export class ShareDto {
  @IsBoolean() share!: boolean;
}

export class MeetingDto {
  @IsOptional() @Matches(DATE) date?: string;
  @IsOptional() @IsString() @MaxLength(200) title?: string;
  @IsOptional() @IsString() attendees?: string;
  @IsOptional() @IsString() decisions?: string;
  @IsOptional() @IsString() actions?: string;
}

export class NewRequestDto {
  @IsOptional() @IsInt() clientOrgId?: number;
  @IsOptional() @IsInt() projectId?: number;
  @IsIn(REQUEST_KINDS) kind!: string;
  @IsString() @MinLength(1) @MaxLength(200) title!: string;
  @IsOptional() @IsString() @MaxLength(4000) body?: string;
  @IsOptional() @IsString() @MaxLength(100) requestedBy?: string;
  @IsOptional() @IsIn(REQUEST_PRIORITIES) priority?: string;
  @IsOptional() @IsString() @MaxLength(100) assignee?: string;
}

export class RequestUpdateDto {
  @IsOptional() @IsIn(REQUEST_STATUSES) status?: string;
  @IsOptional() @IsIn(REQUEST_PRIORITIES) priority?: string;
  @IsOptional() @IsString() @MaxLength(100) assignee?: string;
  @IsOptional() @IsString() memo?: string;
  @IsOptional() @IsString() reply?: string;
  @IsOptional() @IsString() @MaxLength(200) title?: string;
  @IsOptional() @IsString() body?: string;
  @IsOptional() @IsIn(REQUEST_KINDS) kind?: string;
}

/** 청구 (payments). 금액은 원, 부가세 포함 */
export class PmPaymentDto {
  @IsString() @MinLength(1) @MaxLength(200) title!: string;
  @IsInt() @Min(1) @Max(1_000_000_000) amount!: number;
  @IsOptional() @Matches(DATE) date?: string;
}
