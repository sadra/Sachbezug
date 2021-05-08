import { Injectable, NotFoundException } from '@nestjs/common';
import { employees } from '../../db/employees.mock';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeeService {
  async findOneById(id: number): Promise<Employee> {
    const employee = employees.find((e) => e.id === id);

    if (!employee) {
      throw new NotFoundException(`Not found employee by ${id} ID`);
    }

    return employee;
  }
}
