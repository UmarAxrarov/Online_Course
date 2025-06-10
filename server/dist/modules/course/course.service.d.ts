import { FsHelper } from "src/helpers/fs.helper";
import { PrismaService } from "src/prisma";
import { CreateDto } from "./dtos/crud.dto";
export declare class CourseService {
    private prisma;
    private fs;
    constructor(prisma: PrismaService, fs: FsHelper);
    create(payload: {
        param: {
            teacher_id: number;
        };
        body: CreateDto;
    }): Promise<{
        id: number;
        teacher_id: number;
        title: string;
        content: string;
        videos: string[];
        imgs: string[];
        categoryies_names: string[];
        link_or_number: string;
        like_count: number;
    }>;
    findAll(payload: {
        query: {
            page: number;
            limit: number;
            sortField: string;
            sortOrder: string;
        };
    }): Promise<({
        teacher: {
            id: number;
            name: string;
            imageUrl: string;
        };
        quizzes: {
            id: number;
            title: string;
            imgs: string[];
            audios: string[];
            description: string;
            questions: {
                content: string;
            }[];
        }[];
        comments: {
            id: number;
            content: string;
            client: {
                id: number;
                name: string;
                imageUrl: string;
            };
        }[];
    } & {
        id: number;
        teacher_id: number;
        title: string;
        content: string;
        videos: string[];
        imgs: string[];
        categoryies_names: string[];
        link_or_number: string;
        like_count: number;
    })[]>;
    findOne(payload: {
        param: {
            id: number;
        };
    }): Promise<({
        teacher: {
            id: number;
            name: string;
            imageUrl: string;
        };
        quizzes: {
            id: number;
            title: string;
            imgs: string[];
            audios: string[];
            description: string;
            questions: {
                content: string;
            }[];
        }[];
        comments: {
            id: number;
            content: string;
            client: {
                id: number;
                name: string;
                imageUrl: string;
            };
        }[];
    } & {
        id: number;
        teacher_id: number;
        title: string;
        content: string;
        videos: string[];
        imgs: string[];
        categoryies_names: string[];
        link_or_number: string;
        like_count: number;
    }) | null>;
    update(payload: {
        param: {
            id: number;
        };
        body: {
            title?: string;
            content?: string;
            link_or_number?: string;
            files?: {
                images?: Express.Multer.File[];
                videos?: Express.Multer.File[];
            };
        };
    }): Promise<{
        id: number;
        teacher_id: number;
        title: string;
        content: string;
        videos: string[];
        imgs: string[];
        categoryies_names: string[];
        link_or_number: string;
        like_count: number;
    }>;
    remove(payload: {
        param: {
            id: number;
        };
    }): Promise<string>;
}
