"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const auth_credentials_dto_1 = require("./auth-credentials.dto");
class UpdateAuthDto extends (0, mapped_types_1.PartialType)(auth_credentials_dto_1.AuthCredentialsDto) {
}
exports.UpdateAuthDto = UpdateAuthDto;
//# sourceMappingURL=update-auth.dto.js.map