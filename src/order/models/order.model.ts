import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field((type) => Int)
  orderId: number;

  @Field()
  orderDate: Date;

  @Field((type) => Int)
  employeeId: number;

  @Field((type) => Int)
  voucherId: number;
}
