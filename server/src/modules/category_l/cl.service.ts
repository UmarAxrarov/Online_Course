import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class LanguageCategoryService {
    constructor(private prisma: PrismaService) { }

    async create(data: { uz_name: string; ru_name: string; ua_name: string }) {
        try {
            return await this.prisma.category.create({ data:{uz_name: data.uz_name,ru_name:data.ru_name,ua_name:data.ua_name } });
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async findAll() {
        return this.prisma.category.findMany({});
    }

    async findOne(id: number) {
        const langCat = await this.prisma.category.findUnique({where: { id }});
        if (!langCat) throw new NotFoundException('Language category not found');
        return langCat;
    }

    async update(id: number, data: any) {
        try {
            return await this.prisma.category.update({
                where: { id },
                data,
            });
        } catch {
            throw new NotFoundException('Language category not found');
        }
    }

    async delete(id: number) {
        try {
            return await this.prisma.category.delete({ where: { id } });
        } catch {
            throw new NotFoundException('Language category not found');
        }
    }
}
