import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from './user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email: email.toLowerCase() } });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const passwordHash = await argon2.hash(data.password, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });

    const user = this.usersRepo.create({
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      passwordHash,
      status: UserStatus.ACTIVE,
    });

    return this.usersRepo.save(user);
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.usersRepo.update(userId, { lastLoginAt: new Date() });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return argon2.verify(user.passwordHash, password);
  }

  async getProfile(userId: string) {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    const { passwordHash, ...safe } = user;
    return safe;
  }
}
