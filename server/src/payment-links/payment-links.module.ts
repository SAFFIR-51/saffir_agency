import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentLinksController } from './payment-links.controller';
import { PaymentLinksService } from './payment-links.service';

@Module({
  imports: [ConfigModule],
  controllers: [PaymentLinksController],
  providers: [PaymentLinksService],
})
export class PaymentLinksModule {}
