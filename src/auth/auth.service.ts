import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { newId, users } from '../store';
import type { User } from '../types';
import type { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  private readonly secret = process.env.JWT_SECRET ?? 'development-only-secret';

  register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    if (users.some((user) => user.email === email)) throw new ConflictException('Email is already registered');
    const user: User = { id: newId(), name: dto.name.trim(), email, password: dto.password, createdAt: new Date().toISOString() };
    users.push(user);
    return { user: this.publicUser(user), token: this.token(user.id) };
  }

  login(dto: LoginDto) {
    const user = users.find((candidate) => candidate.email === dto.email.toLowerCase() && candidate.password === dto.password);
    if (!user) throw new UnauthorizedException('Invalid email or password');
    return { user: this.publicUser(user), token: this.token(user.id) };
  }

  findByToken(token: string): User {
    try {
      const payload = jwt.verify(token, this.secret);
      if (typeof payload !== 'object' || typeof payload.sub !== 'string') throw new Error();
      const user = users.find((candidate) => candidate.id === payload.sub);
      if (!user) throw new Error();
      return user;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  publicUser(user: User) {
    const { password: _password, ...safeUser } = user;
    return safeUser;
  }

  private token(userId: string) {
    return jwt.sign({ sub: userId }, this.secret, { expiresIn: '7d' });
  }
}
