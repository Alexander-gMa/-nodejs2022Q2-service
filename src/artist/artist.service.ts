import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = new Artist({
      id: v4(),
      ...createArtistDto,
    });
    const createdArtist = await this.prisma.artist.create({
      data: artist,
    });
    return createdArtist;
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const correctArtist = await this.prisma.artist.findFirst({ where: { id } });
    if (!correctArtist)
      throw new NotFoundException({
        statusCode: 404,
        message: `Artist with this ID was not found`,
        error: 'Not Found',
      });
    return plainToInstance(Artist, correctArtist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const existingArtist = await this.prisma.artist.findFirst({
      where: { id },
    });
    if (!existingArtist) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    }
    if (updateArtistDto === {}) {
      throw new HttpException(`artists field is empty`, HttpStatus.NO_CONTENT);
    }
    return this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
  }

  async remove(id: string) {
    const existingArtist = await this.prisma.artist.findFirst({
      where: { id },
    });
    if (!existingArtist) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    }
    return await this.prisma.artist.delete({ where: { id } });
  }
}
