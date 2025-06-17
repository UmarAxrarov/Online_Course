"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Protected = exports.PROTECTED_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PROTECTED_KEY = 'protected';
const Protected = (isProtected = false) => (0, common_1.SetMetadata)(exports.PROTECTED_KEY, isProtected);
exports.Protected = Protected;
//# sourceMappingURL=protected.decorator.js.map