import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from "morgan";
import { BadRequestException, NotAcceptableException, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  // app.setGlobalPrefix("/api");
  app.enableCors({
    allowedHeaders: ['authorization', 'authorization_refresh', 'Content-Type'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    origin: (reqOrigin: string | undefined, cb) => {
      const allowedOrigins: string[] = process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
        : [];
      if (allowedOrigins.includes('*')) {
        return cb(null, true);
      }
      if (!reqOrigin) {
        return cb(new NotAcceptableException(`Origin yo‘q, so‘rov rad etildi`), false);
      }
      if (allowedOrigins.includes(reqOrigin)) {
        cb(null, true);
      } else {
        cb(new NotAcceptableException(`${reqOrigin} so‘rovga ruxsat yo‘q`), false);
      }
    }
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory(errors) {
      const errorsMsgs: string[] = [];
      errors.forEach((obj) => {
        if (obj.constraints) errorsMsgs.push(Object.values(obj.constraints).join(","));
      })
      throw new BadRequestException(errorsMsgs.join(", "));
    },
  }))
  const config = new DocumentBuilder()
    .setTitle('Imthon example')
    .setDescription('The Imthon API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  if (process.env.NODE_ENV?.trim() === "development") {
    app.use(morgan('tiny'));
    SwaggerModule.setup('docs', app, documentFactory);
  }
  const port = parseInt(process.env.PORT as string) | 3000;
  await app.listen(port, () => console.log("Server", port));
}
bootstrap();
