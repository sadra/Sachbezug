import { OrderService } from '../../src/order/service/order.service';
import { NotFoundException } from '@nestjs/common';
import { Order } from '../../src/order/models/order.model';

describe('Order Service', () => {
  let orderService: OrderService;
  beforeEach(() => {
    orderService = new OrderService();
  });

  it('should return correct model resource if the order is exists', async () => {
    const order: Order = await orderService.findOneById(1);
    expect(order).toEqual(
      expect.objectContaining({
        orderId: expect.any(Number),
        orderDate: expect.any(Date),
        employeeId: expect.any(Number),
        voucherId: expect.any(Number),
      }),
    );
  });

  it('should throw NotFoundException if order is no exists', (done) => {
    orderService
      .findOneById(-1)
      .then((response) => {
        done.fail("It must throw an exception, but doesn't!");
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        done();
      });
  });
});
