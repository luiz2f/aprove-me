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
exports.AssignorService = void 0;
const common_1 = require("@nestjs/common");
const assignor_repository_1 = require("./assignor.repository");
let AssignorService = class AssignorService {
    constructor(assignorRepository) {
        this.assignorRepository = assignorRepository;
    }
    async create(data) {
        try {
            return await this.assignorRepository.create(data);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('An unexpected error occurred');
        }
    }
    async findAll(params) {
        return await this.assignorRepository.findAll(params);
    }
    async findAllIds() {
        return await this.assignorRepository.findAllIds();
    }
    async findById(id) {
        try {
            return await this.assignorRepository.findById(id);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('An unexpected error occurred');
        }
    }
    async update(id, data) {
        try {
            return await this.assignorRepository.update(id, data);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('An unexpected error occurred');
        }
    }
    async remove(id) {
        return await this.assignorRepository.remove(id);
    }
};
exports.AssignorService = AssignorService;
exports.AssignorService = AssignorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [assignor_repository_1.AssignorRepository])
], AssignorService);
//# sourceMappingURL=assignor.service.js.map