import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthRepository } from './auth.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '@prisma/client';
export declare class AuthService {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    get(): Promise<User[]>;
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<object>;
    validate(payload: JwtPayload): Promise<User>;
}
