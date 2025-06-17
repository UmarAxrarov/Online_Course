import { PrismaService } from 'src/prisma';
export declare class LanguageCategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        uz_name: string;
        ru_name: string;
        ua_name: string;
    }): Promise<{
        id: number;
        uz_name: string;
        ru_name: string;
        ua_name: string;
    }>;
    findAll(): Promise<{
        id: number;
        uz_name: string;
        ru_name: string;
        ua_name: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        uz_name: string;
        ru_name: string;
        ua_name: string;
    }>;
    update(id: number, data: any): Promise<{
        id: number;
        uz_name: string;
        ru_name: string;
        ua_name: string;
    }>;
    delete(id: number): Promise<{
        id: number;
        uz_name: string;
        ru_name: string;
        ua_name: string;
    }>;
}
