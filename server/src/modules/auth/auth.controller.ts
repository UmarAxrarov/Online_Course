import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dtos/register-login.dto";
import { Protected } from "src/decorators/protected.decorator";
import { Roles } from "src/decorators/role.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { JwtService, } from "@nestjs/jwt";
import { EmailService } from "../email/email.service";

@Controller("auth")
@ApiBearerAuth()
export class AuthController {
    constructor(private readonly authService: AuthService, private jwt: JwtService, private emailService: EmailService) { }
    @Get("/google")
    @Protected(false)
    @Roles(["admin", "user"])
    @UseGuards(AuthGuard('google'))
    async google() { 
        console.log("Gooogle")
    }

    @UseGuards(AuthGuard('google'))
    @Get("/google/callback")
    @Protected(false)
    @Roles(["admin", "user"])
    async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
        const user = JSON.stringify(req.user);
        console.log("Callback ishladi");
        res.redirect(`http://127.0.0.1:5500/client/public/html/register.html?token=${encodeURIComponent(user)}`);
    }

    @Post("register")
    @Protected(false)
    @Roles(["admin", "user"])
    async register(@Body() payload: RegisterDto) {
        return await this.authService.registerClient(payload);
    }
    @Post("login")
    @Protected(false)
    @Roles(["admin", "user"])
    async login(@Body() payload: LoginDto) {
        console.log("Login kirmasin ")
        return await this.authService.loginClient(payload);
    }
    @Post("email")
    @Protected(false)
    @Roles(["admin", "user"])
    async email(@Body() payload: { email: string }) {
        await this.emailService.sendEamil(payload.email);
        return { success: true };
    }
    @Post("forgotpassword")
    @Protected(false)
    @Roles(["admin", "user"]) 
    async forgot(@Body() payload: { token: string, password: string }) {        
        await this.authService.forgotPassword(payload.token, payload.password);
        return { success: true };
    }
}