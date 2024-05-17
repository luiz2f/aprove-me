"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayableValidationError = void 0;
var PayableValidationError;
(function (PayableValidationError) {
    PayableValidationError["EMPTY"] = "value_required";
    PayableValidationError["VALUE_INVALID"] = "value_invalid";
    PayableValidationError["EMISSION_DATE_INVALID_FORMAT"] = "emission_date_invalid_format";
    PayableValidationError["ASSIGNOR_ID_REQUIRED"] = "assignor_id_required";
    PayableValidationError["INVALID_ASSIGNOR_ID"] = "invalid_assignor_id";
})(PayableValidationError || (exports.PayableValidationError = PayableValidationError = {}));
//# sourceMappingURL=validation-error.js.map