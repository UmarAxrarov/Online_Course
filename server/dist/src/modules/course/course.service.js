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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const fs_helper_1 = require("../../helpers/fs.helper");
const prisma_1 = require("../../prisma");
let CourseService = class CourseService {
    prisma;
    fs;
    constructor(prisma, fs) {
        this.prisma = prisma;
        this.fs = fs;
    }
    async create(payload) {
        const uploads = this.fs.uploadFiles({
            images: payload.body.files.images || [],
            videos: payload.body.files.videos || [],
            audios: []
        });
        const categorise = [];
        categorise.push(payload.body.categories_names);
        const findTeacher = await this.prisma.client.findFirst({
            where: { id: payload.param.teacher_id }
        });
        if (!findTeacher) {
            throw new common_1.NotFoundException("ustoz topilmadi");
        }
        try {
            const newCourse = await this.prisma.course.create({
                data: {
                    title: payload.body.title,
                    content: payload.body.content,
                    link_or_number: payload.body.link_or_number,
                    categoryies_names: categorise,
                    teacher_id: payload.param.teacher_id,
                    imgs: uploads.images,
                    videos: uploads.videos,
                }
            });
            return newCourse;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll(payload) {
        const { page = 1, limit = 10, sortField = "id", sortOrder = "asc" } = payload.query;
        const fields = ["like_count", "id"];
        if (!fields.includes(payload.query.sortField)) {
            throw new common_1.BadRequestException(`${payload.query.sortField} sortla bolmaydi`);
        }
        try {
            const courses = await this.prisma.course.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    [sortField]: sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc',
                },
                include: {
                    teacher: {
                        select: {
                            id: true,
                            name: true,
                            imageUrl: true,
                        }
                    },
                    quizzes: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            imgs: true,
                            audios: true,
                            questions: {
                                select: {
                                    content: true
                                }
                            }
                        }
                    },
                    comments: {
                        select: {
                            id: true,
                            content: true,
                            client: {
                                select: {
                                    imageUrl: true,
                                    name: true,
                                    id: true,
                                }
                            }
                        }
                    },
                },
            });
            return courses;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findOne(payload) {
        try {
            const course = await this.prisma.course.findFirst({
                where: { id: payload.param.id },
                include: {
                    teacher: {
                        select: {
                            id: true,
                            name: true,
                            imageUrl: true,
                        }
                    },
                    quizzes: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            imgs: true,
                            audios: true,
                            questions: {
                                select: {
                                    content: true
                                }
                            }
                        }
                    },
                    comments: {
                        select: {
                            id: true,
                            content: true,
                            client: {
                                select: {
                                    imageUrl: true,
                                    name: true,
                                    id: true,
                                }
                            }
                        }
                    },
                },
            });
            return course;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(payload) {
        const uploads = this.fs.uploadFiles({
            images: payload.body.files?.images || [],
            videos: payload.body.files?.videos || [],
            audios: [],
        });
        const data = {
            title: payload.body.title,
            content: payload.body.content,
            link_or_number: payload.body.link_or_number,
        };
        if (uploads.images.length > 0) {
            data.imgs = uploads.images;
        }
        if (uploads.videos.length > 0) {
            data.videos = uploads.videos;
        }
        try {
            const findCurs = await this.prisma.course.findFirst({ where: { id: payload.param.id } });
            this.fs.removeFiles({ images: findCurs?.imgs ? findCurs.imgs : [], videos: findCurs?.videos ? findCurs?.videos : [], audios: [] });
            const updatedCourse = await this.prisma.course.update({
                where: { id: payload.param.id },
                data,
            });
            return updatedCourse;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async remove(payload) {
        const findCourse = await this.prisma.course.findFirst({
            where: { id: payload.param.id }
        });
        console.log(findCourse);
        const data = {
            images: findCourse?.imgs || [],
            videos: findCourse?.videos || [],
            audios: [],
        };
        this.fs.removeFiles(data);
        try {
            await this.prisma.course.delete({
                where: { id: payload.param.id }
            });
            return "deleted";
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService, fs_helper_1.FsHelper])
], CourseService);
//# sourceMappingURL=course.service.js.map