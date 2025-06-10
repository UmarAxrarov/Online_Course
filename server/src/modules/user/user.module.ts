import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { FsHelper } from "src/helpers/fs.helper";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    controllers: [UserController],
    exports: [],
    imports: [],
    providers: [UserService,PrismaService,FsHelper],
})
export class ClientModule {}