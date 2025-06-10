import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { createDto } from "./crud.dto";

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) { }
    async create(payload: { param: { ci: number, cui: number }, body: createDto }) {
        const findU = await this.prisma.client.findFirst({
            where: { id: payload.param.ci }
        })
        const findC = await this.prisma.course.findFirst({
            where: { id: payload.param.cui }
        })
        if (!(findC || findU)) {
            throw new NotFoundException("curs yoki user topilmadi");
        }
        try {
            const newComment = await this.prisma.comment.create({
                data: {
                    client_id: payload.param.ci,
                    course_id: payload.param.cui,
                    content: payload.body.content
                }
            })
            return newComment;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    async delete(id: number) {
        const findComment = await this.prisma.comment.findFirst({ where: { id } });
        if (!findComment) {
            throw new NotFoundException("commnet topilmadi");
        }
        try {
            await this.prisma.comment.delete({ where: { id } });
        } catch (error) {
            throw new BadRequestException(error.message);
        }

    }
    async update(id: number, content: string) {
        const findComment = await this.prisma.comment.findFirst({ where: { id } });
        if (!findComment) {
            throw new NotFoundException("commnet topilmadi");
        }
        try {
            const u = await this.prisma.comment.update({ where: { id }, data:{content:content}});
            return u;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}