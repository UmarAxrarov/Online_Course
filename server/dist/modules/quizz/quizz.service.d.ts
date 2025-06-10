import { PrismaService } from "src/prisma";
import { CreateDto, findAllDto } from "./dtos/crud.dto";
import { FsHelper } from "src/helpers/fs.helper";
export declare class QuizzService {
    private prisma;
    private fs;
    constructor(prisma: PrismaService, fs: FsHelper);
    create(payload: {
        param: {
            course_id: number;
        };
        body: CreateDto;
    }): Promise<{
        id: number;
        course_id: number;
        title: string;
        description: string;
        imgs: string[];
        audios: string[];
    }>;
    findAll(payload: {
        query: findAllDto;
    }): Promise<({
        questions: {
            id: number;
            quiz_id: number;
            content: string;
            is_correct: boolean;
        }[];
    } & {
        id: number;
        course_id: number;
        title: string;
        description: string;
        imgs: string[];
        audios: string[];
    })[]>;
    findOne(payload: {
        param: {
            id: number;
        };
    }): Promise<({
        questions: {
            id: number;
            quiz_id: number;
            content: string;
            is_correct: boolean;
        }[];
    } & {
        id: number;
        course_id: number;
        title: string;
        description: string;
        imgs: string[];
        audios: string[];
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
        body: CreateDto;
    }): Promise<{
        id: number;
        course_id: number;
        title: string;
        description: string;
        imgs: string[];
        audios: string[];
    }>;
}
