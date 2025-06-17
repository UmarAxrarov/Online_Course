import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request, Response } from "express";

import { PROTECTED_KEY } from "src/decorators/protected.decorator";
import { ClientRoles } from "src/enum/roles.enum";
import { JwtHelper } from "src/helpers/jwt.helper";

@Injectable()
export class ProtectedGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwt: JwtHelper) { }

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const isProtected = this.reflector.getAllAndOverride<boolean>(PROTECTED_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request & { id?: number; role?: string }>();
    const response = context.switchToHttp().getResponse<Response>();

    if (!isProtected) {
      request.role = ClientRoles.USER;
      return true;
    }

    const accessHeader = request.headers.authorization;
    const refreshHeader = request.headers.authorization_refresh as string;

    if (!accessHeader || !accessHeader.startsWith("Bearer ")) {
      throw new ConflictException("Bearer access token berilmadi ❌");
    }
    if (!refreshHeader || !refreshHeader.startsWith("Bearer ")) {
      throw new ConflictException("Bearer refresh token berilmadi ❌");
    }

    const accessToken = accessHeader.split(" ")[1];
    const refreshToken = refreshHeader.split(" ")[1];

    const result = this.jwt.verifyTokens({ accessToken, refreshToken });
    console.log(result);
    if ("accessToken" in result && "refreshToken" in result) {
      request.id = result.id;
      request.role = result.role;
      response.setHeader("x-access-token", result.accessToken);
      response.setHeader("x-refresh-token", result.refreshToken);
      return true;
    }

    if ("id" in result && "role" in result) {
      request.id = result.id;
      request.role = result.role;
      return true;
    }

    throw new ConflictException("Tokenlarni tekshirishda xatolik");
  }
}