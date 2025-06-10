import { PrismaService } from "src/prisma";
import { LoginDto, RegisterDto } from "./dtos/register-login.dto";
import { JwtHelper } from "src/helpers/jwt.helper";
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtHelper);
    registerClient(dto: RegisterDto): Promise<{
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
    loginClient(dto: LoginDto): Promise<{
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
}
