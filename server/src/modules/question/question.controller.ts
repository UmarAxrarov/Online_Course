import { Body, Controller, Delete, Param, ParseIntPipe, Post } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { createDto } from "./crud.dto";
import { Protected } from "src/decorators/protected.decorator";
import { Roles } from "src/decorators/role.decorator";

@Controller("question")
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

    @Post("/:id")
    @Protected(false)
    @Roles(['user'])
    async createQuestion(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: createDto
    ) {
        try {
            return await this.questionService.create({
                param: { id: Number(id) },
                body
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    
    @Delete("/:id")
    @Protected(false)
    @Roles(['user'])
    async deleteQuestion(@Param("id") id: number) {
        return await this.questionService.delete(Number(id));
    }
}
