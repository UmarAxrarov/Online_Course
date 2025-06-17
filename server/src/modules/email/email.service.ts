import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma";
@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService,private prisma:PrismaService) { }
    async sendEamil(email: string) {
        const findClient = await this.prisma.client.findFirst({where:{email}});
        if(!findClient) {
            throw new NotFoundException(`${email} topilmadi`);
        }
        this.mailerService.sendMail({
            to: email,
            from: process.env.GMAIL_USER,
            subject: "Forgot password",
            text: "yuborilgan shifirni yozing",
            html:`<b>${findClient.token}</b>`  
        })
        return "emailingizni tekshiring";
    }
}
