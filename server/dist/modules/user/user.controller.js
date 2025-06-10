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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const protected_decorator_1 = require("../../decorators/protected.decorator");
const role_decorator_1 = require("../../decorators/role.decorator");
const crud_dto_1 = require("./crud.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(body) {
        return await this.service.create({
            body: {
                email: body.email,
                role: body.role
            }
        });
    }
    async findAll(q) {
        return this.service.findAll({ query: q });
    }
    async findOne(id) {
        return this.service.findOne({ param: { id } });
    }
    async delete(id) {
        return this.service.delete({ param: { id } });
    }
    async update(id, body, file) {
        return await this.service.update({
            param: { id },
            body: {
                name: body.name || "",
                password: body.password || "",
                imageUrl: file || ""
            }
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('create'),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_dto_1.CreateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_dto_1.findAllDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("find/:id"),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imageUrl')),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 10_000_000 }),
            new common_1.FileTypeValidator({ fileType: 'image/jpeg' })
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, crud_dto_1.UpdateDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map