import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dtos/register-login.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
