import { User } from "src/components/users/schemas/user.schema";
import { Types } from 'mongoose';
//import * as mongoose from 'mongoose';


export class ITokenCreate {
//    user_id: mongoose.Schema.Types.ObjectId;
    user_id: Types.ObjectId;

    token: string;
    expireAt: Date;
}
