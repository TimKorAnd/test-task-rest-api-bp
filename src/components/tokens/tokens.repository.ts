import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Schema, FilterQuery } from 'mongoose';
import { ITokenCreate } from './interfaces/token-create.interface';
import { IToken } from './interfaces/token.interface';
import { Token } from './schemas/token.schema';

@Injectable()
export class TokensRepository {
  constructor(@InjectModel(Token.name) private tokenModel: Model<IToken>) { }

  async create(token: ITokenCreate) {
    return await this.tokenModel.create(token);
  }

  async findById(id: Types.ObjectId) {
    return await this.tokenModel.findById(id).exec();
  }

  async findOne(fieldValuePair: FilterQuery<IToken>) {
    return await this.tokenModel.findOne(fieldValuePair).exec();
  }

  async deleteOne(arg: FilterQuery<IToken>): Promise<any> { // TODO returned type
    return await this.tokenModel.deleteOne(arg);
  }

  async deleteMany(arg: FilterQuery<IToken>) {
    return await this.tokenModel.deleteMany(arg);
  }
}
