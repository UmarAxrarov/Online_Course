"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const platform_express_1 = require("@nestjs/platform-express");
const crud_dto_1 = require("./dtos/crud.dto");
const protected_decorator_1 = require("../../decorators/protected.decorator");
const role_decorator_1 = require("../../decorators/role.decorator");
const files_pipe_1 = require("../../pipes/files.pipe");
const swagger_1 = require("@nestjs/swagger");
let CourseController = class CourseController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(id, body, files) {
        return await this.service.create({
            param: { teacher_id: id },
            body: {
                title: body.title,
                content: body.content,
                categories_names: body.categories_names,
                link_or_number: body.link_or_number,
                files: {
                    images: files.images || [],
                    videos: files.videos || [],
                },
            },
        });
    }
    async findAll(query) {
        return await this.service.findAll({ query: query });
    }
    async findOne(id) {
        return await this.service.findOne({ param: { id } });
    }
    async delete(id) {
        return await this.service.remove({ param: { id } });
    }
    async update(id, body, files) {
        return await this.service.update({
            param: { id },
            body: {
                title: body.title,
                content: body.content,
                link_or_number: body.link_or_number,
                files: {
                    images: files.images || [],
                    videos: files.videos || [],
                },
            },
        });
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Post)('create/:id'),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["user"]),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', example: 'Matematika darsi' },
                content: { type: 'string', example: 'Bu dars Pifagor teoremasi haqida' },
                link_or_number: { type: 'string', example: '998901234567 yoki https://t.me/teacher' },
                categories_names: { type: 'string', example: 'new' },
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                videos: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 5 },
        { name: 'videos', maxCount: 2 },
    ])),
    (0, common_1.UsePipes)(new files_pipe_1.MultipleFilesValidatorPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, crud_dto_1.CreateDto, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["user"]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_dto_1.findAllDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/find/:id"),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["user"]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)("/delete/:id"),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["user"]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["user"]),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', example: 'Matematika darsi' },
                content: { type: 'string', example: 'Bu dars Pifagor teoremasi haqida' },
                link_or_number: { type: 'string', example: '998901234567 yoki https://t.me/teacher' },
                categories_names: { type: 'string', example: 'new' },
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                videos: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 5 },
        { name: 'videos', maxCount: 2 },
    ])),
    (0, common_1.UsePipes)(new files_pipe_1.MultipleFilesValidatorPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, crud_dto_1.CreateDto, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "update", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)("course"),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map