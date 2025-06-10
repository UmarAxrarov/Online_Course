import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx:HttpArgumentsHost = host.switchToHttp()
        const response:Response = ctx.getResponse<Response>();
        response.status(exception.getStatus()).send({
            message:exception.message,
            name:exception.name,
            statusCode:exception.getStatus()
        })
    }
}