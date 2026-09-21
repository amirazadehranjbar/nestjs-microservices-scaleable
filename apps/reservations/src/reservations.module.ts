import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common/database/database.module.js';

@Module({ imports: [DatabaseModule] })
export class ReservationsModule {}
