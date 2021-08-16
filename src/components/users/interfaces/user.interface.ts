import { Types, Document } from 'mongoose';
import { UserIdTypeEnum } from '../enums/user.id-type.enum';

export interface IUser extends Document {
  _id: Types.ObjectId;
  id_user: string;
  password: string;
  id_type: UserIdTypeEnum;
  token_id: Types.ObjectId;
}
