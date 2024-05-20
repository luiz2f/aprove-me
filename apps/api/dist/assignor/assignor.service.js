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
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
const class_validator_1 = require("class-validator");
const database_service_1 = require("../database/database.service");
let AssignorService = class AssignorService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createAssignorDto) {
        const errors = [];
        const { document, email } = createAssignorDto;
        if (!cpf_cnpj_validator_1.cpf.isValid(document) && !cpf_cnpj_validator_1.cnpj.isValid(document)) {
            throw new common_1.BadRequestException(`${document} is not a valid document`);
        }
        const emailAlreadyExist = await this.databaseService.assignor.findUnique({
            where: { email },
        });
        const documentAlreadyExist = await this.databaseService.assignor.findUnique({
            where: { document },
        });
        if (emailAlreadyExist) {
            errors.push('Email is already in use');
        }
        if (documentAlreadyExist) {
            errors.push('Document is already in use');
        }
        if (Object.keys(errors).length > 0) {
            throw new common_1.BadRequestException(errors);
        }
        try {
            return await this.databaseService.assignor.create({
                data: createAssignorDto,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll() {
        return await this.databaseService.assignor.findMany();
    }
    async findById(id) {
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
    async update(id, updateAssignorDto) {
        await this.findById(id);
        const errors = [];
        const { document, email } = updateAssignorDto;
        if (document) {
            if (!cpf_cnpj_validator_1.cpf.isValid(document) && !cpf_cnpj_validator_1.cnpj.isValid(document)) {
                throw new common_1.BadRequestException(`${document} is not a valid document`);
            }
            const documentAlreadyExist = await this.databaseService.assignor.findUnique({
                where: { document },
            });
            if (documentAlreadyExist) {
                errors.push('Document is already in use');
            }
        }
        if (email) {
            const emailAlreadyExist = await this.databaseService.assignor.findUnique({
                where: { email },
            });
            if (emailAlreadyExist) {
                errors.push('Email is already in use');
            }
        }
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors.join(', '));
        }
        const forbiddenAttributes = ['id', 'createdAt', 'updatedAt'];
        const invalidAttributes = Object.keys(updateAssignorDto).filter((attr) => forbiddenAttributes.includes(attr));
        if (invalidAttributes.length > 0) {
            throw new common_1.BadRequestException(`You can't change these attributes: ${invalidAttributes.join(', ')}`);
        }
        try {
            return await this.databaseService.assignor.update({
                where: { id },
                data: updateAssignorDto,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async remove(id) {
        await this.findById(id);
        await this.databaseService.assignor.delete({
            where: { id },
        });
        return { message: `Assignor with ID ${id} has been deleted successfully` };
    }
};
exports.AssignorService = AssignorService;
exports.AssignorService = AssignorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AssignorService);
//# sourceMappingURL=assignor.service.js.map