"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
const cl_controller_1 = require("./cl.controller");
const cl_service_1 = require("./cl.service");
let LanguageCategoryModule = class LanguageCategoryModule {
};
exports.LanguageCategoryModule = LanguageCategoryModule;
exports.LanguageCategoryModule = LanguageCategoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [cl_controller_1.LanguageCategoryController],
        providers: [cl_service_1.LanguageCategoryService, prisma_1.PrismaService],
    })
], LanguageCategoryModule);
//# sourceMappingURL=category_language.module.js.map