import { Injectable } from '@nestjs/common';
import { TokensRepository } from './tokens.repository';
import { randomBytes } from 'crypto';
import { FilterQuery, Types } from 'mongoose';
import { IToken } from './interfaces/token.interface';
import { ITokenCreate } from './interfaces/token-create.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokensService {

  private static readonly MILISECONDS_IN_MINUTE: number = 60000;
  constructor(
  private readonly tokensRepository: TokensRepository,
  private readonly configService: ConfigService,
) { }

  create(_id: Types.ObjectId, tokenLifetimeInMinutes = this.configService.get<number>('TOKEN_LIFETIME_IN_MINUTES')) { 
    const tokenCreate: ITokenCreate = {
      user_id: _id,
      token: randomBytes(64).toString('hex'),
      expireAt: this.getDateWithAddedMinutes(new Date(), tokenLifetimeInMinutes),
    }

    return this.tokensRepository.create(tokenCreate);
  }

  public getDateWithAddedMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * TokensService.MILISECONDS_IN_MINUTE);
}

  findAll() {
    return `This action returns all tokens`;
  }

  findById(id: Types.ObjectId) { // TODO set types
    return this.tokensRepository.findById(id);
  }

  findOne(fieldValuePair: { token: any; }) { // TODO set types
    return this.tokensRepository.findOne(fieldValuePair);
  }

  async deleteOne(arg: FilterQuery<IToken>) { // auto inferred type is bad.(
    await this.tokensRepository.deleteOne(arg);
  }

  async deleteMany(arg: FilterQuery<IToken>) {
    await this.tokensRepository.deleteMany(arg);
  }
}
