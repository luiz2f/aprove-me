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
exports.AssignorController = void 0;
const common_1 = require("@nestjs/common");
const assignor_service_1 = require("./assignor.service");
const create_assignor_dto_1 = require("./dto/create-assignor.dto");
const update_assignor_dto_1 = require("./dto/update-assignor.dto");
const passport_1 = require("@nestjs/passport");
let AssignorController = class AssignorController {
    constructor(assignorService) {
        this.assignorService = assignorService;
    }
    create(createAssignorDto) {
        return this.assignorService.create(createAssignorDto);
    }
    findAll() {
        return this.assignorService.findAll();
    }
    findById(id) {
        return this.assignorService.findById(id);
    }
    update(id, updateAssignorDto) {
        return this.assignorService.update(id, updateAssignorDto);
    }
    remove(id) {
        return this.assignorService.remove(id);
    }
};
exports.AssignorController = AssignorController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assignor_dto_1.CreateAssignorDto]),
    __metadata("design:returntype", void 0)
], AssignorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AssignorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssignorController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_assignor_dto_1.UpdateAssignorDto]),
    __metadata("design:returntype", void 0)
], AssignorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssignorController.prototype, "remove", null);
exports.AssignorController = AssignorController = __decorate([
    (0, common_1.Controller)('integrations/assignor'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [assignor_service_1.AssignorService])
], AssignorController);
//# sourceMappingURL=assignor.controller.js.map