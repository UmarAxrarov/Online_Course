import { UserService } from "./user.service";
import { CreateDto, findAllDto, UpdateDto } from "./crud.dto";
export declare class UserController {
    private service;
    constructor(service: UserService);
    create(body: CreateDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        imageUrl: string;
        token: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(q: findAllDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        imageUrl: string;
        token: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<({
        likes: {
            id: number;
            course_id: number;
            client_id: number;
        }[];
        userPoints: {
            id: number;
            user_id: number;
            points: number;
        }[];
        comments: {
            id: number;
            course_id: number;
            client_id: number;
            content: string;
            created_at: Date;
            updated_at: Date;
        }[];
        courses: ({
            quizzes: ({
                questions: {
                    id: number;
                    content: string;
                    quiz_id: number;
                    is_correct: boolean;
                }[];
            } & {
                audios: string[];
                id: number;
                course_id: number;
                title: string;
                imgs: string[];
                description: string;
            })[];
        } & {
            videos: string[];
            id: number;
            content: string;
            teacher_id: number;
            title: string;
            imgs: string[];
            categoryies_names: string[];
            link_or_number: string;
            like_count: number;
        })[];
    } & {
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        imageUrl: string;
        token: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    delete(id: number): Promise<string>;
    update(id: number, body: UpdateDto, file: Express.Multer.File): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        imageUrl: string;
        token: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
