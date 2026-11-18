import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString() @IsNotEmpty() productId!: string;

  /** 수량 — 서버가 상품의 maxQuantity 로 다시 검증한다 */
  @IsOptional() @IsInt() @Min(1) @Max(12) quantity?: number;

  @IsString() @IsNotEmpty() @MaxLength(100) customerName!: string;
  @IsEmail() @MaxLength(200) customerEmail!: string;
  @IsOptional() @IsString() @MaxLength(50) customerPhone?: string;
  @IsOptional() @IsString() @MaxLength(200) company?: string;
  @IsOptional() @IsString() @MaxLength(1000) memo?: string;
}
