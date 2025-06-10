import { PrismaService } from "src/prisma";
import { CreateDto, findAllDto } from "./crud.dto";
import { FsHelper } from "src/helpers/fs.helper";
export declare class UserService {
    private prisma;
    private fs;
    constructor(prisma: PrismaService, fs: FsHelper);
    create(payload: {
        body: CreateDto;
    }): Promise<{
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
    findAll(payload: {
        query: findAllDto;
    }): Promise<{
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
    findOne(payload: {
        param: {
            id: number;
        };
    }): Promise<({
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
    delete(payload: {
        param: {
            id: number;
        };
    }): Promise<string>;
    update(payload: {
        param: {
            id: number;
        };
        body: {
            name: string;
            password: string;
            imageUrl: Express.Multer.File;
        };
    }): Promise<{
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
