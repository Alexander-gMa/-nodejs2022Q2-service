import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      (artist) => artist.id === id,
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
    if (updateArtistDto === {}) {
      throw new HttpException(`artists field is empty`, HttpStatus.NO_CONTENT);
    }
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

    const artistFav = this.database.favourites.artists.filter(
      (album) => album.id === id,
    );
    const indexFav = this.database.favourites.artists.indexOf(artistFav[0]);
    this.database.favourites.artists.splice(indexFav, 1);

    this.database.albums.forEach((el, index) => {
      el.artistId === id ? (this.database.albums[index].artistId = null) : null;
    });

    this.database.tracks.forEach((el, index) => {
      el.artistId === id ? (this.database.tracks[index].artistId = null) : null;
    });
  }
}
