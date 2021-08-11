import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UserCreateDTO } from './dto/user-create.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  getUsers(): Promise<User[]> {
    return this.userService.getUserList();
  }

  @Get('list/bookmark')
  async getBookmarkList(): Promise<User[]> {
    return this.userService.getBookmarkList();
  }

  @Post('add')
  async addUsers(@Body() body: UserCreateDTO) {
    return await this.userService.addUser(body);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUser(id);
  }
}
