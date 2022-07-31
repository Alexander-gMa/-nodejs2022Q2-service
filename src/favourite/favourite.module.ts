import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';
import { DataBaseModule } from 'src/database/db.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [DataBaseModule],
  controllers: [FavouriteController],
  providers: [FavouriteService, PrismaService],
})
export class FavouriteModule {}
