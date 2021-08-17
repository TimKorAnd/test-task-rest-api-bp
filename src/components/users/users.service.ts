import { Injectable } from '@nestjs/common';
import { IAuthUserSignup } from '../auth/interfaces/auth.user-signup.interface';
import { UsersRepository } from './users.repository';
import { UserIdTypeEnum } from './enums/user.id-type.enum';
import { IUserCreate } from './interfaces/user-create.interface';
import { IUser } from './interfaces/user.interface';

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

  async findOne(fieldValuePair: { [key: string]: any }): Promise<IUser> {
    return await this.userRepository.findOne(fieldValuePair);
  }

  async clearAllUsersToken_id() {
    return await this.userRepository.clearAllUsersToken_id()
  }


}


