import { IsIn, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateMilestoneDto {
  @IsInt()
  projectId: number;

  @IsInt()
  @Min(0)
  ord: number;

  @IsString()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  date?: string;

  @IsIn(['pending', 'in_progress', 'done'])
  @IsOptional()
  status?: string;
}
