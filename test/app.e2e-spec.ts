import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    const prisma = app.get<PrismaService>(PrismaService);
    prisma.$disconnect();
    await app.close();
  });

  it('GET user/list)', () => {
    return request(app.getHttpServer()).get('/user/list').expect(200);
  });

  let userId = null;
  it('POST user/add)', () => {
    return request(app.getHttpServer())
      .post('/user/add')
      .send({
        name: 'gggg',
        tel: '123123',
      })
      .expect(201)
      .expect((res) => {
        expect(res.text).toBeDefined();
        userId = res.text;
      });
  });

  it('GET user/:id)', () => {
    return request(app.getHttpServer())
      .get(`/user/${userId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toEqual('gggg');
        expect(res.body.tel).toEqual('123123');
      });
  });

  it('POST user/add validation)', () => {
    return request(app.getHttpServer())
      .post('/user/add')
      .send({
        name: 'gggg',
        tel: '123asdaasdasd123',
      })
      .expect(400);
  });
});
