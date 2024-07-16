import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  // app.enableCors({
  //   origin: 'http://localhost:5173', // URL of your React frontend
  //   credentials: true, // Allow cookies to be sent
  // });
  // app.enableCors();
}
bootstrap();
