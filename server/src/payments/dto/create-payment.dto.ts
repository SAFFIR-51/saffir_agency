import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  projectId: number;

  @IsString()
  @MaxLength(200)
  title: string;

  @IsInt()
  @Min(0)
  amount: number;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  date?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  paidAt?: string;
}
