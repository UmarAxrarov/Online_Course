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
exports.JwtHelper = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtHelper = class JwtHelper {
    jwt;
    constructor(jwt) {
        this.jwt = jwt;
    }
    signTokens(payload) {
        return {
            accessToken: this.jwt.sign(payload, {
                secret: process.env.ACCESS_TOKEN_SECRET,
                expiresIn: parseInt(process.env.ACCESS_TOKEN_TIME),
            }),
            refreshToken: this.jwt.sign(payload, {
                secret: process.env.REFRESH_TOKEN_SECRET,
                expiresIn: parseInt(process.env.REFRESH_TOKEN_TIME),
            }),
        };
    }
    verifyTokens(payload) {
        try {
            const accessToken = this.jwt.verify(payload.accessToken, {
                secret: process.env.ACCESS_TOKEN_SECRET,
            });
            console.log(accessToken);
            return {
                accessToken
            };
        }
        catch (error) {
            if (error instanceof jwt_1.TokenExpiredError) {
                try {
                    const verifyRefreshToken = this.jwt.verify(payload.refreshToken, {
                        secret: process.env.REFRESH_TOKEN_SECRET,
                    });
                    const accessTokenSign = this.jwt.sign({ id: verifyRefreshToken.id, role: verifyRefreshToken.role }, {
                        secret: process.env.ACCESS_TOKEN_SECRET,
                        expiresIn: process.env.ACCESS_TOKEN_TIME,
                    });
                    const refreshToken = this.jwt.sign({ id: verifyRefreshToken.id, role: verifyRefreshToken.role }, {
                        secret: process.env.REFRESH_TOKEN_SECRET,
                        expiresIn: process.env.REFRESH_TOKEN_TIME,
                    });
                    const accessToken = this.jwt.verify(accessTokenSign, {
                        secret: process.env.ACCESS_TOKEN_SECRET,
                    });
                    return {
                        accessToken,
                        refreshToken,
                    };
                }
                catch (refreshError) {
                    if (refreshError instanceof jwt_1.TokenExpiredError) {
                        throw new common_1.ForbiddenException("Refresh token muddati tugagan");
                    }
                    else if (refreshError instanceof jwt_1.JsonWebTokenError) {
                        throw new common_1.BadRequestException("Refresh token noto‘g‘ri");
                    }
                    throw new common_1.InternalServerErrorException("Refresh token tekshiruvda xatolik");
                }
            }
            else if (error instanceof jwt_1.JsonWebTokenError) {
                throw new common_1.BadRequestException("Access token noto‘g‘ri");
            }
            throw new common_1.InternalServerErrorException("Access token tekshiruvda xatolik");
        }
    }
};
exports.JwtHelper = JwtHelper;
exports.JwtHelper = JwtHelper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtHelper);
//# sourceMappingURL=jwt.helper.js.map