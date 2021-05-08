import { NotFoundException } from '@nestjs/common';
import { Employee } from '../../src/employee/models/employee.model';
import { EmployeeService } from '../../src/employee/services/employee.service';

describe('Employee Service', () => {
  let employeeSerivce: EmployeeService;
  beforeEach(() => {
    employeeSerivce = new EmployeeService();
  });

  it('should return correct employee resource if the employee is exists', async () => {
    const employee: Employee = await employeeSerivce.findOneById(1);

    expect(employee).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        monthlyBudget: expect.any(Number),
        companyId: expect.any(Number),
        companyName: expect.any(String),
      }),
    );
  });

  it('should throw NotFoundException if employee is no exists', (done) => {
    employeeSerivce
      .findOneById(-1)
      .then((response) => {
        done.fail("It must throw an exception, but doesn't!");
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        done();
      });
  });

  it('should return gouped by company of employees', async () => {
    const goupedByEmpoyees: Employee[][] = await employeeSerivce.groupedEmployeeBy(
      {
        minLeftBenefits: 10,
        pastMonth: 1,
      },
    );

    expect(goupedByEmpoyees).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            monthlyBudget: expect.any(Number),
            companyId: expect.any(Number),
            companyName: expect.any(String),
          }),
        ]),
      ]),
    );
  });

  it('should return list of employees of a company', async () => {
    const employees: Employee[] = await employeeSerivce.employeesOf(1);

    expect(employees).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          monthlyBudget: expect.any(Number),
          companyId: expect.any(Number),
          companyName: expect.any(String),
        }),
      ]),
    );
  });
});
