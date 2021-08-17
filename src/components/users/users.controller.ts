import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { TokenAuthGuard } from './guards/token-auth.guard';
import { TokensService } from '../tokens/tokens.service';
import { IUser } from './interfaces/user.interface';
import { Types } from 'mongoose';
import * as tcpPing from 'tcp-ping';

@Controller()
@UseGuards(TokenAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService
  ) { }

  @Get('info')
  info(@Request() req) {
    return {
      id: req.user.id_user,
      id_type: req.user.id_type,
    };
  }

  @Get('logout')
  async logout(@Request() req) {
    const user = req.user as IUser;
    const tokenIdForRemove: (Types.ObjectId | null) = user.token_id;
    user.token_id = null;
    await user.save();
    await this.tokensService.deleteOne({ _id: tokenIdForRemove });

    return 'user is logout'; // TODO what should returned?
  }

  @Get('logout/all')
  async logoutAll(): Promise<string> {
    await this.usersService.clearAllUsersToken_id();
    await this.tokensService.deleteMany({});
    return 'all are logout'; // TODO what should returned?
  }

  @Get('latency')
  async latency() {
    tcpPing.probe('142.250.203.132', 80, function (err, available) {
    });
    const result = await new Promise((resolve) => tcpPing.ping({ address: '142.250.203.132' }, async function (err, data) {
      resolve(data);
    }));
    return {
      latency: {
        min: result['min'],
        avg: result['avg'],
        max: result['max'],
      }
    };
  }

}
