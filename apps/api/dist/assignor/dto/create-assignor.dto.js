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
exports.CreateAssignorDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAssignorDto {
}
exports.CreateAssignorDto = CreateAssignorDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Document must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Document is required' }),
    (0, class_validator_1.MaxLength)(30, { message: 'Document max lenght is 30' }),
    __metadata("design:type", String)
], CreateAssignorDto.prototype, "document", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(140, { message: 'Email max lenght is 140' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], CreateAssignorDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(20, { message: 'Phone max lenght is 20' }),
    (0, class_validator_1.IsString)({ message: 'Phone must be a string' }),
    __metadata("design:type", String)
], CreateAssignorDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(140, { message: 'Name max lenght is 140' }),
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    __metadata("design:type", String)
], CreateAssignorDto.prototype, "name", void 0);
//# sourceMappingURL=create-assignor.dto.js.map