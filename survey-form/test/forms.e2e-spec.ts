import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { FormsController } from '../src/forms/forms.controller';
import { FormsService } from '../src/forms/forms.service';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../src/auth/constants';

describe('FormsController (e2e)', () => {
  let app: INestApplication;
  let formsService: FormsService;

  const mockFormsService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Test Form' }]),
    create: jest.fn().mockResolvedValue({ id: 1, name: 'New Form' }),
  };

  const mockUsersService = {
    findById: jest.fn().mockImplementation((id) => Promise.resolve({ id, username: 'testuser' })),
  };

  const mockAuthService = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ session: true }),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [FormsController],
      providers: [
        JwtStrategy,
        { provide: FormsService, useValue: mockFormsService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/forms (GET) - should return 401 without token', () => {
    return request(app.getHttpServer())
      .get('/forms')
      .expect(401);
  });

  it('/forms (GET) - should return 200 with valid token', async () => {
    const jwtService = app.get(JwtService);
    const token = jwtService.sign({ sub: 1, username: 'testuser' });

    return request(app.getHttpServer())
      .get('/forms')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0].name).toBe('Test Form');
      });
  });
});
