import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from 'src/artist/entities/artist.entity';
import { DataBase } from 'src/database/db';
import { v4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private database: DataBase) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album({
      id: v4(),
      ...createAlbumDto,
    });
    this.database.albums.push(album);
    return album;
  }

  findAll() {
    return this.database.albums;
  }

  findOne(id: string) {
    const correctAlbum = this.database.albums.filter(
      (album) => album.id === id,
    );
    if (correctAlbum.length < 1)
      throw new NotFoundException({
        statusCode: 404,
        message: `Artist with this ID was not found`,
        error: 'Not Found',
      });
    return correctAlbum[0];
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const existingAlbum = this.findOne(id);
    const index = this.database.albums.indexOf(existingAlbum);
    if (index === -1) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    }
    const updatedAlbum = {
      ...this.database.albums[index],
      ...updateAlbumDto,
    };
    this.database.artists[index] = {
      ...this.database.artists[index],
      ...updatedAlbum,
    };

    return updatedAlbum;
  }

  remove(id: string) {
    const existingAlbum = this.findOne(id);
    const index = this.database.albums.indexOf(existingAlbum);
    this.database.albums.splice(index, 1);
  }
}
