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
const database_service_1 = require("../database/database.service");
const class_validator_1 = require("class-validator");
let PayableService = class PayableService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createPayableDto) {
        return this.databaseService.payable.create({ data: createPayableDto });
    }
    async findAll() {
        return this.databaseService.payable.findMany({});
    }
    async findOne(id) {
        const payable = await this.databaseService.payable.findUnique({
            where: { id },
        });
        if (!payable) {
            return `Playable with ID ${id} not found`;
        }
        return payable;
    }
    async update(id, updatePayableDto) {
        const existingPayable = await this.databaseService.payable.findUnique({
            where: { id },
        });
        if (!existingPayable) {
            throw new common_1.BadRequestException(`Payable with ID ${id} not found`);
        }
        const errors = await (0, class_validator_1.validate)(updatePayableDto);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors.toString());
        }
        const dataToUpdate = {};
        if (updatePayableDto.value !== undefined)
            dataToUpdate.value = updatePayableDto.value;
        if (updatePayableDto.emissionDate !== undefined)
            dataToUpdate.emissionDate = updatePayableDto.emissionDate;
        if (updatePayableDto.assignorId !== undefined)
            dataToUpdate.assignorId = updatePayableDto.assignorId;
        const forbiddenAttributes = ['id', 'createdAt', 'updatedAt'];
        const invalidAttributes = Object.keys(updatePayableDto).filter((attr) => forbiddenAttributes.includes(attr));
        if (invalidAttributes.length > 0) {
            throw new common_1.BadRequestException(`You can't change these attributes: ${invalidAttributes.join(', ')}`);
        }
        return this.databaseService.payable.update({
            where: { id },
            data: dataToUpdate,
        });
    }
    async remove(id) {
        const payableToDelete = await this.databaseService.payable.findUnique({
            where: { id },
        });
        if (!payableToDelete) {
            throw new common_1.BadRequestException(`Playable with ID ${id} not found`);
        }
        await this.databaseService.payable.delete({
            where: { id },
        });
        throw new common_1.BadRequestException(`Playable with ID ${id} deleted`);
    }
};
exports.PayableService = PayableService;
exports.PayableService = PayableService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PayableService);
//# sourceMappingURL=payable.service.js.map