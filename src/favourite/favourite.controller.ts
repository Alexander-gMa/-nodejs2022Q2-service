import {
  Controller,
  Post,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Get,
} from '@nestjs/common';
import { FavouriteService } from './favourite.service';

@Controller('favs')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Get()
  findAll() {
    return this.favouriteService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favouriteService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favouriteService.deleteTrack(id);
  }

  // @Post('album/:id')
  // @HttpCode(201)
  // addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
  //   return this.favouriteService.create(id);
  // }

  // @Delete('album/:id')
  // @HttpCode(204)
  // deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
  //   return this.favouriteService.create(id);
  // }

  // @Post('artist/:id')
  // @HttpCode(201)
  // addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
  //   return this.favouriteService.create(id);
  // }

  // @Delete('artist/:id')
  // @HttpCode(204)
  // deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
  //   return this.favouriteService.create(id);
  // }
}
