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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
let CommentService = class CommentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(payload) {
        const findU = await this.prisma.client.findFirst({
            where: { id: payload.param.ci }
        });
        const findC = await this.prisma.course.findFirst({
            where: { id: payload.param.cui }
        });
        if (!(findC || findU)) {
            throw new common_1.NotFoundException("curs yoki user topilmadi");
        }
        try {
            const newComment = await this.prisma.comment.create({
                data: {
                    client_id: payload.param.ci,
                    course_id: payload.param.cui,
                    content: payload.body.content
                }
            });
            return newComment;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        const findComment = await this.prisma.comment.findFirst({ where: { id } });
        if (!findComment) {
            throw new common_1.NotFoundException("commnet topilmadi");
        }
        try {
            await this.prisma.comment.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(id, content) {
        const findComment = await this.prisma.comment.findFirst({ where: { id } });
        if (!findComment) {
            throw new common_1.NotFoundException("commnet topilmadi");
        }
        try {
            const u = await this.prisma.comment.update({ where: { id }, data: { content: content } });
            return u;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map