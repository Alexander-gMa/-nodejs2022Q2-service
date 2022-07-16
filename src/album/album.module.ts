import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DataBaseModule } from 'src/database/db.module';

@Module({
  imports: [DataBaseModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
