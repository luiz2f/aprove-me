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
exports.PayableService = void 0;
const common_1 = require("@nestjs/common");
const payable_repository_1 = require("./payable.repository");
let PayableService = class PayableService {
    constructor(payableRepository) {
        this.payableRepository = payableRepository;
    }
    async create(data) {
        try {
            const newPayable = await this.payableRepository.create(data);
            return newPayable;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(params) {
        return await this.payableRepository.findAll(params);
    }
    async findById(id) {
        try {
            const payable = await this.payableRepository.findById(id);
            return payable;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        console.log(id, 'service');
        try {
            const updatedPayable = await this.payableRepository.update(id, data);
            return updatedPayable;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        return await this.payableRepository.remove(id);
    }
};
exports.PayableService = PayableService;
exports.PayableService = PayableService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payable_repository_1.PayableRepository])
], PayableService);
//# sourceMappingURL=payable.service.js.map