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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../prisma");
let LanguageCategoryService = class LanguageCategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            return await this.prisma.category.create({ data: { uz_name: data.uz_name, ru_name: data.ru_name, ua_name: data.ua_name } });
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async findAll() {
        return this.prisma.category.findMany({});
    }
    async findOne(id) {
        const langCat = await this.prisma.category.findUnique({ where: { id } });
        if (!langCat)
            throw new common_1.NotFoundException('Language category not found');
        return langCat;
    }
    async update(id, data) {
        try {
            return await this.prisma.category.update({
                where: { id },
                data,
            });
        }
        catch {
            throw new common_1.NotFoundException('Language category not found');
        }
    }
    async delete(id) {
        try {
            return await this.prisma.category.delete({ where: { id } });
        }
        catch {
            throw new common_1.NotFoundException('Language category not found');
        }
    }
};
exports.LanguageCategoryService = LanguageCategoryService;
exports.LanguageCategoryService = LanguageCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], LanguageCategoryService);
//# sourceMappingURL=cl.service.js.map