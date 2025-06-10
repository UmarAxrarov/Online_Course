import { BadRequestException, Body, Controller, Delete, Get, Injectable, Module, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Protected } from "src/decorators/protected.decorator";
import { Roles } from "src/decorators/role.decorator";
import { PrismaService } from "src/prisma";

@Injectable()
class UPointService {
    constructor(private prisma: PrismaService) { }
    async create(client_id: number,point_count:number) {
        const findUser = await this.prisma.client.findUnique({ where: { id: client_id } });
        if (!findUser) {
            throw new NotFoundException("user topilmadi");
        }
        try {
            const po = await this.prisma.userPoint.create({ data: { user_id:client_id,points:point_count } })
            return po
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
    async findAll() {
        try {
            const likes = await this.prisma.userPoint.findMany({ include: { user:true } });
            return likes;
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
    async delete(id: number) {
        try {
            const like = await this.prisma.userPoint.findFirst({ where: { user_id:id } })
            if (like) {
                await this.prisma.userPoint.delete({ where: { id: like.id } })
                return "deleted";
            }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
@Controller('userpoint')
class UPointController {
    constructor(private service: UPointService) { }
    @Post('create/:client_id')
    @Protected(false)
    @Roles(["user"])
    async create(@Param('client_id', ParseIntPipe) id: number,@Body() body:{userpoint:number}) {
        return this.service.create(id, body.userpoint);
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
    controllers: [UPointController],
    providers: [UPointService, PrismaService]
})
export class UPointModule { }