import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DataBaseModule } from 'src/database/db.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [DataBaseModule],
  controllers: [TrackController],
  providers: [TrackService, PrismaService],
})
export class TrackModule {}
