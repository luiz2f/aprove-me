"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePayableDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_payable_dto_1 = require("./create-payable.dto");
class UpdatePayableDTO extends (0, mapped_types_1.PartialType)(create_payable_dto_1.CreatePayableDto) {
}
exports.UpdatePayableDTO = UpdatePayableDTO;
//# sourceMappingURL=update-payable.dto.js.map