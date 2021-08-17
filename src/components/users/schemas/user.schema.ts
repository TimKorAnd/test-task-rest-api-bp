import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserIdTypeEnum } from '../enums/user.id-type.enum';
import { Token } from 'src/components/tokens/schemas/token.schema';

export type UserDocument = User & mongoose.Document;

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'users',
})
export class User {
  /* @Prop({ type: String, unique: true })
  id_phone: string;

  @Prop({ type: String, unique: true })
  id_email: string; */

  @Prop({ type: String, require: true, unique: true })
  id_user: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: Object.values(UserIdTypeEnum), default: null })
  id_type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Token', default: null })
  token_id: Token | null; // is that same?: token_id?: Token 
}

export const UserSchema = SchemaFactory.createForClass(User);