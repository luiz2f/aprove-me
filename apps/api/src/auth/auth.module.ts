import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
