"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAssignorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_assignor_dto_1 = require("./create-assignor.dto");
class UpdateAssignorDto extends (0, mapped_types_1.PartialType)(create_assignor_dto_1.CreateAssignorDto) {
}
exports.UpdateAssignorDto = UpdateAssignorDto;
//# sourceMappingURL=update-assignor.dto.js.map