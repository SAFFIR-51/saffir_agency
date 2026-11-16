import { IsIn, IsInt, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  @MaxLength(200)
  name?: string;

  @ValidateIf((o) => o.clientId !== null)
  @IsInt()
  @IsOptional()
  clientId?: number | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  startDate?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  targetDate?: string;

  @IsIn(['active', 'completed', 'paused'])
  @IsOptional()
  status?: string;
}
