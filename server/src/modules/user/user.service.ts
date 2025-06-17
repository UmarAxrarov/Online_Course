import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { CreateDto, findAllDto } from "./crud.dto";
import { FsHelper } from "src/helpers/fs.helper";
import * as bcrypt from "bcryptjs";
import { RedisService } from "redis/redise.service";
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private fs: FsHelper,private redis:RedisService) { }
    async create(payload: { body: CreateDto }) {
        try {
            const newUser = await this.prisma.client.update({
                where: { email: payload.body.email },
                data: {
                    role: payload.body.role
                }
            })
            return newUser;
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
    async findAll(payload: { query: findAllDto }) {
        const allowedField = ["id", "role"];
        const data = payload.query;
        if (!allowedField.includes(data.sortField)) {
            throw new BadRequestException("sortlas bolmaydi");
        }
        try {
            const users = await this.prisma.client.findMany({
                skip: (data.page - 1) * data.limit,
                take: data.limit,
                orderBy: {
                    [data.sortField]: data.sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc',
                },
            })
            return users;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    async findOne(payload: { param: { id: number } }) {
        const data = payload.param;
        try {
            let user_:any = null;
            user_ = await this.redis.get('users');
            if(user_) {
                console.log("user_");
                
                return JSON.parse(user_);
            }
            console.log(data);
            
            user_ = await this.prisma.client.findFirst({
                where: {
                    id: data.id
                },
                include: {
                    courses: {
                        include: {
                            quizzes:{
                                include:{
                                    questions:true
                                }
                            }
                        }
                    },
                    comments: true,
                    likes: {
                        include: {
                            course:true
                        }
                    },
                    userPoints: true,
                }
            })
            await this.redis.set('users',JSON.stringify(user_),30);
            console.log(user_);
            return user_;
        } catch (error) {
            console.log("buu errro", error)
            throw new BadRequestException(error.message);
        }
    }
    async delete(payload: { param: { id: number } }) {
        const data = payload.param;
        const user = await this.prisma.client.findFirst({ where: { id: data.id } });
        if (!user) {
            throw new NotFoundException("user topilmadi");
        }
        this.fs.removeImage(user.imageUrl)
        try {

            await this.prisma.client.delete({ where: { id: data.id } });
            return "deleted";
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    async update(payload: { param: { id: number }, body: { name: string, password: string, imageUrl: Express.Multer.File } }) {
        const user = await this.prisma.client.findFirst({ where: { id: payload.param.id } });
        if (!user) {
            throw new NotFoundException("user topilmadi");
        }
        const upload = this.fs.uploadsImage(payload.body.imageUrl, user.imageUrl);
        let hashedPassword: string = "";
        if (payload.body.password) {
            hashedPassword = bcrypt.hashSync(payload.body.password);
        }
        try {
            const updatedUser = this.prisma.client.update({
                where: { id: payload.param.id },
                data: {
                    name: payload.body.name ? payload.body.name : user.name,
                    password: hashedPassword ? hashedPassword : user.password,
                    imageUrl: upload,
                }
            })
            return updatedUser;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}