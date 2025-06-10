import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from "morgan";
import { BadRequestException, NotAcceptableException, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger:false});
  app.setGlobalPrefix("/api");
  app.enableCors({
    allowedHeaders: ['authorization','authorization_refresh'],
    methods: ['GET','POST','PATCH','PUT','DELETE'],
    origin: (reqOrigin:string,cb) => {
      const allowedOrigins:string[] = process.env.CORS_ORIGNS
      ? process.env.CORS_ORIGNS.split(',')
      : ['*']; 
      if(allowedOrigins.includes(reqOrigin) || allowedOrigins.includes('*')) {
        cb(null,reqOrigin)
      } else {
        cb(new NotAcceptableException(`${reqOrigin} sorov ruhsat yoq`))
      }
    }
  })
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    exceptionFactory(errors) {
      const errorsMsgs:string[] = [];
      errors.forEach((obj) => {
        if(obj.constraints) errorsMsgs.push(Object.values(obj.constraints).join(","));
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
  if(process.env.NODE_ENV?.trim() === "development") {  
    app.use(morgan('tiny'));
    SwaggerModule.setup('docs', app, documentFactory);
  } 
  const port = parseInt(process.env.PORT as string) | 3000;
  await app.listen(port,() => console.log("Server",port));
}
bootstrap();
 