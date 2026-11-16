import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PaymentLinkItemDto {
  @IsString() id!: string;
  @IsString() name!: string;
  @IsNumber() quantity!: number;
  @IsNumber() unitPrice!: number;
}

export class CreatePaymentLinkDto {
  @IsString() @IsNotEmpty() clientCompany!: string;
  @IsOptional() @IsString() clientContact?: string;
  @IsArray() @ValidateNested({ each: true }) @Type(() => PaymentLinkItemDto) items!: PaymentLinkItemDto[];
  @IsOptional() @IsString() notes?: string;
}
