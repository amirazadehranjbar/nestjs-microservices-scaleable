import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto.js';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
