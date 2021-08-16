import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import { TokensRepository } from './tokens.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])],
  controllers: [TokensController],
  providers: [TokensService, TokensRepository],
  exports: [TokensService],
})
export class TokensModule {}
