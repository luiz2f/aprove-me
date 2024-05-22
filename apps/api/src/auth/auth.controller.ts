import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
  @Post('/signin')
  create(@Body() authCredentialsDto: AuthCredentialsDto): Promise<object> {
    return this.authService.signIn(authCredentialsDto);
  }
  @Get('')
  get(): Promise<object> {
    return this.authService.get();
  }
}
