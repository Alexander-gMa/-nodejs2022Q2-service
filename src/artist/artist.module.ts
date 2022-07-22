import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DataBaseModule } from 'src/database/db.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [DataBaseModule],
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService],
})
export class ArtistModule {}
