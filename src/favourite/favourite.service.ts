import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataBase } from 'src/database/db';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavouriteService {
  constructor(private database: DataBase, private prisma: PrismaService) {}

  findAll() {
    return this.database.favourites;
  }
  async addTrack(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    const favorites = await this.prisma.favorite.findMany();
    if (!track) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: `Track with this ID was not found`,
        error: 'Not Found',
      });
    }
    const createdTrack = await this.prisma.favorite.create({ data: track });
    !favorites
      ? await this.prisma.track.update({
          where: { id },
          data: { favoriteId: createdTrack.id },
        })
      : await this.prisma.track.update({
          where: { id },
          data: { favoriteId: favorites[0].id },
        });

    return { statusCode: 201, message: 'Added successfully' };
  }

  deleteTrack(id: string) {
    return this.prisma.track.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  async addAlbum(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id } });
    const favorites = await this.prisma.favorite.findMany();
    const createdAlbum = await this.prisma.favorite.create({ data: {} });
    if (!album) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: `Track with this ID was not found`,
        error: 'Not Found',
      });
    }
    !favorites
      ? await this.prisma.album.update({
          where: { id },
          data: { favoriteId: createdAlbum.id },
        })
      : await this.prisma.album.update({
          where: { id },
          data: { favoriteId: favorites[0].id },
        });

    return { statusCode: 201, message: 'Added successfully' };
  }

  deleteAlbum(id: string) {
    return this.prisma.album.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  async addArtist(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    const favorites = await this.prisma.favorite.findMany();
    const createdArtist = await this.prisma.favorite.create({ data: {} });
    if (!artist) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: `Track with this ID was not found`,
        error: 'Not Found',
      });
    }
    !favorites
      ? await this.prisma.artist.update({
          where: { id },
          data: { favoriteId: createdArtist.id },
        })
      : await this.prisma.artist.update({
          where: { id },
          data: { favoriteId: favorites[0].id },
        });

    return { statusCode: 201, message: 'Added successfully' };
  }

  deleteArtist(id: string) {
    return this.prisma.artist.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }
}
