"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleFilesValidatorPipe = void 0;
const common_1 = require("@nestjs/common");
let MultipleFilesValidatorPipe = class MultipleFilesValidatorPipe {
    transform(files) {
        const maxSizeImages = 10_000_000;
        const maxSizeVideo = 20_000_000;
        const allowedTypesImages = ["jpeg", "png", "jpg", "webp", "svg"];
        const allowedTypesVideos = ["mp4"];
        const validateImage = (file) => {
            const subtype = file.mimetype.split('/')[1];
            if (!allowedTypesImages.includes(subtype)) {
                throw new common_1.BadRequestException(`Only image types (${allowedTypesImages.join(', ')}) are allowed`);
            }
            if (file.size > maxSizeImages) {
                throw new common_1.BadRequestException('Image file is too large');
            }
        };
        const validateVideo = (file) => {
            const subtype = file.mimetype.split('/')[1];
            if (!allowedTypesVideos.includes(subtype)) {
                throw new common_1.BadRequestException(`Only video types (${allowedTypesVideos.join(', ')}) are allowed`);
            }
            if (file.size > maxSizeVideo) {
                throw new common_1.BadRequestException('Video file is too large');
            }
        };
        files.images?.forEach(validateImage);
        files.videos?.forEach(validateVideo);
        return files;
    }
};
exports.MultipleFilesValidatorPipe = MultipleFilesValidatorPipe;
exports.MultipleFilesValidatorPipe = MultipleFilesValidatorPipe = __decorate([
    (0, common_1.Injectable)()
], MultipleFilesValidatorPipe);
//# sourceMappingURL=files.pipe.js.map