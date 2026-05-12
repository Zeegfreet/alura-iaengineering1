import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('creates a user and returns it without mutating input', () => {
    const user = service.create({
      name: 'Ada',
      email: 'ada@x.com',
      passwordHash: 'hash',
    });
    expect(user.id).toBeDefined();
    expect(user.name).toBe('Ada');
    expect(user.email).toBe('ada@x.com');
  });

  it('throws ConflictException on duplicate email', () => {
    service.create({ name: 'Ada', email: 'ada@x.com', passwordHash: 'hash' });
    expect(() =>
      service.create({
        name: 'Ada2',
        email: 'ada@x.com',
        passwordHash: 'hash2',
      }),
    ).toThrow(ConflictException);
  });

  it('finds user by email', () => {
    const created = service.create({
      name: 'Ada',
      email: 'ada@x.com',
      passwordHash: 'hash',
    });
    const found = service.findByEmail('ada@x.com');
    expect(found?.id).toBe(created.id);
  });

  it('returns undefined for unknown email', () => {
    expect(service.findByEmail('nope@x.com')).toBeUndefined();
  });

  it('finds user by id', () => {
    const created = service.create({
      name: 'Ada',
      email: 'ada@x.com',
      passwordHash: 'hash',
    });
    const found = service.findById(created.id);
    expect(found?.email).toBe('ada@x.com');
  });

  it('returns undefined for unknown id', () => {
    expect(service.findById('nonexistent')).toBeUndefined();
  });
});
