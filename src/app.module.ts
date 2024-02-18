import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { GenreModule } from './genre/genre.module';

@Module({
	imports: [ConfigModule.forRoot(), UserModule, GenreModule, AuthModule, JwtModule],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {
}
