import { QuestionService } from "./question.service";
import { createDto } from "./crud.dto";
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    createQuestion(id: number, body: createDto): Promise<{
        id: number;
        content: string;
        quiz_id: number;
        is_correct: boolean;
    } | undefined>;
    deleteQuestion(id: number): Promise<void>;
}
