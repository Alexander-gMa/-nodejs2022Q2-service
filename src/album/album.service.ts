import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = new Album({
      id: v4(),
      ...createAlbumDto,
    });
    const createdAlbum = await this.prisma.album.create({
      data: album,
    });
    return createdAlbum;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const correctAlbum = await this.prisma.album.findFirst({ where: { id } });
    if (!correctAlbum)
      throw new NotFoundException({
        statusCode: 404,
        message: `Artist with this ID was not found`,
        error: 'Not Found',
      });
    return plainToInstance(Album, correctAlbum);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const existingAlbum = await this.prisma.album.findFirst({
      where: { id },
    });
    if (!existingAlbum) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    }
    if (updateAlbumDto === {}) {
      throw new HttpException(`artists field is empty`, HttpStatus.NO_CONTENT);
    }
    return this.prisma.album.update({
      where: { id },
      data: { ...updateAlbumDto },
    });
  }

  async remove(id: string) {
    const existingAlbum = await this.prisma.album.findFirst({
      where: { id },
    });
    if (!existingAlbum) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    }
    return await this.prisma.album.delete({ where: { id } });
  }
}
