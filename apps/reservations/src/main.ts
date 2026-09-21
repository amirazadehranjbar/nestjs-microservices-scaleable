import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module.js';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  await app.listen(process.env.port ?? 8888);
}
await bootstrap();
