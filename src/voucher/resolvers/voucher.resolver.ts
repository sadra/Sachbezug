import { VoucherService } from './../services/voucher.service';
import { Voucher } from './../models/voucher.model';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver((of) => Voucher)
export class VoucherResolver {
  constructor(private voucherService: VoucherService) {}

  @Query((returns) => Voucher)
  async voucher(@Args('id', { type: () => Int }) id: number) {
    return this.voucherService.findOneById(id);
  }
}
