import { Module } from "@nestjs/common";
import { QuizzService } from "./quizz.service";
import { PrismaService } from "src/prisma";
import { FsHelper } from "src/helpers/fs.helper";
import { QuizzController } from "./quizz.controller";

@Module({
    controllers: [QuizzController],
    exports: [],
    imports: [],
    providers: [QuizzService,PrismaService,FsHelper],
})
export class QuizzModule {}