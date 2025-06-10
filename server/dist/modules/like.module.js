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
exports.LikeModule = void 0;
const common_1 = require("@nestjs/common");
const protected_decorator_1 = require("../decorators/protected.decorator");
const role_decorator_1 = require("../decorators/role.decorator");
const prisma_1 = require("../prisma");
let LikeService = class LikeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(client_id, course_id) {
        const findUser = await this.prisma.client.findUnique({ where: { id: client_id } });
        const findCourse = await this.prisma.course.findUnique({ where: { id: course_id } });
        if (!(findCourse || findUser)) {
            throw new common_1.NotFoundException("user yokida curs topilmadi");
        }
        try {
            const newLike = await this.prisma.like.create({ data: { client_id, course_id } });
            return newLike;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll() {
        try {
            const likes = await this.prisma.like.findMany({ include: { client: true, course: true } });
            return likes;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(course_id) {
        try {
            const like = await this.prisma.like.findFirst({ where: { course_id } });
            if (like) {
                await this.prisma.like.delete({ where: { id: like.id } });
                return "deleted";
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
LikeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], LikeService);
let likeController = class likeController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(id, id2) {
        return this.service.create(id, id2);
    }
    async findAll() {
        return await this.service.findAll();
    }
    async delete(id) {
        return await this.service.delete(id);
    }
};
__decorate([
    (0, common_1.Post)('create/:client_id/:course_id'),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["user"]),
    __param(0, (0, common_1.Param)('client_id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('course_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], likeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["user"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], likeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)('delete/:client_id'),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["user"]),
    __param(0, (0, common_1.Param)('client_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], likeController.prototype, "delete", null);
likeController = __decorate([
    (0, common_1.Controller)('like'),
    __metadata("design:paramtypes", [LikeService])
], likeController);
let LikeModule = class LikeModule {
};
exports.LikeModule = LikeModule;
exports.LikeModule = LikeModule = __decorate([
    (0, common_1.Module)({
        controllers: [likeController],
        providers: [LikeService, prisma_1.PrismaService]
    })
], LikeModule);
//# sourceMappingURL=like.module.js.map