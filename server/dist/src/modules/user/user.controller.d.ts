import { UserService } from "./user.service";
import { CreateDto, findAllDto, UpdateDto } from "./crud.dto";
export declare class UserController {
    private service;
    constructor(service: UserService);
    create(body: CreateDto): Promise<{
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
    findAll(q: findAllDto): Promise<{
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
    getMyProfile(req: Request & {
        id: number;
    }): Promise<any>;
    delete(id: number): Promise<string>;
    update(id: number, body: UpdateDto, file: Express.Multer.File): Promise<{
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
