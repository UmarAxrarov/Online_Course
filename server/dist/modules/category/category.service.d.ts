import { PrismaService } from 'src/prisma';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(payload: {
        category_id: number;
        course_id: number;
    }): Promise<{
        categoryId: number;
        courseId: number;
    }>;
    findAll(): Promise<({
        category: {
            id: number;
            uz_name: string;
            ru_name: string;
            ua_name: string;
        };
        course: {
            id: number;
            title: string;
            videos: string[];
            content: string;
            link_or_number: string;
            like_count: number;
            teacher_id: number;
            imgs: string[];
            categoryies_names: string[];
        };
    } & {
        categoryId: number;
        courseId: number;
    })[]>;
}
