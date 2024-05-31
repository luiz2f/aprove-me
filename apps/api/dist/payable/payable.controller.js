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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayableController = void 0;
const common_1 = require("@nestjs/common");
const payable_service_1 = require("./payable.service");
const create_payable_dto_1 = require("./dto/create-payable.dto");
const update_payable_dto_1 = require("./dto/update-payable.dto");
const passport_1 = require("@nestjs/passport");
let PayableController = class PayableController {
    constructor(payableService) {
        this.payableService = payableService;
    }
    create(createPayableDto) {
        const createdPayable = this.payableService.create(createPayableDto);
        return createdPayable;
    }
    findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const take = limit;
        return this.payableService.findAll({ skip, take });
    }
    findById(id) {
        return this.payableService.findById(id);
    }
    update(id, updatePayableDto) {
        return this.payableService.update(id, updatePayableDto);
    }
    remove(id) {
        return this.payableService.remove(id);
    }
};
exports.PayableController = PayableController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payable_dto_1.CreatePayableDto]),
    __metadata("design:returntype", void 0)
], PayableController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PayableController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayableController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payable_dto_1.UpdatePayableDTO]),
    __metadata("design:returntype", void 0)
], PayableController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayableController.prototype, "remove", null);
exports.PayableController = PayableController = __decorate([
    (0, common_1.Controller)('integrations/payable'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [payable_service_1.PayableService])
], PayableController);
//# sourceMappingURL=payable.controller.js.map