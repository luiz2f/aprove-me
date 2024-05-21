import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthRepository {
    private readonly databaseService;
    private readonly jwtService;
    constructor(databaseService: DatabaseService, jwtService: JwtService);
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<object>;
}
