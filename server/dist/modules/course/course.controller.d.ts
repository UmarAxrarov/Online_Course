import { CourseService } from "./course.service";
import { CreateDto, findAllDto } from "./dtos/crud.dto";
export declare class CourseController {
    private service;
    constructor(service: CourseService);
    create(id: number, body: CreateDto, files: {
        images?: Express.Multer.File[];
        videos?: Express.Multer.File[];
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
    findAll(query: findAllDto): Promise<({
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
    findOne(id: number): Promise<({
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
    delete(id: number): Promise<string>;
    update(id: number, body: CreateDto, files: {
        images?: Express.Multer.File[];
        videos?: Express.Multer.File[];
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
}
