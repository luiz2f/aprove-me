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
exports.PayableRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const class_validator_1 = require("class-validator");
let PayableRepository = class PayableRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findByAssignorID(id) {
        if (!(0, class_validator_1.isUUID)(id, 4)) {
            throw new common_1.BadRequestException(`Invalid ID format: ${id}`);
        }
        const assignor = await this.databaseService.assignor.findUnique({
            where: { id },
        });
        if (!assignor) {
            throw new common_1.BadRequestException(`Assignor with ID ${id} not found`);
        }
        return assignor;
    }
    async create(data) {
        await this.findByAssignorID(data.assignorId);
        const { assignorId, ...payableData } = data;
        return await this.databaseService.payable.create({
            data: {
                ...payableData,
                assignor: { connect: { id: assignorId } },
            },
        });
    }
    async findAll(params) {
        const data = await this.databaseService.payable.findMany(params);
        const length = await this.databaseService.payable.count();
        return { data, length };
    }
    async findById(id) {
        if (!(0, class_validator_1.isUUID)(id, 4)) {
            throw new common_1.BadRequestException(`Invalid ID format: ${id}`);
        }
        const payable = await this.databaseService.payable.findUnique({
            where: { id },
        });
        if (!payable) {
            throw new common_1.BadRequestException(`Payable with ID ${id} not found`);
        }
        return payable;
    }
    async update(id, data) {
        console.log(id, 'repo');
        if (data.assignorId) {
            await this.findByAssignorID(data.assignorId);
        }
        await this.findById(id);
        const { value, emissionDate, assignorId } = data;
        const updateData = { value, emissionDate, assignorId };
        return await this.databaseService.payable.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id) {
        await this.findById(id);
        await this.databaseService.payable.delete({
            where: { id },
        });
        return { message: `Payable with ID ${id} has been deleted successfully` };
    }
};
exports.PayableRepository = PayableRepository;
exports.PayableRepository = PayableRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PayableRepository);
//# sourceMappingURL=payable.repository.js.map