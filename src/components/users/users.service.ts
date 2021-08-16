import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IAuthUserSignup } from '../auth/interfaces/auth.user-signup.interface';
import { UsersRepository } from '../repository/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdTypeEnum } from './enums/user.id-type.enum';
import { IUserCreate } from './interfaces/user-create.interface';
import { IUser } from './interfaces/user.interface';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
 
  constructor(/* @InjectModel(User.name) private UserModel: Model<IUser>, */
    private readonly userRepository: UsersRepository,
  ) { }

  create(userSignup: IAuthUserSignup) {
    const idType: UserIdTypeEnum = this.getUserIdType(userSignup);
    const userCreate: IUserCreate = {
      id_user: userSignup.id,
      password: userSignup.password,
      id_type: idType,
    }

    return this.userRepository.create(userCreate)
    
  }

  // TODO in helpers or another way for check?
  private isEmail(field: string): boolean {
    return field.includes('@');
  }

  private getUserIdType(userSignup: IAuthUserSignup): UserIdTypeEnum {
    if (this.isEmail(userSignup.id)) {
      return UserIdTypeEnum.EMAIL;
    } 
    return UserIdTypeEnum.PHONE;
  }

  async findOne(fieldValuePair: {[key: string]: string}): Promise<IUser> {
    console.log(fieldValuePair);
    /* const v: string = Object.values(fieldValuePair)[0] as string;
    const value = Types.ObjectId(v);
    console.log(v);
    const key = Object.keys(fieldValuePair)[0] as string;
    console.log({key: value}); */
    return await this.userRepository.findOne(fieldValuePair);
}

  findAll() {
    return `This action returns all users`;
  }

  // findOne(id: string) {
  //   return `This action returns a #${id} user`;
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}


