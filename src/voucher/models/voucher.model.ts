import { Order } from './../../order/models/order.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Voucher {
  @Field((type) => Int)
  voucherId: number;

  @Field((type) => Int)
  voucherAmount: number;

  @Field((type) => Int)
  partnerId: number;

  @Field()
  partnerName: string;

  @Field((type) => [Order], { nullable: true })
  orders?: Order[];
}
