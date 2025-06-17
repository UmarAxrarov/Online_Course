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
exports.UpdateDto = exports.findAllDto = exports.CreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const roles_enum_1 = require("../../enum/roles.enum");
class CreateDto {
    email;
    role;
}
exports.CreateDto = CreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        enum: roles_enum_1.ClientRoles
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(roles_enum_1.ClientRoles),
    __metadata("design:type", String)
], CreateDto.prototype, "role", void 0);
class findAllDto {
    page;
    limit;
    sortField;
    sortOrder;
}
exports.findAllDto = findAllDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        required: false,
        default: 1,
    }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], findAllDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        required: false,
        default: 10,
    }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], findAllDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Saralash maydoni',
        example: 'id',
        enum: ['id', 'role'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['id', 'role']),
    __metadata("design:type", String)
], findAllDto.prototype, "sortField", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Saralash tartibi',
        example: 'asc',
        enum: ['asc', 'desc'],
    }),
    (0, class_validator_1.IsIn)(['asc', 'desc']),
    __metadata("design:type", String)
], findAllDto.prototype, "sortOrder", void 0);
class UpdateDto {
    name;
    password;
    imageUrl;
}
exports.UpdateDto = UpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], UpdateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string"
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        format: "binary"
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDto.prototype, "imageUrl", void 0);
//# sourceMappingURL=crud.dto.js.map