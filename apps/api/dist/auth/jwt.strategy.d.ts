import { AuthRepository } from './auth.repository';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    private configService;
    constructor(authRepository: AuthRepository, configService: ConfigService);
}
export {};
