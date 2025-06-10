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
exports.QuizzController = void 0;
const common_1 = require("@nestjs/common");
const quizz_service_1 = require("./quizz.service");
const crud_dto_1 = require("./dtos/crud.dto");
const protected_decorator_1 = require("../../decorators/protected.decorator");
const role_decorator_1 = require("../../decorators/role.decorator");
const swagger_1 = require("@nestjs/swagger");
const files_pipe_1 = require("../../pipes/files.pipe");
const platform_express_1 = require("@nestjs/platform-express");
let QuizzController = class QuizzController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(id, Body, files) {
        return await this.service.create({
            param: { course_id: id },
            body: {
                title: Body.title,
                description: Body.description,
                files: {
                    images: files.images || [],
                    audios: files.audios || []
                }
            }
        });
    }
    async findAll(query) {
        return await this.service.findAll({ query });
    }
    async findOne(id) {
        return await this.service.findOne({ param: { id } });
    }
    async dleete(id) {
        return await this.service.delete({ param: { id } });
    }
    async update(id, Body, files) {
        return await this.service.update({
            param: { id },
            body: {
                title: Body.title,
                description: Body.description,
                files: {
                    images: files.images || [],
                    audios: files.audios || []
                }
            }
        });
    }
};
exports.QuizzController = QuizzController;
__decorate([
    (0, common_1.Post)('create/:id'),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', example: 'Matematika darsi' },
                description: { type: 'string', example: 'Bu dars Pifagor teoremasi haqida' },
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                audios: {
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
        { name: "images", maxCount: 5 },
        { name: "audios", maxCount: 2 }
    ])),
    (0, common_1.UsePipes)(new files_pipe_1.MultipleFilesValidatorPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, crud_dto_1.CreateDto, Object]),
    __metadata("design:returntype", Promise)
], QuizzController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_dto_1.findAllDto]),
    __metadata("design:returntype", Promise)
], QuizzController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/find/:id"),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizzController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)("/delete/:id"),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizzController.prototype, "dleete", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', example: 'Matematika darsi' },
                description: { type: 'string', example: 'Bu dars Pifagor teoremasi haqida' },
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                audios: {
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
        { name: "images", maxCount: 5 },
        { name: "audios", maxCount: 2 }
    ])),
    (0, common_1.UsePipes)(new files_pipe_1.MultipleFilesValidatorPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, crud_dto_1.CreateDto, Object]),
    __metadata("design:returntype", Promise)
], QuizzController.prototype, "update", null);
exports.QuizzController = QuizzController = __decorate([
    (0, common_1.Controller)("quizz"),
    __metadata("design:paramtypes", [quizz_service_1.QuizzService])
], QuizzController);
//# sourceMappingURL=quizz.controller.js.map