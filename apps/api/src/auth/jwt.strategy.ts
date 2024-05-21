import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthRepository } from './auth.repository';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
type user = {
  login: string;
  password: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authRepository: AuthRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  // async validate(payload: JwtPayload): Promise<user> {
  //   const { login } = payload;
  //   const user: user = await this.authRepository.findUser(login);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }

  //   return user;
  // }
}
