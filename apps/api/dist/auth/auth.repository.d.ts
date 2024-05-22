import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
export declare class AuthRepository {
    private readonly databaseService;
    private readonly jwtService;
    constructor(databaseService: DatabaseService, jwtService: JwtService);
    get(): Promise<User[]>;
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<object>;
    validate(payload: JwtPayload): Promise<User>;
}
