import { IsNumber, IsString } from 'class-validator';

export class TossConfirmDto {
  @IsString() paymentKey!: string;
  @IsString() orderId!: string;
  @IsNumber() amount!: number;
}
