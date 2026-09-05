import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('As senhas não coincidem');
    }

    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    const tokens = await this.generateTokens(user.id, user.email);

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        ...tokens,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const valid = await this.usersService.validatePassword(user, dto.password);
    if (!valid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    await this.usersService.updateLastLogin(user.id);
    const tokens = await this.generateTokens(user.id, user.email);

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        ...tokens,
      },
    };
  }

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = randomBytes(40).toString('hex');

    return {
      accessToken,
      refreshToken,
      expiresIn: this.config.get('JWT_EXPIRES_IN', '15m'),
      tokenType: 'Bearer',
    };
  }

  async validateUser(userId: string) {
    return this.usersService.findById(userId);
  }
}
