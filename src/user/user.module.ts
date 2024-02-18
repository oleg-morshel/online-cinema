import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../config/jwt.config';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
	],
	providers: [UserService, PrismaService, ConfigService, JwtStrategy],
	controllers: [UserController],
})
export class UserModule {
}
