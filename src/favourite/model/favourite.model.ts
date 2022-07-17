import { AlbumModel } from 'src/album/model/album.model';
import { ArtistModel } from 'src/artist/model/artist.model';
import { TrackModel } from 'src/track/model/track.model';

export interface FavouriteModel {
  tracks: TrackModel[];
  albums: AlbumModel[];
  artists: ArtistModel[];
}
