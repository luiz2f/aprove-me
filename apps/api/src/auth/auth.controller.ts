import { Controller, Post, Body } from '@nestjs/common';
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
  // @Get('/users')
  // @UseGuards(AuthGuard('jwt'))
  // get(): object {
  //   return this.authService.findMany();
  //   return { message: 'Authorized' };
  // }
}
