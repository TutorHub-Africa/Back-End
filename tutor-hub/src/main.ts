import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
=======
import * as dotenv from 'dotenv';
>>>>>>> a95385baadb9a8bc89ae33c376b6bc0b0b6a6ce5

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
  };
  app.enableCors(corsOptions);

  await app.listen(3000);
  // app.enableCors({
  //   origin: 'http://localhost:5173', // URL of your React frontend
  //   credentials: true, // Allow cookies to be sent
  // });
  // app.enableCors();
}
bootstrap();
