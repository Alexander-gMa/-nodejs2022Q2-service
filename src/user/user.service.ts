/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User({
      id: v4(),
      ...createUserDto,
      version: 1,
    });
    const createdUser = this.prisma.user.create({
      data: user,
    });
    return plainToInstance(User, createdUser);
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const correctUser = await this.prisma.user.findFirst({ where: { id } });
    if (!correctUser)
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    return plainToInstance(User, correctUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.prisma.user.findFirst({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    }
    const { oldPassword, newPassword } = updateUserDto;

    if (oldPassword !== existingUser.password)
      throw new ForbiddenException({
        statusCode: 403,
        message: `Incorrect password`,
        error: 'Forbidden',
      });
    return plainToInstance(
      User,
      await this.prisma.user.update({
        where: { id },
        data: {
          password: newPassword,
          updatedAt: new Date(),
          version: { increment: 1 },
        },
      }),
    );
  }

  async remove(id: string) {
    const existingUser = await this.prisma.user.findFirst({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    }
    return await this.prisma.user.delete({ where: { id } });
  }
}
