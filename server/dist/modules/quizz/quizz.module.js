"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzModule = void 0;
const common_1 = require("@nestjs/common");
const quizz_service_1 = require("./quizz.service");
const prisma_1 = require("../../prisma");
const fs_helper_1 = require("../../helpers/fs.helper");
const quizz_controller_1 = require("./quizz.controller");
let QuizzModule = class QuizzModule {
};
exports.QuizzModule = QuizzModule;
exports.QuizzModule = QuizzModule = __decorate([
    (0, common_1.Module)({
        controllers: [quizz_controller_1.QuizzController],
        exports: [],
        imports: [],
        providers: [quizz_service_1.QuizzService, prisma_1.PrismaService, fs_helper_1.FsHelper],
    })
], QuizzModule);
//# sourceMappingURL=quizz.module.js.map