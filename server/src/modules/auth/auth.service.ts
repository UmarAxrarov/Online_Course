import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import * as bcrypt from "bcryptjs";
import * as crypto from "node:crypto";
import { LoginDto, RegisterDto } from "./dtos/register-login.dto";
import { JwtHelper } from "src/helpers/jwt.helper";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtHelper,
  ) {}
  async registerClient(dto: RegisterDto) {
    const exists = await this.prisma.client.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException("User already exists ❌");

    const hashed = bcrypt.hashSync(dto.password, 10);
    const resetToken = crypto.randomBytes(32).toString("hex");

    return this.prisma.client.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        imageUrl: "default-user-icon.png",
        role: "user",
        token: resetToken,
      },
    });
  }
  async loginClient(dto: LoginDto) {
    const client = await this.prisma.client.findUnique({ where: { email: dto.email } });
    if (!client) throw new NotFoundException("User not found ❌");

    const ok = bcrypt.compareSync(dto.password, client.password);
    if (!ok) throw new ConflictException("Invalid password ❌");

    const tokens = this.jwt.signTokens({ id: client.id, role: client.role as string });
    return { client, tokens };
  }
}