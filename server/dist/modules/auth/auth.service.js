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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
const bcrypt = require("bcryptjs");
const crypto = require("node:crypto");
const jwt_helper_1 = require("../../helpers/jwt.helper");
let AuthService = class AuthService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async registerClient(dto) {
        const exists = await this.prisma.client.findUnique({ where: { email: dto.email } });
        if (exists)
            throw new common_1.ConflictException("User already exists ❌");
        const hashed = bcrypt.hashSync(dto.password, 10);
        const resetToken = crypto.randomBytes(32).toString("hex");
        return this.prisma.client.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashed,
                imageUrl: "default-user-icon.png",
                role: "user",
                token: resetToken,
            },
        });
    }
    async loginClient(dto) {
        const client = await this.prisma.client.findUnique({ where: { email: dto.email } });
        if (!client)
            throw new common_1.NotFoundException("User not found ❌");
        const ok = bcrypt.compareSync(dto.password, client.password);
        if (!ok)
            throw new common_1.ConflictException("Invalid password ❌");
        const tokens = this.jwt.signTokens({ id: client.id, role: client.role });
        return { client, tokens };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        jwt_helper_1.JwtHelper])
], AuthService);
//# sourceMappingURL=auth.service.js.map