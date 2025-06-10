import { JwtService } from "@nestjs/jwt";
export interface JwtPayload {
    id: number;
    role: string;
}
export declare class JwtHelper {
    private readonly jwt;
    constructor(jwt: JwtService);
    signTokens(payload: JwtPayload): {
        accessToken: string;
        refreshToken: string;
    };
    verifyTokens(payload: {
        accessToken: string;
        refreshToken: string;
    }): any;
}
