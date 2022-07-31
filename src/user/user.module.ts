import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataBaseModule } from 'src/database/db.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [DataBaseModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
