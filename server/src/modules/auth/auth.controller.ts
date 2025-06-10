import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dtos/register-login.dto";
import { Protected } from "src/decorators/protected.decorator";
import { Roles } from "src/decorators/role.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("auth")
@ApiBearerAuth()
export class AuthController {
    constructor(private readonly authService:AuthService) {}
    @Protected(false)
    @Roles(["admin","user"])
    @Post("register")
    async register(@Body() payload: RegisterDto) {
        return await this.authService.registerClient(payload);
    }
    @Protected(false)
    @Roles(["admin","user"])
    @Post("login")
    async login(@Body() payload: LoginDto) {
        return await this.authService.loginClient(payload);
    }
}