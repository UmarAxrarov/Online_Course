import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { CreateDto, findAllDto } from "./dtos/crud.dto";
import { FsHelper } from "src/helpers/fs.helper";

@Injectable()
export class QuizzService {
    constructor(private prisma: PrismaService, private fs: FsHelper) { }
    async create(payload: { param: { course_id: number }, body: CreateDto }) {
        const findCourse = await this.prisma.course.findFirst({
            where: { id: payload.param.course_id }
        })
        if (!findCourse) {
            throw new NotFoundException("curs topilmadi")
        }
        const data = payload.body;
        const uploadFiles = this.fs.uploadFiles({ images: data.files.images, audios: data.files.audios, videos: [] })
        try {
            const newQuizz = await this.prisma.quiz.create({
                data: {
                    title: data.title,
                    description: data.description,
                    course_id: payload.param.course_id,
                    imgs: uploadFiles.images,
                    audios: uploadFiles.audios
                }
            })
            return newQuizz
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    async findAll(payload: { query: findAllDto }) {
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
            })
            return quizzes;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    async findOne(payload: { param: { id: number } }) {
        try {
            const quizzes = await this.prisma.quiz.findFirst({
                where: { id: payload.param.id },
                include: {
                    questions: true
                }
            })
            return quizzes;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    async delete(payload: { param: { id: number } }) {
        try {
            const findQuizz = await this.prisma.quiz.findFirst({ where: { id: payload.param.id } })
            const data = {
                images: findQuizz?.imgs || [],
                audios: findQuizz?.audios || [],
                videos: []
            };
            this.fs.removeFiles(data);
            if (!findQuizz) {
                throw new NotFoundException("quizz topilmadi")
            }
            await this.prisma.quiz.delete({
                where: { id: payload.param.id },
            })
            return "deleted";
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    async update(payload: { param: { id: number }, body: CreateDto }) {
        const data = payload.body;
        const findQuizz = await this.prisma.quiz.findFirst({ where: { id: payload.param.id } })
        const files = {
            images: findQuizz?.imgs || [],
            audios: findQuizz?.audios || [],
            videos: []
        }
        const uploadFiles = this.fs.uploadFiles(
            { images: data.files.images, audios: data.files.audios, videos: [] },
            {images:files.images,audios:files.audios,videos:files.videos}
        )
        if (!findQuizz) {
            throw new NotFoundException("quizz topilmadi")
        }
        try {
            const findQuizz = await this.prisma.quiz.findFirst({where:{id:payload.param.id}})
            this.fs.removeFiles({
                audios:findQuizz?.audios ? findQuizz?.audios : [],
                images:findQuizz?.imgs ? findQuizz?.imgs : [],
                videos:[]
            });
            const newQuizz = await this.prisma.quiz.update({
                where: { id: payload.param.id },
                data: {
                    title: data.title,
                    description: data.description,
                    imgs: uploadFiles.images,
                    audios: uploadFiles.audios
                }
            })
            return newQuizz;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
