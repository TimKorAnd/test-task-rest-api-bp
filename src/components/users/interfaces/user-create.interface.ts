import { UserIdTypeEnum } from '../enums/user.id-type.enum';

export interface IUserCreate {
  /* id_phone: string;
  id_email: string; */
  id_user: string;
  password: string;
  id_type: UserIdTypeEnum;
}
