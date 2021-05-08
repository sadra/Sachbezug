import { NotFoundException } from '@nestjs/common';
import { Employee } from '../../src/employee/models/employee.model';
import { EmployeeService } from '../../src/employee/services/employee.service';

describe('Employee Service', () => {
  let employeeSerivce: EmployeeService;
  beforeEach(() => {
    employeeSerivce = new EmployeeService();
  });

  it('should return correct employee resource if the user is exists', async () => {
    const user: Employee = await employeeSerivce.findOneById(1);
    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        monthlyBudget: expect.any(Number),
        companyId: expect.any(Number),
        companyName: expect.any(String),
      }),
    );
  });

  it('should throw NotFoundException if user is no exists', (done) => {
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
      10,
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
});
