import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataBase } from 'src/database/db';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavouriteService {
  completeMessage: any;
  constructor(private database: DataBase, private prisma: PrismaService) {
    this.completeMessage = {
      statusCode: 201,
      message: 'Added successfully',
    };
  }

  findAll() {
    return this.database.favourites;
  }
  async addTrack(id: string) {
    try {
      await this.prisma.track.findFirst({ where: { id } });
      const favorites = await this.prisma.favorite.findMany();
      const createdTrack = await this.prisma.favorite.create({ data: {} });
      if (!favorites) {
        await this.prisma.track.update({
          where: { id },
          data: { favoriteId: createdTrack.id },
        });
      } else {
        await this.prisma.track.update({
          where: { id },
          data: { favoriteId: favorites[0].id },
        });
      }

      return this.completeMessage;
    } catch (error) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: `Track with this ID was not found`,
        error: 'Not Found',
      });
    }
  }

  deleteTrack(id: string) {
    return this.prisma.track.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  async addAlbum(id: string) {
    try {
      await this.prisma.album.findFirst({ where: { id } });
      const favorites = await this.prisma.favorite.findMany();
      const createdAlbum = await this.prisma.favorite.create({ data: {} });
      !favorites
        ? await this.prisma.album.update({
            where: { id },
            data: { favoriteId: createdAlbum.id },
          })
        : await this.prisma.album.update({
            where: { id },
            data: { favoriteId: favorites[0].id },
          });

      return this.completeMessage;
    } catch (error) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: `Track with this ID was not found`,
        error: 'Not Found',
      });
    }
  }

  deleteAlbum(id: string) {
    return this.prisma.album.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  async addArtist(id: string) {
    try {
      await this.prisma.artist.findFirst({ where: { id } });
      const favorites = await this.prisma.favorite.findMany();
      const createdArtist = await this.prisma.favorite.create({ data: {} });
      !favorites
        ? await this.prisma.artist.update({
            where: { id },
            data: { favoriteId: createdArtist.id },
          })
        : await this.prisma.artist.update({
            where: { id },
            data: { favoriteId: favorites[0].id },
          });

      return this.completeMessage;
    } catch (error) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: `Track with this ID was not found`,
        error: 'Not Found',
      });
    }
  }

  deleteArtist(id: string) {
    return this.prisma.artist.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }
}
