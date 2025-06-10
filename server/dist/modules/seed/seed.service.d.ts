import { OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/prisma";
export declare class SeedService implements OnModuleInit {
    #private;
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    onModuleInit(): Promise<void>;
}
