import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('jwt'))
  get(): object {
    return { message: 'Authorized' };
  }
}
