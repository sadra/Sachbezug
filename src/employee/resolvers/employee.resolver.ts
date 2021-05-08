import { ValidationPipe } from '@nestjs/common';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OrderService } from '../../order/service/order.service';
import { GroupedEmployeeInput } from '../inputs/groupedEmployee.input';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Resolver((of) => Employee)
export class EmployeeResolver {
  constructor(
    private employeeService: EmployeeService,
    private orderService: OrderService,
  ) {}

  @Query((returns) => Employee)
  async employee(@Args('id', { type: () => Int }) id: number) {
    return this.employeeService.findOneById(id);
  }

  @Query((returns) => [[Employee]])
  async groupedEmployees(
    @Args(
      'groupedEmployeeInput',
      { type: () => GroupedEmployeeInput },
      new ValidationPipe(),
    )
    groupedEmployeeInput: GroupedEmployeeInput,
  ) {
    return this.employeeService.groupedEmployeeBy(groupedEmployeeInput);
  }

  @ResolveField()
  async spends(@Parent() employee: Employee) {
    const { id } = employee;
    return this.orderService.totalSpends({ employeeId: id });
  }
}
