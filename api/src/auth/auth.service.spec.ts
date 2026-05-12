import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn().mockResolvedValue('signed-token') },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('register', () => {
    it('creates user and returns data without passwordHash', async () => {
      const result = await service.register({
        name: 'Ada',
        email: 'ada@x.com',
        password: 'senha1234',
      });
      expect(result.id).toBeDefined();
      expect(result.name).toBe('Ada');
      expect(result.email).toBe('ada@x.com');
      expect((result as Record<string, unknown>).passwordHash).toBeUndefined();
    });

    it('hashes the password (stored hash differs from plain)', async () => {
      await service.register({
        name: 'Ada',
        email: 'ada@x.com',
        password: 'senha1234',
      });
      const stored = usersService.findByEmail('ada@x.com');
      expect(stored?.passwordHash).not.toBe('senha1234');
    });

    it('propagates ConflictException on duplicate email', async () => {
      await service.register({
        name: 'Ada',
        email: 'ada@x.com',
        password: 'senha1234',
      });
      await expect(
        service.register({
          name: 'Ada2',
          email: 'ada@x.com',
          password: 'senha1234',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await service.register({
        name: 'Ada',
        email: 'ada@x.com',
        password: 'senha1234',
      });
    });

    it('returns accessToken on valid credentials', async () => {
      const result = await service.login({
        email: 'ada@x.com',
        password: 'senha1234',
      });
      expect(result.accessToken).toBe('signed-token');
    });

    it('throws UnauthorizedException for unknown email', async () => {
      await expect(
        service.login({ email: 'nope@x.com', password: 'senha1234' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException for wrong password', async () => {
      await expect(
        service.login({ email: 'ada@x.com', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
