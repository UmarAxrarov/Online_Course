import { PrismaService } from "src/prisma";
import { createDto } from "./crud.dto";
export declare class QuestionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(payload: {
        param: {
            id: number;
        };
        body: createDto;
    }): Promise<{
        id: number;
        content: string;
        quiz_id: number;
        is_correct: boolean;
    }>;
    delete(id: number): Promise<void>;
}
