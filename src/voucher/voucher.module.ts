import { OrderModule } from './../order/order.module';
import { VoucherService } from './services/voucher.service';
import { VoucherResolver } from './resolvers/voucher.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [OrderModule],
  providers: [VoucherResolver, VoucherService],
})
export class VoucherModule {}
