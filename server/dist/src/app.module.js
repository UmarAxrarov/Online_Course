"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const serve_static_1 = require("@nestjs/serve-static");
const node_path_1 = require("node:path");
const HttpException_filter_1 = require("./filters/HttpException.filter");
const prisma_1 = require("./prisma");
const seed_1 = require("./modules/seed");
const auth_module_1 = require("./modules/auth/auth.module");
const jwt_helper_1 = require("./helpers/jwt.helper");
const jwt_1 = require("@nestjs/jwt");
const protected_guard_1 = require("./guards/protected.guard");
const role_guard_1 = require("./guards/role.guard");
const course_module_1 = require("./modules/course/course.module");
const quizz_module_1 = require("./modules/quizz/quizz.module");
const user_module_1 = require("./modules/user/user.module");
const question_module_1 = require("./modules/question/question.module");
const comment_module_1 = require("./modules/comment/comment.module");
const category_module_1 = require("./modules/category/category.module");
const category_language_module_1 = require("./modules/category_l/category_language.module");
const like_module_1 = require("./modules/like.module");
const user_point_module_1 = require("./modules/user_point.module");
const mailer_1 = require("@nestjs-modules/mailer");
const ioredis_1 = require("@nestjs-modules/ioredis");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, node_path_1.join)(process.cwd(), 'uploads'),
                serveRoot: '/uploads',
                serveStaticOptions: {
                    index: false,
                }
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS
                    }
                }
            }),
            ioredis_1.RedisModule.forRoot({
                type: "single",
                options: {
                    host: "localhost",
                    port: 6379
                }
            }),
            prisma_1.PrismaModule,
            seed_1.SeedModule,
            auth_module_1.AuthModule,
            course_module_1.CourseModule,
            quizz_module_1.QuizzModule,
            user_module_1.ClientModule,
            question_module_1.QuestionModule,
            comment_module_1.CommentModule,
            category_module_1.CategoryModule,
            category_language_module_1.LanguageCategoryModule,
            like_module_1.LikeModule,
            user_point_module_1.UPointModule
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: HttpException_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: protected_guard_1.ProtectedGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard
            },
            jwt_helper_1.JwtHelper,
            jwt_1.JwtService
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map