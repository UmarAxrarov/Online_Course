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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_login_dto_1 = require("./dtos/register-login.dto");
const protected_decorator_1 = require("../../decorators/protected.decorator");
const role_decorator_1 = require("../../decorators/role.decorator");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../email/email.service");
let AuthController = class AuthController {
    authService;
    jwt;
    emailService;
    constructor(authService, jwt, emailService) {
        this.authService = authService;
        this.jwt = jwt;
        this.emailService = emailService;
    }
    async google() {
        console.log("Gooogle");
    }
    async googleAuthRedirect(req, res) {
        const user = JSON.stringify(req.user);
        console.log("Callback ishladi");
        res.redirect(`http://127.0.0.1:5500/client/public/html/register.html?token=${encodeURIComponent(user)}`);
    }
    async register(payload) {
        return await this.authService.registerClient(payload);
    }
    async login(payload) {
        console.log("Login kirmasin ");
        return await this.authService.loginClient(payload);
    }
    async email(payload) {
        await this.emailService.sendEamil(payload.email);
        return { success: true };
    }
    async forgot(payload) {
        await this.authService.forgotPassword(payload.token, payload.password);
        return { success: true };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)("/google"),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["admin", "user"]),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "google", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, common_1.Get)("/google/callback"),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["admin", "user"]),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["admin", "user"]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_login_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["admin", "user"]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("email"),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["admin", "user"]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "email", null);
__decorate([
    (0, common_1.Post)("forgotpassword"),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["admin", "user"]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgot", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, jwt_1.JwtService, email_service_1.EmailService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map