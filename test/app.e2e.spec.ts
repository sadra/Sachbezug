import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2021/05/03'));
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/graphql (GET) employee', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{employee(id:1) { id }}' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.employee).toEqual({ id: 1 });
      });
  });

  it('/graphql (GET) voucher', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{voucher(id:1) { voucherId }}' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.voucher).toEqual({ voucherId: 1 });
      });
  });

  it('/graphql (GET) order', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{order(id:1) { orderId }}' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.order).toEqual({ orderId: 1 });
      });
  });

  it('/graphql (GET) groupedEmployees', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          groupedEmployees(groupedEmployeeInput: {
            minLeftBenefits: 0,
            monthAgo: 0
          }) {
            id,
            name,
            monthlyBudget,
          }
        }`,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.groupedEmployees).toEqual(
          expect.arrayContaining([
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                monthlyBudget: expect.any(Number),
              }),
            ]),
          ]),
        );
      });
  });

  it('should throw 400 exception if parameters for not passed correct at /graphql (GET) groupedEmployees', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          groupedEmployees(groupedEmployeeInput: {
            minLeftBenefits: 0,
            monthAgo: -1
          }) {
            id,
          }
        }`,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.errors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              message: 'Bad Request Exception',
              extensions: expect.objectContaining({
                exception: expect.objectContaining({
                  response: expect.objectContaining({
                    statusCode: 400,
                  }),
                }),
              }),
            }),
          ]),
        );
      });
  });

  it('/graphql (GET) employeesOf', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
      {
        employeesOf(companyId: 1){
          id,
          name,
          monthlyBudget,
          spends,
          tax,
          companyName
        }
      }
      `,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.employeesOf).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              monthlyBudget: expect.any(Number),
              spends: expect.any(Number),
              tax: expect.any(Number),
              companyName: expect.any(String),
            }),
          ]),
        );
      });
  });

  it('/graphql (GET) partners', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        {
          partners{
            partnerId,
            partnerName,
            revenue,
            vouchers {
              voucherId,
              orders {
                orderId,
                employeeId
              }
            }
          }
        }
      `,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.partners).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              partnerId: expect.any(Number),
              partnerName: expect.any(String),
              revenue: expect.any(Number),
              vouchers: expect.arrayContaining([
                expect.objectContaining({
                  voucherId: expect.any(Number),
                  orders: expect.arrayContaining([
                    expect.objectContaining({
                      orderId: expect.any(Number),
                      employeeId: expect.any(Number),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
        );
      });
  });
});
