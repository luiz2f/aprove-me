"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignorModule = void 0;
const common_1 = require("@nestjs/common");
const assignor_service_1 = require("./assignor.service");
const assignor_controller_1 = require("./assignor.controller");
const database_module_1 = require("../database/database.module");
const assignor_repository_1 = require("./assignor.repository");
const database_service_1 = require("../database/database.service");
const auth_module_1 = require("../auth/auth.module");
const passport_1 = require("@nestjs/passport");
let AssignorModule = class AssignorModule {
};
exports.AssignorModule = AssignorModule;
exports.AssignorModule = AssignorModule = __decorate([
    (0, common_1.Module)({
        controllers: [assignor_controller_1.AssignorController],
        providers: [assignor_service_1.AssignorService, assignor_repository_1.AssignorRepository, database_service_1.DatabaseService],
        imports: [
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
    })
], AssignorModule);
//# sourceMappingURL=assignor.module.js.map