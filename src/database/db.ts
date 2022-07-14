import { Injectable } from '@nestjs/common';
import { ArtistModel } from 'src/artist/model/artist.model';
import { UserModel } from 'src/user/model/user.model';

@Injectable()
export class DataBase {
  users: UserModel[] = [];
  artists: ArtistModel[] = [];
}
