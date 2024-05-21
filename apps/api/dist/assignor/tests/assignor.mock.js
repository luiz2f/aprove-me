"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAssignor = void 0;
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
const crypto_1 = require("crypto");
function mockAssignor(override) {
    return {
        id: (0, crypto_1.randomUUID)(),
        document: cpf_cnpj_validator_1.cpf.generate(false),
        email: 'example@mail.com',
        name: 'Exam Ple',
        phone: '5521975214',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...override,
    };
}
exports.mockAssignor = mockAssignor;
//# sourceMappingURL=assignor.mock.js.map