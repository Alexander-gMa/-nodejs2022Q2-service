import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} album`;
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
