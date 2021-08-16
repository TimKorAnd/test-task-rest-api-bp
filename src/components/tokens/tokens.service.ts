import { Injectable } from '@nestjs/common';
import { TokensRepository } from '../repository/tokens.repository';
import { UpdateTokenDto } from './dto/update-token.dto';
import { randomBytes } from 'crypto';
import { Types } from 'mongoose';
import { IToken } from './interfaces/token.interface';
import { ITokenCreate } from './interfaces/token-create.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokensService {

  private static readonly MILISECONDS_IN_MINUTE: number = 60000;
  constructor(
  private readonly tokenRepository: TokensRepository,
  private readonly configService: ConfigService
) { }

  create(_id: Types.ObjectId, tokenLifetimeInMinutes = this.configService.get<number>('TOKEN_LIFETIME_IN_MINUTES')) { 
    // console.log(tokenLifetimeInMinutes);
    const tokenCreate: ITokenCreate = {
      user_id: _id,
      token: randomBytes(64).toString('hex'),
      expireAt: this.getDateWithAddedMinutes(new Date(), tokenLifetimeInMinutes),
    }

    return this.tokenRepository.create(tokenCreate);
  }

  private getDateWithAddedMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * TokensService.MILISECONDS_IN_MINUTE);
}

  findAll() {
    return `This action returns all tokens`;
  }

  findById(id: Types.ObjectId) { // TODO set types
    return this.tokenRepository.findById(id);
  }

  findOne(fieldValuePair) { // TODO set types
    return this.tokenRepository.findOne(fieldValuePair);
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}