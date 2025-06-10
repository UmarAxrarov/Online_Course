import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }

    async create(payload:{category_id:number,course_id:number}) {
        try {
            return await this.prisma.categoryCourse.create({ data: {categoryId:payload.category_id,courseId:payload.course_id} });
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
    
    async findAll() {
        try {            
            const categories = await this.prisma.categoryCourse.findMany({
                include: {
                    category:true,
                    course:true
                },
            });
            return categories
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }


    // async findOne(id: number) {
    //     const category = await this.prisma.category.findUnique({
    //         where: { id },
    //         include: { language: true },
    //     });
    //     if (!category) throw new NotFoundException('Category not found');
    //     return category;
    // }

    // async delete(id: number) {
    //     try {
    //         return await this.prisma.category.delete({ where: { id } });
    //     } catch {
    //         throw new NotFoundException('Category not found');
    //     }
    // }
}
