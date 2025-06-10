import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { createDto } from "./crud.dto";

@Injectable()
export class QuestionService {
    constructor(private prisma: PrismaService) { }
    async create(payload: { param: { id: number }, body: createDto }) {
        const findQuizz = await this.prisma.quiz.findFirst({
            where: { id: payload.param.id }
        })        
        if (!findQuizz) {
            throw new NotFoundException("quizz topilmadi");
        }
        try {
            const newQuestion = await this.prisma.question.create({
                data: {
                    quiz_id: payload.param.id,
                    content: payload.body.content,
                    is_correct: payload.body.is_correct
                }
            })
            return newQuestion;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    async delete(id: number) {
        const findQuizz = await this.prisma.question.findFirst({
            where: { id }
        })
        if (!findQuizz) {
            throw new NotFoundException("quizz topilmadi");
        }
        try {
            await this.prisma.question.delete({
                where: { id }
            })
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}