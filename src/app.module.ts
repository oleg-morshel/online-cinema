import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot(), UserModule, AuthModule, JwtModule],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {
}
