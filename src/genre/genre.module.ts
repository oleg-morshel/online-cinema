import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../config/jwt.config';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { GenreController } from './genre.controller';

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
	],
	controllers: [GenreController],
	providers: [GenreService, PrismaService, ConfigService, JwtStrategy],
})
export class GenreModule {
}
