import {
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post,
    ParseIntPipe,
    Req,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { createDto } from "./crud.dto";
import { Protected } from "src/decorators/protected.decorator";
import { Roles } from "src/decorators/role.decorator";

@Controller("comment")
export class CommentController {
    constructor(private readonly commentService: CommentService) { }
    @Protected(true)
    @Roles(['user'])
    @Post("create/:course_id")
    async createComment(
        @Req() req: Request & { id: number },
        @Param("course_id", ParseIntPipe) cui: number,
        @Body() body: createDto
    ) {
        
        return this.commentService.create({ param: { ci: req.id, cui }, body });
    }

    @Protected(false)
    @Roles(['user'])
    @Delete("delete/:id")
    async deleteComment(@Param("id", ParseIntPipe) id: number) {
        return this.commentService.delete(id);
    }
    @Protected(false)
    @Roles(['user'])
    @Patch("update/:id")
    async updateComment(
        @Param("id", ParseIntPipe) id: number,
        @Body("content") content: string
    ) {
        return this.commentService.update(id, content);
    }
}
