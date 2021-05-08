import { OrderResolver } from './resolvers/order.resolver';
import { OrderService } from './service/order.service';
import { Module } from '@nestjs/common';
import { DateScalar } from './scalars/date.scalar';

@Module({
  providers: [OrderResolver, OrderService, DateScalar],
  exports: [OrderService],
})
export class OrderModule {}
