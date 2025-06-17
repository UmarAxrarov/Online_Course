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
        title: string;
        videos: string[];
        content: string;
        link_or_number: string;
        like_count: number;
        teacher_id: number;
        imgs: string[];
        categoryies_names: string[];
    }>;
    findAll(payload: {
        query: {
            page: number;
            limit: number;
            sortField: string;
            sortOrder: string;
        };
    }): Promise<({
        comments: {
            client: {
                id: number;
                name: string;
                imageUrl: string;
            };
            id: number;
            content: string;
        }[];
        teacher: {
            id: number;
            name: string;
            imageUrl: string;
        };
        quizzes: {
            id: number;
            description: string;
            title: string;
            audios: string[];
            imgs: string[];
            questions: {
                content: string;
            }[];
        }[];
    } & {
        id: number;
        title: string;
        videos: string[];
        content: string;
        link_or_number: string;
        like_count: number;
        teacher_id: number;
        imgs: string[];
        categoryies_names: string[];
    })[]>;
    findOne(payload: {
        param: {
            id: number;
        };
    }): Promise<({
        comments: {
            client: {
                id: number;
                name: string;
                imageUrl: string;
            };
            id: number;
            content: string;
        }[];
        teacher: {
            id: number;
            name: string;
            imageUrl: string;
        };
        quizzes: {
            id: number;
            description: string;
            title: string;
            audios: string[];
            imgs: string[];
            questions: {
                content: string;
            }[];
        }[];
    } & {
        id: number;
        title: string;
        videos: string[];
        content: string;
        link_or_number: string;
        like_count: number;
        teacher_id: number;
        imgs: string[];
        categoryies_names: string[];
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
        title: string;
        videos: string[];
        content: string;
        link_or_number: string;
        like_count: number;
        teacher_id: number;
        imgs: string[];
        categoryies_names: string[];
    }>;
    remove(payload: {
        param: {
            id: number;
        };
    }): Promise<string>;
}
