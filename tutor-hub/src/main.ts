import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
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
