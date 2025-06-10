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
exports.QuizzService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
const fs_helper_1 = require("../../helpers/fs.helper");
let QuizzService = class QuizzService {
    prisma;
    fs;
    constructor(prisma, fs) {
        this.prisma = prisma;
        this.fs = fs;
    }
    async create(payload) {
        const findCourse = await this.prisma.course.findFirst({
            where: { id: payload.param.course_id }
        });
        if (!findCourse) {
            throw new common_1.NotFoundException("curs topilmadi");
        }
        const data = payload.body;
        const uploadFiles = this.fs.uploadFiles({ images: data.files.images, audios: data.files.audios, videos: [] });
        try {
            const newQuizz = await this.prisma.quiz.create({
                data: {
                    title: data.title,
                    description: data.description,
                    course_id: payload.param.course_id,
                    imgs: uploadFiles.images,
                    audios: uploadFiles.audios
                }
            });
            return newQuizz;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll(payload) {
        const data = payload.query;
        try {
            const quizzes = await this.prisma.quiz.findMany({
                skip: (data.page - 1) * data.limit,
                take: data.limit,
                orderBy: {
                    [data.sortField]: data.sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc',
                },
                include: {
                    questions: true
                }
            });
            return quizzes;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findOne(payload) {
        try {
            const quizzes = await this.prisma.quiz.findFirst({
                where: { id: payload.param.id },
                include: {
                    questions: true
                }
            });
            return quizzes;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(payload) {
        try {
            const findQuizz = await this.prisma.quiz.findFirst({ where: { id: payload.param.id } });
            const data = {
                images: findQuizz?.imgs || [],
                audios: findQuizz?.audios || [],
                videos: []
            };
            this.fs.removeFiles(data);
            if (!findQuizz) {
                throw new common_1.NotFoundException("quizz topilmadi");
            }
            await this.prisma.quiz.delete({
                where: { id: payload.param.id },
            });
            return "deleted";
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(payload) {
        const data = payload.body;
        const findQuizz = await this.prisma.quiz.findFirst({ where: { id: payload.param.id } });
        const files = {
            images: findQuizz?.imgs || [],
            audios: findQuizz?.audios || [],
            videos: []
        };
        const uploadFiles = this.fs.uploadFiles({ images: data.files.images, audios: data.files.audios, videos: [] }, { images: files.images, audios: files.audios, videos: files.videos });
        if (!findQuizz) {
            throw new common_1.NotFoundException("quizz topilmadi");
        }
        try {
            const findQuizz = await this.prisma.quiz.findFirst({ where: { id: payload.param.id } });
            this.fs.removeFiles({
                audios: findQuizz?.audios ? findQuizz?.audios : [],
                images: findQuizz?.imgs ? findQuizz?.imgs : [],
                videos: []
            });
            const newQuizz = await this.prisma.quiz.update({
                where: { id: payload.param.id },
                data: {
                    title: data.title,
                    description: data.description,
                    imgs: uploadFiles.images,
                    audios: uploadFiles.audios
                }
            });
            return newQuizz;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.QuizzService = QuizzService;
exports.QuizzService = QuizzService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService, fs_helper_1.FsHelper])
], QuizzService);
//# sourceMappingURL=quizz.service.js.map