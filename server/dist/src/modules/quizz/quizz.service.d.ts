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
        description: string;
        title: string;
        audios: string[];
        imgs: string[];
        course_id: number;
    }>;
    findAll(payload: {
        query: findAllDto;
    }): Promise<({
        questions: {
            id: number;
            content: string;
            quiz_id: number;
            is_correct: boolean;
        }[];
    } & {
        id: number;
        description: string;
        title: string;
        audios: string[];
        imgs: string[];
        course_id: number;
    })[]>;
    findOne(payload: {
        param: {
            id: number;
        };
    }): Promise<({
        questions: {
            id: number;
            content: string;
            quiz_id: number;
            is_correct: boolean;
        }[];
    } & {
        id: number;
        description: string;
        title: string;
        audios: string[];
        imgs: string[];
        course_id: number;
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
        description: string;
        title: string;
        audios: string[];
        imgs: string[];
        course_id: number;
    }>;
}
