"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthRepository = class AuthRepository {
    constructor(databaseService, jwtService) {
        this.databaseService = databaseService;
        this.jwtService = jwtService;
    }
    async get() {
        return await this.databaseService.user.findMany();
    }
    async signUp(authCredentialsDto) {
        const { login, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = { login, password: hashedPassword };
        try {
            await this.databaseService.user.create({ data: user });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Username already exists');
            }
            else {
                throw new common_1.InternalServerErrorException(error.code);
            }
        }
    }
    async signIn(authCredentialsDto) {
        const { login, password } = authCredentialsDto;
        const user = await this.databaseService.user.findUnique({
            where: { login },
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { login };
            const accessToken = await this.jwtService.sign(payload);
            delete authCredentialsDto.password;
            return { accessToken };
        }
        else {
            delete authCredentialsDto.password;
            throw new common_1.UnauthorizedException('Please check your login credentials');
        }
    }
    async validate(payload) {
        const { login } = payload;
        const user = await this.databaseService.user.findUnique({
            where: { login },
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService])
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map