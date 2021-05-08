import { vouchers } from './../../db/vouchers.mock';
import { Voucher } from './../models/voucher.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class VoucherService {
  async findOneById(id: number): Promise<Voucher> {
    const employee = vouchers.find((e) => e.voucherId === id);

    if (!employee) {
      throw new NotFoundException(`Not found voucher by ${id} ID`);
    }

    return employee;
  }
}
