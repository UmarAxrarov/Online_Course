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
exports.EmailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
let EmailService = class EmailService {
    mailerService;
    prisma;
    constructor(mailerService, prisma) {
        this.mailerService = mailerService;
        this.prisma = prisma;
    }
    async sendEamil(email) {
        const findClient = await this.prisma.client.findFirst({ where: { email } });
        if (!findClient) {
            throw new common_1.NotFoundException(`${email} topilmadi`);
        }
        this.mailerService.sendMail({
            to: email,
            from: process.env.GMAIL_USER,
            subject: "Forgot password",
            text: "yuborilgan shifirni yozing",
            html: `<b>${findClient.token}</b>`
        });
        return "emailingizni tekshiring";
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService, prisma_1.PrismaService])
], EmailService);
//# sourceMappingURL=email.service.js.map