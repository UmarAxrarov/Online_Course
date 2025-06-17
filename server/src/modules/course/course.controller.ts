import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseInterceptors, UsePipes } from "@nestjs/common";
import { CourseService } from "./course.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateDto, findAllDto } from "./dtos/crud.dto";
import { Protected } from "src/decorators/protected.decorator";
import { Roles } from "src/decorators/role.decorator";
import { MultipleFilesValidatorPipe } from "src/pipes/files.pipe";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { ClientRoles } from "src/enum/roles.enum";

@Controller("course")
@ApiBearerAuth()
export class CourseController {
    constructor(private service: CourseService) { }
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', example: 'Matematika darsi' },
                content: { type: 'string', example: 'Bu dars Pifagor teoremasi haqida' },
                link_or_number: { type: 'string', example: '998901234567 yoki https://t.me/teacher' },
                categories_names: { type: 'string', example: 'new' },
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                videos: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @Post('create/:id')
    @Protected(true)
    @Roles([ClientRoles.TEACHER,ClientRoles.ADMIN])
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'images', maxCount: 5 },
            { name: 'videos', maxCount: 2 },
        ]),
    )
    @UsePipes(new MultipleFilesValidatorPipe())
    async create(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: CreateDto,
        @UploadedFiles() files: { images?: Express.Multer.File[]; videos?: Express.Multer.File[] },
    ) {
        return await this.service.create({
            param: { teacher_id: id },
            body: {
                title: body.title,
                content: body.content,
                categories_names: body.categories_names,
                link_or_number: body.link_or_number,
                files: {
                    images: files.images || [],
                    videos: files.videos || [],
                },
            },
        });
    }
    @Get()
    @Protected(false)
    @Roles([ClientRoles.USER,ClientRoles.ADMIN,ClientRoles.TEACHER])
    async findAll(@Query() query: findAllDto) {
        return await this.service.findAll({ query: query })
    }
    @Get("/find/:id")
    @Protected(false)
    @Roles(["user"])
    async findOne(@Param('id') id: number) {
        return await this.service.findOne({ param: { id } })
    }
    @Delete("/delete/:id")
    @Protected(false)
    @Roles(["user"])
    async delete(@Param('id') id: number) {
        return await this.service.remove({ param: { id } })
    }
    @Patch('/update/:id')
    @Protected(false)
    @Roles(["user"])
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', example: 'Matematika darsi' },
                content: { type: 'string', example: 'Bu dars Pifagor teoremasi haqida' },
                link_or_number: { type: 'string', example: '998901234567 yoki https://t.me/teacher' },
                categories_names: { type: 'string', example: 'new' },
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                videos: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'images', maxCount: 5 },
            { name: 'videos', maxCount: 2 },
        ]),
    )
    @UsePipes(new MultipleFilesValidatorPipe())
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: CreateDto,
        @UploadedFiles() files: { images?: Express.Multer.File[]; videos?: Express.Multer.File[] },
    ) {
        return await this.service.update({
            param: { id },
            body: {
                title: body.title,
                content: body.content,
                link_or_number: body.link_or_number,
                files: {
                    images: files.images || [],
                    videos: files.videos || [],
                },
            },
        });
    }
}