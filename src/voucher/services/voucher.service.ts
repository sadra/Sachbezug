import { vouchers } from './../../db/vouchers.mock';
import { Voucher } from './../models/voucher.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Partner } from '../models/partner.model';
import { OrderService } from '../../order/service/order.service';

@Injectable()
export class VoucherService {
  constructor(private orderService: OrderService) {}

  async findOneById(id: number): Promise<Voucher> {
    const voucher = vouchers.find((e) => e.voucherId === id);

    if (!voucher) {
      throw new NotFoundException(`Not found voucher by ${id} ID`);
    }

    return voucher;
  }

  async partners(): Promise<Partner[]> {
    const partners = {};

    for (let i = 0; i < vouchers.length; i++) {
      const v = vouchers[i];

      const revenue = await this.orderService.revenueOfVoucher(v.voucherId);

      if (!partners[v.partnerId])
        partners[v.partnerId] = {
          partnerId: v.partnerId,
          partnerName: v.partnerName,
          revenue: 0,
          vouchers: [],
        };

      partners[v.partnerId].vouchers.push(v);
      partners[v.partnerId].revenue += revenue;
    }

    const list: Partner[] = Object.keys(partners).map((key) => {
      return {
        partnerId: partners[key].partnerId,
        partnerName: partners[key].partnerName,
        revenue: partners[key].revenue,
        vouchers: partners[key].vouchers,
      };
    });

    return list;
  }
}
