import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = new Track({
      id: v4(),
      ...createTrackDto,
    });
    const createdTrack = await this.prisma.track.create({
      data: track,
    });
    return createdTrack;
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const correctTrack = await this.prisma.track.findFirst({ where: { id } });
    if (!correctTrack)
      throw new NotFoundException({
        statusCode: 404,
        message: `Artist with this ID was not found`,
        error: 'Not Found',
      });
    return plainToInstance(Track, correctTrack);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const existingTrack = await this.prisma.track.findFirst({
      where: { id },
    });
    if (!existingTrack) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    }
    return this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });
  }

  async remove(id: string) {
    const existingTrack = await this.prisma.track.findFirst({
      where: { id },
    });
    if (!existingTrack) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    }
    return await this.prisma.track.delete({ where: { id } });
  }
}
