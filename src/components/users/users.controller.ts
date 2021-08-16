import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenAuthGuard } from './guards/token-auth.guard';
import { TokensService } from '../tokens/tokens.service';

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
  logout(@Request() req) {
    console.log('current user');
    const user = req.user;
    user.token_id = null;
    user.save();
    
    return 'current user is logout'; // TODO what return?
  }

  @Get('logout/all')
  logoutAll() {
    this.tokensService.deleteMany({});
    console.log('all');
    return 'all';

  }

  /*  @Get()
   findAll() {
     return this.usersService.findAll();
   }
 
   @Get(':id')
   findOne(@Param('id') id: string) {
     return this.usersService.findOne(+id);
   }
 
   @Patch(':id')
   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
     return this.usersService.update(+id, updateUserDto);
   }
 
   @Delete(':id')
   remove(@Param('id') id: string) {
     return this.usersService.remove(+id);
   } */
}
