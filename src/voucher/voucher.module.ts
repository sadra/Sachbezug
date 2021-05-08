import { VoucherService } from './services/voucher.service';
import { VoucherResolver } from './resolvers/voucher.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [VoucherResolver, VoucherService],
})
export class VoucherModule {}
