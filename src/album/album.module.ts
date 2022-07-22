import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DataBaseModule } from 'src/database/db.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [DataBaseModule],
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService],
})
export class AlbumModule {}
