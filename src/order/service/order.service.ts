import { orders } from '../../db/orders.mock';
import { Order } from '../models/order.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class OrderService {
  async findOneById(id: number): Promise<Order> {
    const order = orders.find((e) => e.orderId === id);

    if (!order) {
      throw new NotFoundException(`Not found order by ${id} ID`);
    }

    return order;
  }
}
