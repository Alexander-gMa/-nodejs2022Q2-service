import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataBase } from 'src/database/db';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavouriteService {
  constructor(private database: DataBase, private prisma: PrismaService) {}

  findAll() {
    return this.database.favourites;
  }

  addTrack(id: string) {
    const track = this.database.tracks.find((track) => track.id === id);
    if (!track) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: `Track with this ID was not found`,
        error: 'Not Found',
      });
    }
    this.database.favourites.tracks.push(track);
    return track;
  }

  deleteTrack(id: string) {
    return this.prisma.track.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  addAlbum(id: string) {
    const album = this.database.albums.find((album) => album.id === id);
    if (album === undefined) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: `Album with this ID was not found`,
        error: 'Not Found',
      });
    }
    this.database.favourites.albums.push(album);
    return album;
  }

  deleteAlbum(id: string) {
    return this.prisma.album.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  async addArtist(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (artist === undefined) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: `Album with this ID was not found`,
        error: 'Not Found',
      });
    }

    return { statusCode: 201, message: 'Added successfully' };
  }

  deleteArtist(id: string) {
    return null;
  }
}
