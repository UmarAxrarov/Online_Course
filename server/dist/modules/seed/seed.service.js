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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
const bcrypt = require("bcryptjs");
const crypto = require("node:crypto");
let SeedService = class SeedService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async #_seed() {
        const findClient = await this.prismaService.client.findFirst({
            where: {
                email: "axrarovumar6@gmail.com"
            }
        });
        if (!findClient) {
            const hashedPassword = bcrypt.hashSync("umar0694");
            const resetPasswordToken = crypto.randomBytes(32).toString("hex");
            await this.prismaService.client.create({
                data: {
                    name: "Umar",
                    email: "axrarovumar6@gmail.com",
                    password: hashedPassword,
                    role: "admin",
                    imageUrl: "default-user-icon.png",
                    token: resetPasswordToken,
                }
            });
            console.log("Default admin created ✅");
        }
    }
    async onModuleInit() {
        await this.#_seed();
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], SeedService);
//# sourceMappingURL=seed.service.js.map