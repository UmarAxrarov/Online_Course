import { BadRequestException, Controller, Delete, Get, Injectable, Module, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Protected } from "src/decorators/protected.decorator";
import { Roles } from "src/decorators/role.decorator";
import { PrismaService } from "src/prisma";

@Injectable()
class LikeService {
    constructor(private prisma: PrismaService) { }
    async create(client_id: number, course_id: number) {
        const findUser = await this.prisma.client.findUnique({ where: { id: client_id } });
        const findCourse = await this.prisma.course.findUnique({ where: { id: course_id } });
        if (!(findCourse || findUser)) {
            throw new NotFoundException("user yokida curs topilmadi");
        }
        try {
            const newLike = await this.prisma.like.create({ data: { client_id, course_id } })
            let count:number = 0;
            if(newLike) {
                count += 1; 
            }
            await this.prisma.course.update({
                where:{id:course_id},
                data:{
                    like_count: count
                }
            })
            return newLike;
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
    async findAll() {
        try {
            const likes = await this.prisma.like.findMany({ include: { client: true, course: true } });
            return likes;
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
    async delete(course_id: number) {
        try {
            const like = await this.prisma.like.findFirst({ where: { course_id } })
            if (like) {
                await this.prisma.like.delete({ where: { id: like.id } })
                return "deleted";
            }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
@Controller('like')
class likeController {
    constructor(private service: LikeService) { }
    @Post('create/:client_id/:course_id')
    @Protected(false)
    @Roles(["user"])
    async create(@Param('client_id', ParseIntPipe) id: number, @Param('course_id', ParseIntPipe) id2: number) {
        return this.service.create(id, id2);
    }
    @Get()
    @Protected(false)
    @Roles(["user"])
    async findAll() {
        return await this.service.findAll();
    }
    @Delete('delete/:client_id')
    @Protected(false)
    @Roles(["user"])
    async delete(@Param('client_id', ParseIntPipe) id: number) {
        return await this.service.delete(id);
    }
}

@Module({
    controllers: [likeController],
    providers: [LikeService, PrismaService]
})
export class LikeModule { }