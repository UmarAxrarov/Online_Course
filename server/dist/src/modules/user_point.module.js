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
exports.UPointModule = void 0;
const common_1 = require("@nestjs/common");
const protected_decorator_1 = require("../decorators/protected.decorator");
const role_decorator_1 = require("../decorators/role.decorator");
const prisma_1 = require("../prisma");
let UPointService = class UPointService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(client_id, point_count) {
        const findUser = await this.prisma.client.findUnique({ where: { id: client_id } });
        if (!findUser) {
            throw new common_1.NotFoundException("user topilmadi");
        }
        try {
            const po = await this.prisma.userPoint.create({ data: { user_id: client_id, points: point_count } });
            return po;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
UPointService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], UPointService);
let UPointController = class UPointController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(id, body) {
        return this.service.create(id, body.userpoint);
    }
};
__decorate([
    (0, common_1.Post)('create/:client_id'),
    (0, protected_decorator_1.Protected)(false),
    (0, role_decorator_1.Roles)(["user"]),
    __param(0, (0, common_1.Param)('client_id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UPointController.prototype, "create", null);
UPointController = __decorate([
    (0, common_1.Controller)('userpoint'),
    __metadata("design:paramtypes", [UPointService])
], UPointController);
let UPointModule = class UPointModule {
};
exports.UPointModule = UPointModule;
exports.UPointModule = UPointModule = __decorate([
    (0, common_1.Module)({
        controllers: [UPointController],
        providers: [UPointService, prisma_1.PrismaService]
    })
], UPointModule);
//# sourceMappingURL=user_point.module.js.map