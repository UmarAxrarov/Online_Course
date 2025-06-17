import { LanguageCategoryService } from './cl.service';
import { cDto } from './crud.dto';
export declare class LanguageCategoryController {
    private readonly langCatService;
    constructor(langCatService: LanguageCategoryService);
    create(body: cDto): Promise<{
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
    update(id: number, body: cDto): Promise<{
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
