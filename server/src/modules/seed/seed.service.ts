import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import * as bcrypt from "bcryptjs";
import * as crypto from "node:crypto";
@Injectable()
export class SeedService implements OnModuleInit {
    constructor(private readonly prismaService: PrismaService) {}
    async #_seed() {
        const findClient = await this.prismaService.client.findFirst({
            where:{
                email: "axrarovumar6@gmail.com"
            }
        })
        if(!findClient) {
            const hashedPassword = bcrypt.hashSync("umar0694");
            const resetPasswordToken = crypto.randomBytes(32).toString("hex");
            await this.prismaService.client.create({
                data: {
                    name: "Umar",
                    email: "axrarovumar6@gmail.com",
                    password: hashedPassword,
                    role: "admin",
                    imageUrl: "default-user-icon.png",
                    token: resetPasswordToken,
                }
            }) 
            console.log("Default admin created ✅");
        }
    }
    async onModuleInit() {
        await this.#_seed();
    }
}