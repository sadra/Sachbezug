import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

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
});
