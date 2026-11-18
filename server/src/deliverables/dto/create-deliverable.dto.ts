import { IsIn, IsInt, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateDeliverableDto {
  @IsInt()
  projectId: number;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsIn(['PDF', 'LINK'])
  type: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  size?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  date?: string;
}
