import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    const { login, password } = authCredentialsDto;

    console.log(process.env.JWT_SECRET);
    if (login === 'aproveme' && password === 'aproveme') {
      const payload: JwtPayload = { login };
      const accesToken = await this.jwtService.sign(payload);
      return { accesToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  // async findUser(username: string): Promise<user> {
  //   const assignor = await this.databaseService.auth.findUnique({
  //     where: { username },
  //   });

  //   if (!assignor) {
  //     throw new BadRequestException(`User not found`);
  //   }

  //   return assignor;
  // }
}
