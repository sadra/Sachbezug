import { Module } from '@nestjs/common';
import { EmployeeResolver } from './resolvers/employee.resolver';
import { EmployeeService } from './services/employee.service';

@Module({
  providers: [EmployeeResolver, EmployeeService],
})
export class EmployeeModule {}
