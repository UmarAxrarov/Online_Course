import { Module } from "@nestjs/common";
import { CourseService } from "./course.service";
import { FsHelper } from "src/helpers/fs.helper";
import { PrismaService } from "src/prisma";
import { CourseController } from "./course.controller";

@Module({
    imports:[],
    exports:[],
    controllers:[CourseController],
    providers:[CourseService,FsHelper,PrismaService]
})
export class CourseModule {}