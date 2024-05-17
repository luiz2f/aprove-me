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
exports.CreatePayableDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePayableDto {
}
exports.CreatePayableDto = CreatePayableDto;
__decorate([
    (0, class_validator_1.IsNumber)({
        maxDecimalPlaces: 2,
    }, { message: 'Value must have at most two decimal places' }),
    (0, class_validator_1.Min)(0, { message: 'Value must be a positive number' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Value is required' }),
    __metadata("design:type", Number)
], CreatePayableDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Emission Date is required' }),
    __metadata("design:type", Date)
], CreatePayableDto.prototype, "emissionDate", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(4, { message: 'Assignor ID  must be a valid UUID' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Assignor ID is required' }),
    __metadata("design:type", String)
], CreatePayableDto.prototype, "assignorId", void 0);
//# sourceMappingURL=create-payable.dto.js.map