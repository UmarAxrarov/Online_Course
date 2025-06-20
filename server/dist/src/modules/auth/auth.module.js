"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_helper_1 = require("../../helpers/jwt.helper");
const jwt_1 = require("@nestjs/jwt");
const prisma_1 = require("../../prisma");
const google_strategy_1 = require("./strategy/google.strategy");
const email_service_1 = require("../email/email.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_helper_1.JwtHelper,
            jwt_1.JwtService,
            prisma_1.PrismaService,
            google_strategy_1.GoogleStrategy,
            email_service_1.EmailService
        ],
        exports: []
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map