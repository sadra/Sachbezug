import { Order } from './../models/order.model';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from '../service/order.service';

@Resolver((of) => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query((returns) => Order)
  async order(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.findOneById(id);
  }
}
