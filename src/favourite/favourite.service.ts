import { Injectable, NotFoundException } from '@nestjs/common';
import { DataBase } from 'src/database/db';

@Injectable()
export class FavouriteService {
  constructor(private database: DataBase) {}

  findAll() {
    return this.database.favourites;
  }

  addTrack(id: string) {
    const track = this.database.tracks.find((track) => track.id === id);
    if (track === undefined) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Track with this ID was not found`,
        error: 'Not Found',
      });
    }
    this.database.favourites.tracks.push(track);
    return track;
  }

  deleteTrack(id: string) {
    const correctTrack = this.database.favourites.tracks.filter(
      (track) => track.id === id,
    );
    if (correctTrack.length < 1)
      throw new NotFoundException({
        statusCode: 404,
        message: `Artist with this ID was not found`,
        error: 'Not Found',
      });
    const index = this.database.favourites.tracks.indexOf(correctTrack[0]);
    this.database.favourites.tracks.splice(index, 1);
  }

  addAlbum(id: string) {
    const album = this.database.albums.find((album) => album.id === id);
    if (album === undefined) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Track with this ID was not found`,
        error: 'Not Found',
      });
    }
    this.database.favourites.albums.push(album);
    return album;
  }

  deleteAlbum(id: string) {
    const correctAlbum = this.database.favourites.albums.filter(
      (album) => album.id === id,
    );
    if (correctAlbum.length < 1)
      throw new NotFoundException({
        statusCode: 404,
        message: `Album with this ID was not found`,
        error: 'Not Found',
      });
    const index = this.database.favourites.albums.indexOf(correctAlbum[0]);
    this.database.favourites.albums.splice(index, 1);
  }

  addArtist(id: string) {
    const artist = this.database.artists.find((artist) => artist.id === id);
    if (artist === undefined) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Artist with this ID was not found`,
        error: 'Not Found',
      });
    }
    this.database.favourites.artists.push(artist);
    return artist;
  }

  deleteArtist(id: string) {
    const correctArtist = this.database.favourites.artists.filter(
      (artist) => artist.id === id,
    );
    if (correctArtist.length < 1)
      throw new NotFoundException({
        statusCode: 404,
        message: `Album with this ID was not found`,
        error: 'Not Found',
      });
    const index = this.database.favourites.artists.indexOf(correctArtist[0]);
    this.database.favourites.artists.splice(index, 1);
  }
}
