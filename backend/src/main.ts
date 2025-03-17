import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Asegurar que las respuestas usen UTF-8
  app.use((req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    next();
  });

  await app.listen(3000);
}
void bootstrap();
