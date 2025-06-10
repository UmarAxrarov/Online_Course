import { CommentService } from "./comment.service";
import { createDto } from "./crud.dto";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(ci: number, cui: number, body: createDto): Promise<{
        id: number;
        content: string;
        course_id: number;
        client_id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    deleteComment(id: number): Promise<void>;
    updateComment(id: number, content: string): Promise<{
        id: number;
        content: string;
        course_id: number;
        client_id: number;
        created_at: Date;
        updated_at: Date;
    }>;
}
