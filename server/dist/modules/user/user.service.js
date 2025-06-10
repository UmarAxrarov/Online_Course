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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
const fs_helper_1 = require("../../helpers/fs.helper");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    prisma;
    fs;
    constructor(prisma, fs) {
        this.prisma = prisma;
        this.fs = fs;
    }
    async create(payload) {
        try {
            const newUser = await this.prisma.client.update({
                where: { email: payload.body.email },
                data: {
                    role: payload.body.role
                }
            });
            return newUser;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll(payload) {
        const allowedField = ["id", "role"];
        const data = payload.query;
        if (!allowedField.includes(data.sortField)) {
            throw new common_1.BadRequestException("sortlas bolmaydi");
        }
        try {
            const users = await this.prisma.client.findMany({
                skip: (data.page - 1) * data.limit,
                take: data.limit,
                orderBy: {
                    [data.sortField]: data.sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc',
                },
            });
            return users;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findOne(payload) {
        const data = payload.param;
        try {
            const user = await this.prisma.client.findFirst({
                where: {
                    id: data.id
                },
                include: {
                    courses: {
                        include: {
                            quizzes: {
                                include: {
                                    questions: true
                                }
                            }
                        }
                    },
                    comments: true,
                    likes: true,
                    userPoints: true,
                }
            });
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(payload) {
        const data = payload.param;
        const user = await this.prisma.client.findFirst({ where: { id: data.id } });
        if (!user) {
            throw new common_1.NotFoundException("user topilmadi");
        }
        this.fs.removeImage(user.imageUrl);
        try {
            await this.prisma.client.delete({ where: { id: data.id } });
            return "deleted";
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(payload) {
        const user = await this.prisma.client.findFirst({ where: { id: payload.param.id } });
        if (!user) {
            throw new common_1.NotFoundException("user topilmadi");
        }
        const upload = this.fs.uploadsImage(payload.body.imageUrl, user.imageUrl);
        let hashedPassword = "";
        if (payload.body.password) {
            hashedPassword = bcrypt.hashSync(payload.body.password);
        }
        try {
            const updatedUser = this.prisma.client.update({
                where: { id: payload.param.id },
                data: {
                    name: payload.body.name ? payload.body.name : user.name,
                    password: hashedPassword ? hashedPassword : user.password,
                    imageUrl: upload,
                }
            });
            return updatedUser;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService, fs_helper_1.FsHelper])
], UserService);
//# sourceMappingURL=user.service.js.map