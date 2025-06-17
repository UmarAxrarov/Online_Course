import { MailerService } from "@nestjs-modules/mailer";
import { PrismaService } from "src/prisma";
export declare class EmailService {
    private mailerService;
    private prisma;
    constructor(mailerService: MailerService, prisma: PrismaService);
    sendEamil(email: string): Promise<string>;
}
