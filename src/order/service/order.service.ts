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

  async totalSpends(employeeId: number): Promise<number> {
    return this.getTotalSpends(employeeId);
  }

  async totalTax(employeeId: number): Promise<number> {
    const spends = this.getTotalSpends(employeeId);
    let tax = 0;

    tax = this.calcSachbezug(tax, spends);

    return tax;
  }

  async ordersOfVoucher(voucherId: number): Promise<Order[]> {
    return orders.filter((o) => o.voucherId === voucherId);
  }

  async revenueOfVoucher(voucherId: number): Promise<number> {
    return orders
      .filter((o) => o.voucherId === voucherId)
      .reduce(
        (acc, { voucherId }) =>
          acc + vouchers.find((v) => v.voucherId === voucherId).voucherAmount,
        0,
      );
  }

  private calcSachbezug(tax: number, spends: number) {
    if (spends > 44) {
      tax = (spends - 44) * 0.3;
      tax = Math.round((tax + Number.EPSILON) * 1000) / 1000;
    }
    return tax;
  }

  private getTotalSpends(employeeId: number) {
    return orders
      .filter(
        (o) =>
          o.employeeId === employeeId &&
          moment(o.orderDate).isSameOrAfter(
            moment(new Date()).clone().startOf('month'),
          ),
      )
      .reduce(
        (acc, { voucherId }) =>
          acc + vouchers.find((v) => v.voucherId === voucherId).voucherAmount,
        0,
      );
  }
}
