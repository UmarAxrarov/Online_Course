import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtHelper } from "src/helpers/jwt.helper";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma";
import { GoogleStrategy } from "./strategy/google.strategy";
import { EmailService } from "../email/email.service";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtHelper,
        JwtService,
        PrismaService,
        GoogleStrategy,
        EmailService
    ],
    exports: []
})
export class AuthModule {}