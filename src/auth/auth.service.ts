import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
	async register(dto: AuthDto) {
		const oldUser = await this.prisma.user.findFirst({
			where: { email: dto.email },
		});

		if (oldUser) {
			throw new BadRequestException('User with same email already exist');
		}

		const salt = await genSalt(10);

		const newUser= await this.prisma.user.create({
			data: {
				email: dto.email,
				password: await hash(dto.password, salt),
			},
		});

		const tokens = await  this.issueTokenPair(newUser.id)

		return {
			user : this.returnUserFields(newUser),
			...tokens,
		}
	}

	async login(dto: AuthDto) {
		return this.validateUser(dto);
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findFirst({ where: { email: dto.email } });
		if (!user) throw new UnauthorizedException('User not found');

		const isValidPassword = await compare(dto.password, user.password);
		if (!isValidPassword) throw new UnauthorizedException('Invalid password');


		const tokens = await  this.issueTokenPair(user.id)

		return {
			user : this.returnUserFields(user),
			...tokens,
		}
	}

	async issueTokenPair(userId: number) {
		const data = { _id: userId };

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '14d',
		});

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '15m',
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	private returnUserFields(user: User){
		return {
			id: user.id,
			email: user.email,
			isAdmin: user.isAdmin,
		}
	}

	constructor(private prisma: PrismaService, private readonly jwtService: JwtService) {
	}
}
