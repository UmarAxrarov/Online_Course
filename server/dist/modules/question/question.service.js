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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
let QuestionService = class QuestionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(payload) {
        const findQuizz = await this.prisma.quiz.findFirst({
            where: { id: payload.param.id }
        });
        if (!findQuizz) {
            throw new common_1.NotFoundException("quizz topilmadi");
        }
        try {
            const newQuestion = await this.prisma.question.create({
                data: {
                    quiz_id: payload.param.id,
                    content: payload.body.content,
                    is_correct: payload.body.is_correct
                }
            });
            return newQuestion;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async delete(id) {
        const findQuizz = await this.prisma.question.findFirst({
            where: { id }
        });
        if (!findQuizz) {
            throw new common_1.NotFoundException("quizz topilmadi");
        }
        try {
            await this.prisma.question.delete({
                where: { id }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], QuestionService);
//# sourceMappingURL=question.service.js.map