import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsInt()
  @IsOptional()
  clientId?: number;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  startDate?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  targetDate?: string;
}
