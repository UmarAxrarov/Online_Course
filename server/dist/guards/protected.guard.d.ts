import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtHelper } from "src/helpers/jwt.helper";
export declare class ProtectedGuard implements CanActivate {
    private reflector;
    private jwt;
    constructor(reflector: Reflector, jwt: JwtHelper);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
