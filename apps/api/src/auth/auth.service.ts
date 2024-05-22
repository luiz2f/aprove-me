import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthRepository } from './auth.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async get(): Promise<User[]> {
    return await this.authRepository.get();
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.authRepository.signUp(authCredentialsDto);
  }
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    return await this.authRepository.signIn(authCredentialsDto);
  }
  async validate(payload: JwtPayload): Promise<User> {
    return await this.authRepository.validate(payload);
  }
}
