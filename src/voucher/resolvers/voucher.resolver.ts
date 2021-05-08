import { Partner } from './../models/partner.model';
import { VoucherService } from './../services/voucher.service';
import { Voucher } from './../models/voucher.model';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OrderService } from '../../order/service/order.service';

@Resolver((of) => Voucher)
export class VoucherResolver {
  constructor(
    private voucherService: VoucherService,
    private orderService: OrderService,
  ) {}

  @Query((returns) => Voucher)
  async voucher(@Args('id', { type: () => Int }) id: number) {
    return this.voucherService.findOneById(id);
  }

  @Query((returns) => [Partner])
  async partners() {
    return this.voucherService.partners();
  }

  @ResolveField()
  async orders(@Parent() voucher: Voucher) {
    const { voucherId } = voucher;
    return this.orderService.ordersOfVoucher(voucherId);
  }
}
