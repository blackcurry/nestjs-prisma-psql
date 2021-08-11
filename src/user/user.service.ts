import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    return user;
  }

  async getUserList(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: [{ createdAt: 'asc' }],
    });
    return users;
  }

  async addUser(user: Prisma.UserCreateInput): Promise<number> {
    const createUser = await this.prisma.user.create({
      data: user,
    });
    return createUser.id;
  }

  async getBookmarkList(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: [{ createdAt: 'asc' }],
    });
    return users.filter((u) => u.isBookmark);
  }
}
