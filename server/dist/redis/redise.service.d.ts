import { OnModuleDestroy } from "@nestjs/common";
import { Redis } from "ioredis";
export declare class RedisService implements OnModuleDestroy {
    private redis;
    constructor(redis: Redis);
    set(key: string, value: string, expireTime?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<number>;
    onModuleDestroy(): void;
}
