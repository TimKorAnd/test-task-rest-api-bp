import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Schema } from 'mongoose';
import { ITokenCreate } from '../tokens/interfaces/token-create.interface';
import { IToken } from '../tokens/interfaces/token.interface';
import { Token } from '../tokens/schemas/token.schema';

@Injectable()
export class TokensRepository {
  constructor(@InjectModel(Token.name) private tokenModel: Model<IToken>) { }

  create(token: ITokenCreate) {
    return this.tokenModel.create(token);
  }

  findAll() {
    return `This action returns all repository`;
  }

  findById(id: Types.ObjectId) { // TODO remove Schema.Types form everywhere except Schema
    return this.tokenModel.findById(id).exec();
  }

  findOne(fieldValuePair) {
    return this.tokenModel.findOne(fieldValuePair).exec();
  }

  /* update(id: number, updateRepositoryDto: UpdateRepositoryDto) {
    return `This action updates a #${id} repository`;
  } */

  remove(id: number) {
    return `This action removes a #${id} repository`;
  }
}
