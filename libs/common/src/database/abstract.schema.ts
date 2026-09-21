import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export abstract class AbstractDocument {
  // WHY: every concrete schema (User, Order, ...) needs a consistent
  // _id type — this base class is the single place that defines it
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
