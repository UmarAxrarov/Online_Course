import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Query, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { Protected } from "src/decorators/protected.decorator";
import { Roles } from "src/decorators/role.decorator";
import { CreateDto, findAllDto, UpdateDto } from "./crud.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes } from "@nestjs/swagger";
import { ClientRoles } from "src/enum/roles.enum";

@Controller("user")
export class UserController {
    constructor(private service: UserService) { }
    @Post('create')
    @Protected(false)
    @Roles(['user'])
    async create(@Body() body: CreateDto) {
        return await this.service.create({
            body: {
                email: body.email,
                role: body.role
            }
        })
    }
    @Get()
    @Protected(false)
    @Roles(['user'])
    async findAll(@Query() q: findAllDto) {
        return this.service.findAll({ query: q })
    }
    @Get('me')
    @Protected(true)
    @Roles([ClientRoles.USER, ClientRoles.TEACHER, ClientRoles.ADMIN])
    async getMyProfile(@Req() req: Request & { id: number }) {
        console.log(req.id);
        
        return this.service.findOne({ param: { id: req.id } });
    }
    @Delete("delete/:id")
    @Protected(false)
    @Roles(['user'])
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete({ param: { id } })
    }
    @Post('update/:id')
    @Protected(false)
    @Roles(['user'])
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('imageUrl'))
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateDto, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 10_000_000 }),
                new FileTypeValidator({ fileType: 'image/jpeg' })
            ],
        })) file: Express.Multer.File
    ) {
        return await this.service.update({
            param: { id },
            body: {
                name: body.name || "",
                password: body.password || "",
                imageUrl: file || ""
            }
        })
    }
} 