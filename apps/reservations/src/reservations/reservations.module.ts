import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service.js';
import { ReservationsController } from './reservations.controller.js';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
