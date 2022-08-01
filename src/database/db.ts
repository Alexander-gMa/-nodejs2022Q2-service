import { Injectable } from '@nestjs/common';
import { AlbumModel } from 'src/album/model/album.model';
import { ArtistModel } from 'src/artist/model/artist.model';
import { FavouriteModel } from 'src/favourite/model/favourite.model';
import { TrackModel } from 'src/track/model/track.model';
import { UserModel } from 'src/user/model/user.model';

@Injectable()
export class DataBase {
  users: UserModel[] = [];
  artists: ArtistModel[] = [];
  tracks: TrackModel[] = [];
  albums: AlbumModel[] = [];
  favourites: FavouriteModel = {
    tracks: [],
    albums: [],
    artists: [],
  };
}
