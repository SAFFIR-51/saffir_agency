import { IsEmail, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export const INQUIRY_KINDS = ['contact', 'estimate'] as const;
export const INQUIRY_STATUSES = ['new', 'replied', 'closed'] as const;

export class CreateInquiryDto {
  @IsString()
  @MaxLength(100)
  name: string;

  /** 문의하기는 이메일을 받지 않는다 */
  @IsOptional()
  @IsEmail()
  @MaxLength(200)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  company?: string;

  @IsOptional()
  @IsIn(INQUIRY_KINDS)
  kind?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  projectType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  budget?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  targetDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  platforms?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readiness?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  reference?: string;

  @IsOptional()
  @IsString()
  meetingPreference?: string;

  @IsOptional()
  @IsString()
  attachmentUrl?: string;
}

/** 어드민: 상태·담당·내부 메모 */
export class UpdateInquiryDto {
  @IsOptional()
  @IsIn(INQUIRY_STATUSES)
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  assignee?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  memo?: string;
}
