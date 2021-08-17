import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { AuthService } from '../auth/auth.service';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TokensModule,
],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AuthService, ],
  exports: [UsersService],
})
export class UsersModule {}
