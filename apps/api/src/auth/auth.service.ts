import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthRepository } from './auth.repository';
type user = {
  login: string;
  password: string;
};
@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    return await this.authRepository.signIn(authCredentialsDto);
  }
}
