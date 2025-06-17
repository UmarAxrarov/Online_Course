import { CanActivate, ExecutionContext, Injectable, NotAcceptableException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { ClientRoles } from "src/enum/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector:Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride<ClientRoles[]>(ROLES_KEY,[context.getClass(),context.getHandler()]);
        const request = context.switchToHttp().getRequest();
        console.log(request.role);
        
        if(!roles.includes(request.role)) {
            throw new NotAcceptableException("ruhsat yoq");
        }
        
        return true;
    }
}