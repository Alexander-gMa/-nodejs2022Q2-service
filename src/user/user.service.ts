import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataBase } from 'src/database/db';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private database: DataBase) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User({
      id: v4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.database.users.push(user);
    return user;
  }

  async findAll() {
    return this.database.users;
  }

  async findOne(id: string) {
    const correctUser = this.database.users.filter((user) => user.id === id);
    if (correctUser.length < 1)
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    return correctUser[0];
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOne(id);
    const index = this.database.users.indexOf(existingUser);
    if (index === -1) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });
    }
    const { oldPassword, newPassword } = updateUserDto;

    if (oldPassword !== this.database.users[index].password)
      throw new ForbiddenException({
        statusCode: 403,
        message: `Incorrect password`,
        error: 'Forbidden',
      });
    const user = this.database.users[index];
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    this.database.users[index] = { ...this.database.users[index], ...user };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...updatedUser } = this.database.users[index];
    return updatedUser;
  }

  async remove(id: string) {
    const existingUser = await this.findOne(id);
    const index = this.database.users.indexOf(existingUser);
    this.database.users.splice(index, 1);
  }
}
