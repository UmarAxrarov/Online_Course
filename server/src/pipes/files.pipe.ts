import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class MultipleFilesValidatorPipe implements PipeTransform {
  transform(files: { images?: Express.Multer.File[]; videos?: Express.Multer.File[] }) {
    const maxSizeImages = 10_000_000; // 10MB
    const maxSizeVideo = 20_000_000; // 20MB
    const allowedTypesImages = ["jpeg", "png", "jpg", "webp", "svg"];
    const allowedTypesVideos = ["mp4"];

    const validateImage = (file: Express.Multer.File) => {
      const subtype = file.mimetype.split('/')[1];
      if (!allowedTypesImages.includes(subtype)) {
        throw new BadRequestException(`Only image types (${allowedTypesImages.join(', ')}) are allowed`);
      }
      if (file.size > maxSizeImages) {
        throw new BadRequestException('Image file is too large');
      }
    };

    const validateVideo = (file: Express.Multer.File) => {
      const subtype = file.mimetype.split('/')[1];
      if (!allowedTypesVideos.includes(subtype)) {
        throw new BadRequestException(`Only video types (${allowedTypesVideos.join(', ')}) are allowed`);
      }
      if (file.size > maxSizeVideo) {
        throw new BadRequestException('Video file is too large');
      }
    };

    files.images?.forEach(validateImage);
    files.videos?.forEach(validateVideo);

    return files;
  }
}
