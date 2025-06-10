import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { FsHelper } from "src/helpers/fs.helper";
import { PrismaService } from "src/prisma";
import { CreateDto } from "./dtos/crud.dto";
import { log } from "node:console";
@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService, private fs: FsHelper) { }
    async create(payload: {
        param: { teacher_id: number },
        body: CreateDto
    }) {
        const uploads = this.fs.uploadFiles({
            images: payload.body.files.images || [],
            videos: payload.body.files.videos || [],
            audios: []
        });
        const categorise: string[] = [];
        categorise.push(payload.body.categories_names)
        const findTeacher = await this.prisma.client.findFirst({
            where: { id: payload.param.teacher_id } 
        })
        if (!findTeacher) {
            throw new NotFoundException("ustoz topilmadi");
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
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
    async findAll(payload: { query: { page: number; limit: number; sortField: string; sortOrder: string; } }) {
        const { page = 1, limit = 10, sortField = "id", sortOrder = "asc" } = payload.query;
        const fields = ["like_count","id"]
        if (!fields.includes(payload.query.sortField)) {
            throw new BadRequestException(`${payload.query.sortField} sortla bolmaydi`);
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
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
    async findOne(payload: { param: { id: number } }) {
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
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
    async update(payload: {
        param: { id: number },
        body: {
            title?: string,
            content?: string,
            link_or_number?: string,
            // categories_names?: string[],
            files?: {
                images?: Express.Multer.File[],
                videos?: Express.Multer.File[]
            }
        }
    }) {
        const uploads = this.fs.uploadFiles({
            images: payload.body.files?.images || [],
            videos: payload.body.files?.videos || [],
            audios: [],
        });
        const data: any = {
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
            const findCurs = await this.prisma.course.findFirst({where:{id:payload.param.id}})            
            this.fs.removeFiles({images:findCurs?.imgs ? findCurs.imgs : [],videos:findCurs?.videos ? findCurs?.videos : [],audios:[]})
            const updatedCourse = await this.prisma.course.update({
                where: { id: payload.param.id },
                data,
            });
            return updatedCourse;
        } catch (error) {
            throw new BadRequestException(error.message);
        }

    }

    async remove(payload: { param: { id: number } }) {
        const findCourse = await this.prisma.course.findFirst({
            where:{id:payload.param.id}
        })
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
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    } 
}