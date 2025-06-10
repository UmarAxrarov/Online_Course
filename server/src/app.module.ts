import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { PrismaModule } from './prisma';
import { SeedModule } from './modules/seed';
import { AuthModule } from './modules/auth/auth.module';
import { JwtHelper } from './helpers/jwt.helper';
import { JwtService } from '@nestjs/jwt';
import { ProtectedGuard } from './guards/protected.guard';
import { RolesGuard } from './guards/role.guard';
import { CourseModule } from './modules/course/course.module';
import { QuizzModule } from './modules/quizz/quizz.module';
import { ClientModule } from './modules/user/user.module';
import { QuestionModule } from './modules/question/question.module';
import { CommentModule } from './modules/comment/comment.module';
import { CategoryModule } from './modules/category/category.module';
import { LanguageCategoryModule } from './modules/category_l/category_language.module';
import { LikeModule } from './modules/like.module';
import { UPointModule } from './modules/user_point.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    ServeStaticModule.forRoot({
      rootPath:join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false,
      }
    }),
    PrismaModule,
    SeedModule,
    AuthModule,
    CourseModule,
    QuizzModule,
    ClientModule,
    QuestionModule,
    CommentModule,
    CategoryModule,
    LanguageCategoryModule,
    LikeModule,
    UPointModule
  ],
  controllers: [],
  providers: [
    {
      provide:APP_FILTER,
      useClass:HttpExceptionFilter,
    }, 
    {
      provide:APP_GUARD,
      useClass:ProtectedGuard,
    },
    {
      provide:APP_GUARD,
      useClass:RolesGuard
    },
    JwtHelper,
    JwtService
  ],
})
export class AppModule {}
