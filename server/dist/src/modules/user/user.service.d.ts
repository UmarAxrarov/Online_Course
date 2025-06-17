import { PrismaService } from "src/prisma";
import { CreateDto, findAllDto } from "./crud.dto";
import { FsHelper } from "src/helpers/fs.helper";
import { RedisService } from "redis/redise.service";
export declare class UserService {
    private prisma;
    private fs;
    private redis;
    constructor(prisma: PrismaService, fs: FsHelper, redis: RedisService);
    create(payload: {
        body: CreateDto;
    }): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        imageUrl: string;
        token: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(payload: {
        query: findAllDto;
    }): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        imageUrl: string;
        token: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(payload: {
        param: {
            id: number;
        };
    }): Promise<any>;
    delete(payload: {
        param: {
            id: number;
        };
    }): Promise<string>;
    update(payload: {
        param: {
            id: number;
        };
        body: {
            name: string;
            password: string;
            imageUrl: Express.Multer.File;
        };
    }): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
        imageUrl: string;
        token: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
