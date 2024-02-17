import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService, private readonly prisma: PrismaService) {

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate({ id }: Pick<User, 'id'>): Promise<User> {
		return this.prisma.user.findFirst({ where: { id: id } });
	}
}