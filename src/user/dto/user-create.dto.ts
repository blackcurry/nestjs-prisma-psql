import { Prisma } from '@prisma/client';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class UserCreateDTO implements Prisma.UserCreateInput {
  @IsString()
  name: string;

  @IsNumberString()
  tel: string;
}

export class UserUpdateTO implements Prisma.UserUpdateInput {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumberString()
  tel?: string;
}
