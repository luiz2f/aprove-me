import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10m' },
      }),
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
