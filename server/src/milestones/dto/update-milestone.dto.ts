import { IsIn, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateMilestoneDto {
  @IsString()
  @IsOptional()
  @MaxLength(200)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  date?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  ord?: number;

  @IsIn(['pending', 'in_progress', 'done'])
  @IsOptional()
  status?: string;
}
