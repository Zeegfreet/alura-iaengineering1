import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn().mockResolvedValue('token') },
        },
        AuthGuard,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('POST /auth/register', () => {
    it('returns 201 with user data', async () => {
      const result = await controller.register({
        name: 'Ada',
        email: 'ada@x.com',
        password: 'senha1234',
      });
      expect(result.data.email).toBe('ada@x.com');
      expect(result.data.id).toBeDefined();
    });

    it('propagates ConflictException on duplicate email', async () => {
      await controller.register({
        name: 'Ada',
        email: 'ada@x.com',
        password: 'senha1234',
      });
      await expect(
        controller.register({
          name: 'Ada2',
          email: 'ada@x.com',
          password: 'senha1234',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await controller.register({
        name: 'Ada',
        email: 'ada@x.com',
        password: 'senha1234',
      });
    });

    it('returns accessToken on valid credentials', async () => {
      const result = await controller.login({
        email: 'ada@x.com',
        password: 'senha1234',
      });
      expect(result.data.accessToken).toBe('token');
    });

    it('throws UnauthorizedException on wrong credentials', async () => {
      await expect(
        controller.login({ email: 'ada@x.com', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('GET /auth/me', () => {
    it('returns user data for valid payload', async () => {
      const registered = await controller.register({
        name: 'Ada',
        email: 'ada@x.com',
        password: 'senha1234',
      });
      const result = controller.me({
        sub: registered.data.id,
        email: 'ada@x.com',
      });
      expect(result.data.name).toBe('Ada');
    });
  });
});
