import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { IUserCreate } from './interfaces/user-create.interface';
import { IUser } from './interfaces/user.interface';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<IUser>) { }

  create(user: IUserCreate) {
    return this.userModel.create(user);
  }

  findAll() {
    return `This action returns all repository`;
  }

  findOne(fieldValuePair: {[key: string]: any}): Promise<IUser> {
    return this.userModel.findOne(fieldValuePair).exec();
  }

  /* update(id: number, updateRepositoryDto: UpdateRepositoryDto) {
    return `This action updates a #${id} repository`;
  } */

  remove(id: number) {
    return `This action removes a #${id} repository`;
  }

}
