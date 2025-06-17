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
        description: string;
        title: string;
        audios: string[];
        imgs: string[];
        course_id: number;
    }>;
    findAll(query: findAllDto): Promise<({
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
    findOne(id: number): Promise<({
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
    dleete(id: number): Promise<string>;
    update(id: number, Body: CreateDto, files: {
        images?: Express.Multer.File[];
        audios?: Express.Multer.File[];
    }): Promise<{
        id: number;
        description: string;
        title: string;
        audios: string[];
        imgs: string[];
        course_id: number;
    }>;
}
