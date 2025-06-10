import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { LanguageCategoryController } from './cl.controller';
import { LanguageCategoryService } from './cl.service';

@Module({
    controllers: [LanguageCategoryController],
    providers: [LanguageCategoryService, PrismaService],
})
export class LanguageCategoryModule { }
