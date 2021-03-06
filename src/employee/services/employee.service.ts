import { GroupedEmployeeInput } from './../inputs/groupedEmployee.input';
import { vouchers } from './../../db/vouchers.mock';
import { orders } from './../../db/orders.mock';
import { Injectable, NotFoundException } from '@nestjs/common';
import { employees } from '../../db/employees.mock';
import { Employee } from '../models/employee.model';
import * as moment from 'moment';

@Injectable()
export class EmployeeService {
  async findOneById(id: number): Promise<Employee> {
    const employee = employees.find((e) => e.id === id);

    if (!employee) {
      throw new NotFoundException(`Not found employee by ${id} ID`);
    }

    return employee;
  }

  async groupedEmployeeBy(
    groupedEmployeeInput: GroupedEmployeeInput,
  ): Promise<Employee[][]> {
    const { minLeftBenefits, monthAgo } = groupedEmployeeInput;
    const spends = {};

    orders.forEach((o) => {
      if (
        moment(new Date())
          .clone()
          .startOf('month')
          .subtract(monthAgo, 'months')
          .isAfter(moment(o.orderDate)) ||
        moment(new Date())
          .clone()
          .endOf('month')
          .subtract(monthAgo, 'months')
          .isBefore(moment(o.orderDate))
      )
        return;

      const { voucherAmount } = vouchers.find(
        (v) => v.voucherId === o.voucherId,
      );
      if (!voucherAmount) return;

      spends[o.employeeId] = (spends[o.employeeId] || 0) + voucherAmount;
    });

    const companiesMap = {};

    employees.forEach((e) => {
      if ((e.id, e.monthlyBudget - spends[e.id] >= minLeftBenefits)) {
        if (!companiesMap[e.companyId]) companiesMap[e.companyId] = [];

        companiesMap[e.companyId].push(e);
      }
    });

    const list: Employee[][] = Object.keys(companiesMap).map(
      (key) => companiesMap[key],
    );

    return list;
  }

  async employeesOf(companyId: any): Promise<Employee[]> {
    return employees.filter((e) => e.companyId === companyId);
  }
}
