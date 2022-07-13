import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class DataBase {
  users: UserModel[] = [];
}
