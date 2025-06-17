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
exports.ProtectedGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const protected_decorator_1 = require("../decorators/protected.decorator");
const roles_enum_1 = require("../enum/roles.enum");
const jwt_helper_1 = require("../helpers/jwt.helper");
let ProtectedGuard = class ProtectedGuard {
    reflector;
    jwt;
    constructor(reflector, jwt) {
        this.reflector = reflector;
        this.jwt = jwt;
    }
    async canActivate(context) {
        const isProtected = this.reflector.getAllAndOverride(protected_decorator_1.PROTECTED_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        if (!isProtected) {
            request.role = roles_enum_1.ClientRoles.USER;
            return true;
        }
        const accessHeader = request.headers.authorization;
        const refreshHeader = request.headers.authorization_refresh;
        if (!accessHeader || !accessHeader.startsWith("Bearer ")) {
            throw new common_1.ConflictException("Bearer access token berilmadi ❌");
        }
        if (!refreshHeader || !refreshHeader.startsWith("Bearer ")) {
            throw new common_1.ConflictException("Bearer refresh token berilmadi ❌");
        }
        const accessToken = accessHeader.split(" ")[1];
        const refreshToken = refreshHeader.split(" ")[1];
        const result = this.jwt.verifyTokens({ accessToken, refreshToken });
        console.log(result);
        if ("accessToken" in result && "refreshToken" in result) {
            request.id = result.id;
            request.role = result.role;
            response.setHeader("x-access-token", result.accessToken);
            response.setHeader("x-refresh-token", result.refreshToken);
            return true;
        }
        if ("id" in result && "role" in result) {
            request.id = result.id;
            request.role = result.role;
            return true;
        }
        throw new common_1.ConflictException("Tokenlarni tekshirishda xatolik");
    }
};
exports.ProtectedGuard = ProtectedGuard;
exports.ProtectedGuard = ProtectedGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, jwt_helper_1.JwtHelper])
], ProtectedGuard);
//# sourceMappingURL=protected.guard.js.map