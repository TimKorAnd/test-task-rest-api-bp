import { Types, Document } from 'mongoose';
import { User } from 'src/components/users/schemas/user.schema';

export class IToken extends Document {
    _id: Types.ObjectId;
    user_id: Types.ObjectId;
    token: string;
    expireAt: Date;
}
