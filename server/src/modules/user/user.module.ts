import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { FsHelper } from "src/helpers/fs.helper";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { RedisService } from "redis/redise.service";

@Module({
    controllers: [UserController],
    exports: [],
    imports: [],
    providers: [UserService,PrismaService,FsHelper,RedisService],
})
export class ClientModule {}