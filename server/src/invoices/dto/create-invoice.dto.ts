import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InvoiceItemDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  unitPrice: number;
}

export class CreateInvoiceDto {
  @IsInt()
  paymentId: number;

  @IsString()
  @MaxLength(50)
  invoiceNumber: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  clientCompany?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  clientContact?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  bankInfo?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}
