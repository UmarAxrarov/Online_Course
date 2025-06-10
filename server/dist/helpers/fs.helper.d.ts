import { OnModuleInit } from "@nestjs/common";
type a = Express.Multer.File[];
export declare class FsHelper implements OnModuleInit {
    onModuleInit(): void;
    mkdirPath(): void;
    uploadsImage(image: Express.Multer.File, oldImage?: string): string;
    removeImage(image: string): string;
    uploadFiles(files: {
        images: a;
        videos: a;
        audios: a;
    }, oldFiles?: {
        images: string[];
        videos: string[];
        audios: string[];
    }): {
        images: never[];
        videos: never[];
        audios: never[];
    };
    removeFiles(files: {
        images: string[];
        videos: string[];
        audios: string[];
    }): string;
}
export {};
