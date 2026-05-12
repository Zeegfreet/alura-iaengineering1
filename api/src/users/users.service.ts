import { ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users = new Map<string, User>();
  private readonly emailIndex = new Map<string, string>();

  create(data: { name: string; email: string; passwordHash: string }): User {
    if (this.emailIndex.has(data.email)) {
      throw new ConflictException('Email already in use');
    }
    const user: User = { id: randomUUID(), ...data };
    this.users.set(user.id, user);
    this.emailIndex.set(user.email, user.id);
    return user;
  }

  findByEmail(email: string): User | undefined {
    const id = this.emailIndex.get(email);
    return id ? this.users.get(id) : undefined;
  }

  findById(id: string): User | undefined {
    return this.users.get(id);
  }
}
