import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  create(@Body() authCredentialsDto: AuthCredentialsDto): Promise<object> {
    return this.authService.signIn(authCredentialsDto);
  }
}
