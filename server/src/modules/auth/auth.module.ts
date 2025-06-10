import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtHelper } from "src/helpers/jwt.helper";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService,JwtHelper,JwtService,PrismaService],
    exports: []
})
export class AuthModule {}