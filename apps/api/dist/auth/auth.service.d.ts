import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthRepository } from './auth.repository';
export declare class AuthService {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<object>;
}
