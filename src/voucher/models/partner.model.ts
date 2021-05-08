import { Order } from './../../order/models/order.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Voucher } from './voucher.model';

@ObjectType()
export class Partner {
  @Field((type) => Int)
  partnerId: number;

  @Field()
  partnerName: string;

  @Field((type) => [Voucher])
  vouchers: Voucher[];

  @Field((type) => Int)
  revenue: number;
}
