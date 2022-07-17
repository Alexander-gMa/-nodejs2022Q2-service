import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataBaseModule } from 'src/database/db.module';

@Module({
  imports: [DataBaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
