import { OrderModule } from './../order/order.module';
import { Module } from '@nestjs/common';
import { EmployeeResolver } from './resolvers/employee.resolver';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [OrderModule],
  providers: [EmployeeResolver, EmployeeService],
})
export class EmployeeModule {}
