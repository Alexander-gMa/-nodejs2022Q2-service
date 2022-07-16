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
}
