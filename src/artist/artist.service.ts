import { Injectable, NotFoundException } from '@nestjs/common';
import { DataBase } from 'src/database/db';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private database: DataBase) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist({
      id: v4(),
      ...createArtistDto,
    });
    this.database.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.database.artists;
  }

  findOne(id: string) {
    const correctArtist = this.database.artists.filter(
      (user) => user.id === id,
    );
    if (correctArtist.length < 1)
      throw new NotFoundException({
        statusCode: 404,
        message: `Artist with this ID was not found`,
        error: 'Not Found',
      });
    return correctArtist[0];
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const existingArtist = this.findOne(id);
    const index = this.database.artists.indexOf(existingArtist);
    if (index === -1) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    }
    const updatedArtist = {
      ...this.database.artists[index],
      ...updateArtistDto,
    };
    this.database.artists[index] = {
      ...this.database.artists[index],
      ...updatedArtist,
    };

    return updatedArtist;
  }

  remove(id: string) {
    const existingArtist = this.findOne(id);
    const index = this.database.artists.indexOf(existingArtist);
    this.database.artists.splice(index, 1);
  }
}
