import { PrismaService } from "src/prisma";
import { createDto } from "./crud.dto";
export declare class CommentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(payload: {
        param: {
            ci: number;
            cui: number;
        };
        body: createDto;
    }): Promise<{
        id: number;
        content: string;
        course_id: number;
        client_id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    delete(id: number): Promise<void>;
    update(id: number, content: string): Promise<{
        id: number;
        content: string;
        course_id: number;
        client_id: number;
        created_at: Date;
        updated_at: Date;
    }>;
}
