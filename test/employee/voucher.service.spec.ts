import { Partner } from './../../src/voucher/models/partner.model';
import { Voucher } from './../../src/voucher/models/voucher.model';
import { VoucherService } from './../../src/voucher/services/voucher.service';
import { NotFoundException } from '@nestjs/common';
import { OrderService } from '../../src/order/service/order.service';

describe('Voucher Service', () => {
  let voucherService: VoucherService;
  beforeEach(() => {
    voucherService = new VoucherService(new OrderService());
  });

  it('should return correct voucher resource if the voucher is exists', async () => {
    const voucher: Voucher = await voucherService.findOneById(1);
    expect(voucher).toEqual(
      expect.objectContaining({
        voucherId: expect.any(Number),
        voucherAmount: expect.any(Number),
        partnerId: expect.any(Number),
        partnerName: expect.any(String),
      }),
    );
  });

  it('should throw NotFoundException if voucher is no exists', (done) => {
    voucherService
      .findOneById(-1)
      .then((response) => {
        done.fail("It must throw an exception, but doesn't!");
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        done();
      });
  });

  it('should return array of partners', async () => {
    const partners: Partner[] = await voucherService.partners();

    expect(partners).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          partnerId: expect.any(Number),
          partnerName: expect.any(String),
          revenue: expect.any(Number),
          vouchers: expect.arrayContaining([
            expect.objectContaining({
              voucherId: expect.any(Number),
            }),
          ]),
        }),
      ]),
    );
  });
});
