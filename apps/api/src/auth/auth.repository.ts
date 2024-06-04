import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DatabaseService } from '../database/database.service';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}
  async get(): Promise<User[]> {
    return await this.databaseService.user.findMany();
  }
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { login, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = { login, password: hashedPassword };

    try {
      await this.databaseService.user.create({ data: user });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException(error.code);
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    const { login, password } = authCredentialsDto;
    const user = await this.databaseService.user.findUnique({
      where: { login },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { login };
      const accessToken = await this.jwtService.sign(payload);
      delete authCredentialsDto.password;
      return { accessToken };
    } else {
      delete authCredentialsDto.password;

      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { login } = payload;
    const user: User = await this.databaseService.user.findUnique({
      where: { login },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
  // async findMany(): Promise<User[]> {
  //   return await this.databaseService.user.findMany();
  // }
}
