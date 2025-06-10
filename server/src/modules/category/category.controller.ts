import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Protected } from 'src/decorators/protected.decorator';
import { Roles } from 'src/decorators/role.decorator';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }
    @Protected(false)
    @Roles(['user'])
    @Post("create/:category_id/:course_id")
    create(
        @Param('category_id', ParseIntPipe) categoryId: number,
        @Param('course_id', ParseIntPipe) courseId: number
    ) {
        return this.categoryService.create({
            category_id: categoryId,
            course_id: courseId
        });
    }

    @Protected(false)
    @Roles(['user'])
    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    // @Protected(false)
    // @Roles(['user'])
    // @Get('find/:id')
    // findOne(@Param('id', ParseIntPipe) id: number) {
    //     return this.categoryService.findOne(id);
    // }

    // @Protected(false)
    // @Roles(['user'])
    // @Delete('delete/:id')
    // delete(@Param('id', ParseIntPipe) id: number) {
    //     return this.categoryService.delete(id);
    // }
}
