"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const morgan = require("morgan");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: false });
    app.enableCors({
        allowedHeaders: ['authorization', 'authorization_refresh', 'Content-Type'],
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
        origin: (reqOrigin, cb) => {
            const allowedOrigins = process.env.CORS_ORIGINS
                ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
                : [];
            if (allowedOrigins.includes('*')) {
                return cb(null, true);
            }
            if (!reqOrigin) {
                return cb(new common_1.NotAcceptableException(`Origin yo‘q, so‘rov rad etildi`), false);
            }
            if (allowedOrigins.includes(reqOrigin)) {
                cb(null, true);
            }
            else {
                cb(new common_1.NotAcceptableException(`${reqOrigin} so‘rovga ruxsat yo‘q`), false);
            }
        }
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory(errors) {
            const errorsMsgs = [];
            errors.forEach((obj) => {
                if (obj.constraints)
                    errorsMsgs.push(Object.values(obj.constraints).join(","));
            });
            throw new common_1.BadRequestException(errorsMsgs.join(", "));
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Imthon example')
        .setDescription('The Imthon API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    if (process.env.NODE_ENV?.trim() === "development") {
        app.use(morgan('tiny'));
        swagger_1.SwaggerModule.setup('docs', app, documentFactory);
    }
    const port = parseInt(process.env.PORT) | 3000;
    await app.listen(port, () => console.log("Server", port));
}
bootstrap();
//# sourceMappingURL=main.js.map