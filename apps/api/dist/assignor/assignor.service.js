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
            const newAssignor = await this.assignorRepository.create(data);
            return newAssignor;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll() {
        return await this.assignorRepository.findAll();
    }
    async findById(id) {
        try {
            const payable = await this.assignorRepository.findById(id);
            return payable;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(id, data) {
        try {
            const updatedAssignor = await this.assignorRepository.update(id, data);
            return updatedAssignor;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
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