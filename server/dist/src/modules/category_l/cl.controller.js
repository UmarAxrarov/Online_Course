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
exports.LanguageCategoryController = void 0;
const common_1 = require("@nestjs/common");
const cl_service_1 = require("./cl.service");
const crud_dto_1 = require("./crud.dto");
const protected_decorator_1 = require("../../decorators/protected.decorator");
const role_decorator_1 = require("../../decorators/role.decorator");
let LanguageCategoryController = class LanguageCategoryController {
    langCatService;
    constructor(langCatService) {
        this.langCatService = langCatService;
    }
    create(body) {
        return this.langCatService.create(body);
    }
    findAll() {
        return this.langCatService.findAll();
    }
    findOne(id) {
        return this.langCatService.findOne(id);
    }
    update(id, body) {
        return this.langCatService.update(id, body);
    }
    delete(id) {
        return this.langCatService.delete(id);
    }
};
exports.LanguageCategoryController = LanguageCategoryController;
__decorate([
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["user"]),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_dto_1.cDto]),
    __metadata("design:returntype", void 0)
], LanguageCategoryController.prototype, "create", null);
__decorate([
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LanguageCategoryController.prototype, "findAll", null);
__decorate([
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    (0, common_1.Get)('find/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LanguageCategoryController.prototype, "findOne", null);
__decorate([
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, crud_dto_1.cDto]),
    __metadata("design:returntype", void 0)
], LanguageCategoryController.prototype, "update", null);
__decorate([
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(['user']),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LanguageCategoryController.prototype, "delete", null);
exports.LanguageCategoryController = LanguageCategoryController = __decorate([
    (0, common_1.Controller)('language-category'),
    __metadata("design:paramtypes", [cl_service_1.LanguageCategoryService])
], LanguageCategoryController);
//# sourceMappingURL=cl.controller.js.map