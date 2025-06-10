import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseInterceptors, UsePipes } from "@nestjs/common";
import { QuizzService } from "./quizz.service";
import { CreateDto, findAllDto } from "./dtos/crud.dto";
import { Protected } from "src/decorators/protected.decorator";
import { Roles } from "src/decorators/role.decorator";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { MultipleFilesValidatorPipe } from "src/pipes/files.pipe";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller("quizz")
export class QuizzController {
    constructor(private service: QuizzService) { }
    @Post('create/:id')
    @Protected(false)
    @Roles(['user'])
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', example: 'Matematika darsi' },
                description: { type: 'string', example: 'Bu dars Pifagor teoremasi haqida' },
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                audios: {
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
            { name: "images", maxCount: 5 },
            { name: "audios", maxCount: 2 }
        ])
    )
    @UsePipes(new MultipleFilesValidatorPipe())
    async create(
        @Param('id', ParseIntPipe) id: number,
        @Body() Body: CreateDto, @UploadedFiles() files: { images?: Express.Multer.File[], audios?: Express.Multer.File[] }
    ) {
        return await this.service.create({
            param: { course_id: id },
            body: {
                title: Body.title,
                description: Body.description,
                files: {
                    images: files.images || [],
                    audios: files.audios || []
                }
            }
        })
    }
    @Get()
    @Protected(false)
    @Roles(['user'])
    async findAll(@Query() query: findAllDto) {
        return await this.service.findAll({ query })
    }
    @Get("/find/:id")
    @Protected(false)
    @Roles(['user'])
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.findOne({ param: { id } })
    }
    @Delete("/delete/:id")
    @Protected(false)
    @Roles(['user'])
    async dleete(@Param('id', ParseIntPipe) id: number) {
        return await this.service.delete({ param: { id } })
    }
    @Patch('/update/:id')
    @Protected(false)
    @Roles(['user'])
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', example: 'Matematika darsi' },
                description: { type: 'string', example: 'Bu dars Pifagor teoremasi haqida' },
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                audios: {
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
            { name: "images", maxCount: 5 },
            { name: "audios", maxCount: 2 }
        ])
    )
    @UsePipes(new MultipleFilesValidatorPipe())
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() Body: CreateDto, @UploadedFiles() files: { images?: Express.Multer.File[], audios?: Express.Multer.File[] }
    ) {
        return await this.service.update({
            param: { id },
            body: {
                title: Body.title,
                description: Body.description,
                files: {
                    images: files.images || [],
                    audios: files.audios || []
                }
            }
        })
    }
}