import { PipeTransform } from '@nestjs/common';
export declare class MultipleFilesValidatorPipe implements PipeTransform {
    transform(files: {
        images?: Express.Multer.File[];
        videos?: Express.Multer.File[];
    }): {
        images?: Express.Multer.File[];
        videos?: Express.Multer.File[];
    };
}
