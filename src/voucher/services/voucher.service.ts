import { vouchers } from './../../db/vouchers.mock';
import { Voucher } from './../models/voucher.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class VoucherService {
  async findOneById(id: number): Promise<Voucher> {
    const voucher = vouchers.find((e) => e.voucherId === id);

    if (!voucher) {
      throw new NotFoundException(`Not found voucher by ${id} ID`);
    }

    return voucher;
  }
}
