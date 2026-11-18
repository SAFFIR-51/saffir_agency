import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

const DATE = /^\d{4}-\d{2}-\d{2}$/;
export const GEO_PLANS = ['free', 'pro'] as const;

export class GeoSiteDto {
  /** 고객 계정 이메일 (회원가입한 계정) */
  @IsEmail() @MaxLength(200) email!: string;
  @IsString() @MinLength(4) @MaxLength(300) siteUrl!: string;
  @IsOptional() @IsIn(GEO_PLANS) plan?: string;
}

export class GeoSiteUpdateDto {
  @IsOptional() @IsString() @MinLength(4) @MaxLength(300) siteUrl?: string;
  @IsOptional() @IsIn(GEO_PLANS) plan?: string;
}

class AreaDto {
  @IsString() @MaxLength(50) name!: string;
  @IsInt() @Min(0) @Max(100) score!: number;
}

class VisibilityDto {
  @IsString() @MaxLength(50) ai!: string;
  @IsInt() @Min(0) @Max(1000) appeared!: number;
  @IsInt() @Min(1) @Max(1000) asked!: number;
}

export class GeoDiagnosisDto {
  @Matches(DATE) date!: string;
  @IsInt() @Min(0) @Max(100) score!: number;
  @IsArray() @ArrayMaxSize(10) @ValidateNested({ each: true }) @Type(() => AreaDto) areas!: AreaDto[];
  @IsArray() @ArrayMaxSize(10) @IsString({ each: true }) @MaxLength(200, { each: true }) priorities!: string[];
  @IsOptional() @IsArray() @ArrayMaxSize(10) @ValidateNested({ each: true }) @Type(() => VisibilityDto)
  visibility?: VisibilityDto[];
}

export class GeoAdCheckDto {
  @Matches(DATE) date!: string;
  @IsString() @MinLength(1) @MaxLength(300) summary!: string;
  @IsInt() @Min(0) @Max(100) risks!: number;
}
