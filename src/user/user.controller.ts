import { Body, Controller, Post } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Post()
  async create(@Body() dto: Prisma.UserCreateInput): Promise<User> {
    return await this.userService.create(dto);
  }

  constructor(private userService: UserService) {}
}
