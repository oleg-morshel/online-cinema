import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  async getHello() {
    return await this.prisma.user.findMany();
  }

  constructor(private prisma: PrismaService) {
  }
}
