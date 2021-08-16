import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { User } from 'src/components/users/schemas/user.schema';

export type TokenDocument = Token & mongoose.Document;

@Schema({
    versionKey: false,
    timestamps: true,
    collection: 'tokens',
  })
export class Token {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user_id: User;

    @Prop({ type: String, required: true })
    token: string;

    @Prop({ type: Date, required: true }) // TODO use created & modified ?
    expireAt: Date;

}

const TokenSchema = SchemaFactory.createForClass(Token);
TokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
export { TokenSchema };