import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service';
type user = {
    login: string;
    password: string;
};
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(payload: JwtPayload): Promise<user>;
}
export {};
