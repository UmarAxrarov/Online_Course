import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dtos/register-login.dto";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "../email/email.service";
export declare class AuthController {
    private readonly authService;
    private jwt;
    private emailService;
    constructor(authService: AuthService, jwt: JwtService, emailService: EmailService);
    google(): Promise<void>;
    googleAuthRedirect(req: any, res: Response): Promise<void>;
    register(payload: RegisterDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        imageUrl: string;
        token: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(payload: LoginDto): Promise<{
        client: {
            id: number;
            name: string;
            email: string;
            password: string;
            role: string;
            imageUrl: string;
            token: string;
            createdAt: Date;
            updatedAt: Date;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    email(payload: {
        email: string;
    }): Promise<{
        success: boolean;
    }>;
    forgot(payload: {
        token: string;
        password: string;
    }): Promise<{
        success: boolean;
    }>;
}
