import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { PrismaService } from "src/prisma";

@Module({
    providers:[SeedService,PrismaService]
})
export class SeedModule {}