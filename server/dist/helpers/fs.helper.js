"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsHelper = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let FsHelper = class FsHelper {
    onModuleInit() {
        this.mkdirPath();
    }
    mkdirPath() {
        const uploadsPath = (0, path_1.join)(process.cwd(), "uploads");
        if (!(0, fs_1.existsSync)(uploadsPath)) {
            (0, fs_1.mkdirSync)(uploadsPath, { recursive: true });
        }
        const uploads_images = (0, path_1.join)(process.cwd(), "uploads", "images");
        if (!(0, fs_1.existsSync)(uploads_images)) {
            (0, fs_1.mkdirSync)(uploads_images, { recursive: true });
        }
        const uploads_videos = (0, path_1.join)(process.cwd(), "uploads", "videos");
        if (!(0, fs_1.existsSync)(uploads_videos)) {
            (0, fs_1.mkdirSync)(uploads_videos, { recursive: true });
        }
        const uploads_audios = (0, path_1.join)(process.cwd(), "uploads", "audios");
        if (!(0, fs_1.existsSync)(uploads_audios)) {
            (0, fs_1.mkdirSync)(uploads_audios, { recursive: true });
        }
    }
    uploadsImage(image, oldImage) {
        if (oldImage && oldImage !== "default-user-icon.png") {
            const oldImagePath = (0, path_1.join)(process.cwd(), "uploads", "images", oldImage);
            if ((0, fs_1.existsSync)(oldImagePath)) {
                (0, fs_1.unlinkSync)(oldImagePath);
            }
        }
        if (image.originalname !== "default-user-icon.png") {
            const uploads_images = (0, path_1.join)(process.cwd(), "uploads", "images");
            const sanitizeFilename = (name) => name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
            const imagePath = `${Date.now()}-${Math.random() * 2}-${sanitizeFilename(image.originalname)}`;
            const fullImagePath = (0, path_1.join)(uploads_images, imagePath);
            (0, fs_1.writeFileSync)(fullImagePath, image.buffer);
            return imagePath;
        }
        else {
            return "bur rasm ochirish mumkun emas";
        }
    }
    removeImage(image) {
        if (image !== "default-user-icon.png") {
            const imagePath = (0, path_1.join)(process.cwd(), "uploads", "images", image);
            if ((0, fs_1.existsSync)(imagePath)) {
                (0, fs_1.unlinkSync)(imagePath);
            }
            return "deleted";
        }
        else {
            return "bur rasm ochirish mumkun emas";
        }
    }
    uploadFiles(files, oldFiles) {
        if (oldFiles) {
            if (oldFiles.images.length > 0) {
                oldFiles.images.forEach((image) => {
                    const oldImagePath = (0, path_1.join)(process.cwd(), "uploads", "images", image);
                    if ((0, fs_1.existsSync)(oldImagePath)) {
                        (0, fs_1.unlinkSync)(oldImagePath);
                    }
                });
            }
            if (oldFiles.videos.length > 0) {
                oldFiles.videos.forEach((video) => {
                    const oldVideoPath = (0, path_1.join)(process.cwd(), "uploads", "videos", video);
                    if ((0, fs_1.existsSync)(oldVideoPath)) {
                        (0, fs_1.unlinkSync)(oldVideoPath);
                    }
                });
            }
            if (oldFiles.audios.length > 0) {
                oldFiles.audios.forEach((audio) => {
                    const oldAudioPath = (0, path_1.join)(process.cwd(), "uploads", "audios", audio);
                    if ((0, fs_1.existsSync)(oldAudioPath)) {
                        (0, fs_1.unlinkSync)(oldAudioPath);
                    }
                });
            }
        }
        const uploads_images = (0, path_1.join)(process.cwd(), "uploads", "images");
        const uploads_videos = (0, path_1.join)(process.cwd(), "uploads", "videos");
        const uploads_audios = (0, path_1.join)(process.cwd(), "uploads", "audios");
        const uploads = {
            images: [],
            videos: [],
            audios: []
        };
        if (files.images.length > 0) {
            files.images.forEach((image) => {
                const sanitizeFilename = (name) => name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
                const imagePath = `${Date.now()}-${Math.random() * 2}-${sanitizeFilename(image.originalname)}`;
                const fullImagePath = (0, path_1.join)(uploads_images, imagePath);
                (0, fs_1.writeFileSync)(fullImagePath, image.buffer);
                uploads.images.push(imagePath);
            });
        }
        if (files.videos.length > 0) {
            files.videos.forEach((video) => {
                const sanitizeFilename = (name) => name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
                const videoPath = `${Date.now()}-${Math.random() * 2}-${sanitizeFilename(video.originalname)}`;
                const fullVideoPath = (0, path_1.join)(uploads_videos, videoPath);
                (0, fs_1.writeFileSync)(fullVideoPath, video.buffer);
                uploads.videos.push(videoPath);
            });
        }
        if (files.audios.length > 0) {
            files.audios.forEach((audio) => {
                const sanitizeFilename = (name) => name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
                const audioPath = `${Date.now()}-${Math.random() * 2}-${sanitizeFilename(audio.originalname)}`;
                const fullAudioPath = (0, path_1.join)(uploads_audios, audioPath);
                (0, fs_1.writeFileSync)(fullAudioPath, audio.buffer);
                uploads.audios.push(audioPath);
            });
        }
        return uploads;
    }
    removeFiles(files) {
        console.log(files);
        if (files.images.length > 0) {
            files.images.forEach((image) => {
                const imagePath = (0, path_1.join)(process.cwd(), "uploads", "images", image);
                console.log(imagePath);
                if ((0, fs_1.existsSync)(imagePath)) {
                    console.log(imagePath);
                    (0, fs_1.unlinkSync)(imagePath);
                }
            });
        }
        if (files.videos.length > 0) {
            files.videos.forEach((video) => {
                const videoPath = (0, path_1.join)(process.cwd(), "uploads", "videos", video);
                if ((0, fs_1.existsSync)(videoPath)) {
                    (0, fs_1.unlinkSync)(videoPath);
                }
            });
        }
        if (files.audios.length > 0) {
            files.audios.forEach((audio) => {
                const audioPath = (0, path_1.join)(process.cwd(), "uploads", "audios", audio);
                if ((0, fs_1.existsSync)(audioPath)) {
                    (0, fs_1.unlinkSync)(audioPath);
                }
            });
        }
        return "deleted";
    }
};
exports.FsHelper = FsHelper;
exports.FsHelper = FsHelper = __decorate([
    (0, common_1.Injectable)()
], FsHelper);
//# sourceMappingURL=fs.helper.js.map