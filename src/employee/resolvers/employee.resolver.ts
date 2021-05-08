import { ValidationPipe } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { GroupedEmployeeInput } from '../inputs/groupedEmployee.input';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Resolver((of) => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

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
}
