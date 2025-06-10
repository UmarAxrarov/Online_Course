import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(categoryId: number, courseId: number): Promise<{
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
