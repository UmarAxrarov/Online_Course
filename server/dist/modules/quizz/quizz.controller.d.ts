import { QuizzService } from "./quizz.service";
import { CreateDto, findAllDto } from "./dtos/crud.dto";
export declare class QuizzController {
    private service;
    constructor(service: QuizzService);
    create(id: number, Body: CreateDto, files: {
        images?: Express.Multer.File[];
        audios?: Express.Multer.File[];
    }): Promise<{
        id: number;
        course_id: number;
        title: string;
        description: string;
        imgs: string[];
        audios: string[];
    }>;
    findAll(query: findAllDto): Promise<({
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
    findOne(id: number): Promise<({
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
    dleete(id: number): Promise<string>;
    update(id: number, Body: CreateDto, files: {
        images?: Express.Multer.File[];
        audios?: Express.Multer.File[];
    }): Promise<{
        id: number;
        course_id: number;
        title: string;
        description: string;
        imgs: string[];
        audios: string[];
    }>;
}
