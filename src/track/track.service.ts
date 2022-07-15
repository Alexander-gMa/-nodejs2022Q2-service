import { Injectable, NotFoundException } from '@nestjs/common';
import { DataBase } from 'src/database/db';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private database: DataBase) {}

  create(createTrackDto: CreateTrackDto) {
    const track = new Track({
      id: v4(),
      ...createTrackDto,
    });
    this.database.tracks.push(track);
    return track;
  }

  findAll() {
    return this.database.tracks;
  }

  findOne(id: string) {
    const correctTrack = this.database.tracks.filter(
      (track) => track.id === id,
    );
    if (correctTrack.length < 1)
      throw new NotFoundException({
        statusCode: 404,
        message: `Track with this ID was not found`,
        error: 'Not Found',
      });
    return correctTrack[0];
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const existingTrack = this.findOne(id);
    const index = this.database.tracks.indexOf(existingTrack);
    if (index === -1) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    }
    const updatedTrack = {
      ...this.database.tracks[index],
      ...updateTrackDto,
    };
    this.database.tracks[index] = {
      ...this.database.tracks[index],
      ...updatedTrack,
    };

    return updatedTrack;
  }

  remove(id: string) {
    const existingTrack = this.findOne(id);
    const index = this.database.tracks.indexOf(existingTrack);
    this.database.tracks.splice(index, 1);
  }
}
