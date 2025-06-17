import { Module } from "@nestjs/common";
import { RedisService } from "./redise.service";
@Module({
    providers:[RedisService],
})
export class RediceCustomModule {}