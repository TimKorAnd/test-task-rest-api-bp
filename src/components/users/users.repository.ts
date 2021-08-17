import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { IUserCreate } from './interfaces/user-create.interface';
import { IUser } from './interfaces/user.interface';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<IUser>) { }

  async create(user: IUserCreate) {
    return await this.userModel.create(user);
  }

  async findOne(fieldValuePair: {[key: string]: any}): Promise<IUser> {
    return await this.userModel.findOne(fieldValuePair).exec();
  }

  async clearAllUsersToken_id() {
    return await this.userModel.updateMany({}, { token_id: null });
  }

}
