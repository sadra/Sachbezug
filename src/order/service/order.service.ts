import { vouchers } from './../../db/vouchers.mock';
import { orders } from '../../db/orders.mock';
import { Order } from '../models/order.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class OrderService {
  async findOneById(id: number): Promise<Order> {
    const order = orders.find((e) => e.orderId === id);

    if (!order) {
      throw new NotFoundException(`Not found order by ${id} ID`);
    }

    return order;
  }

  async totalSpends(input: { employeeId: number }): Promise<number> {
    const total = orders
      .filter(
        ({ employeeId, orderDate }) =>
          employeeId === input.employeeId &&
          moment(orderDate).isSameOrAfter(
            moment(new Date()).clone().startOf('month'),
          ),
      )
      .reduce(
        (acc, { voucherId }) =>
          acc + vouchers.find((v) => v.voucherId === voucherId).voucherAmount,
        0,
      );

    return total;
  }
}
