import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  async create(dto: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: dto });
  }

  constructor(private prisma: PrismaService) {
  }
}
