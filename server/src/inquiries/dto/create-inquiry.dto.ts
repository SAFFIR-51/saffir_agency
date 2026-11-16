import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateInquiryDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  company?: string;

  @IsOptional()
  @IsString()
  projectType?: string;

  @IsOptional()
  @IsString()
  budget?: string;

  @IsOptional()
  @IsString()
  targetDate?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  meetingPreference?: string;

  @IsOptional()
  @IsString()
  attachmentUrl?: string;
}
