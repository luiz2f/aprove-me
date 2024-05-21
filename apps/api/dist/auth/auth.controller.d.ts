import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(authCredentialsDto: AuthCredentialsDto): Promise<object>;
}
