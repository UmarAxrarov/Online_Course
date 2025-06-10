import { Controller, Get, Post, Delete, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { LanguageCategoryService } from './cl.service';
import { cDto } from './crud.dto';
import { Protected } from 'src/decorators/protected.decorator';
import { Roles } from 'src/decorators/role.decorator';

@Controller('language-category')
export class LanguageCategoryController {
    constructor(private readonly langCatService: LanguageCategoryService) { }
    @Protected(false)
    @Roles(['user'])
    @Post()
    create(@Body() body: cDto) {
        return this.langCatService.create(body);
    }
    @Protected(false)
    @Roles(['user'])
    @Get()
    findAll() {
        return this.langCatService.findAll();
    }
    @Protected(false)
    @Roles(['user'])
    @Get('find/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.langCatService.findOne(id);
    }
    @Protected(false)
    @Roles(['user'])
    @Patch('update/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: cDto) {
        return this.langCatService.update(id, body);
    }
    @Protected(false)
    @Roles(['user'])
    @Delete('delete/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.langCatService.delete(id);
    }
}
