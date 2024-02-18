import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAllUsersQuery } from './queries/get-all-users.query';
import { Prisma, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAdminStatusDto } from './dto/update-admin-status.dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
	async getById(id?: number) {

		const user = await this.prisma.user.findFirst({ where: { id } });
		if (!user) throw new NotFoundException('User not found');
		return user;
	}

	async updateUser(currentId: number, updatedId: number, dto: UpdateUserDto) {
		const user = await this.prisma.user.findFirst({ where: { email: dto?.email } });
		if (user && dto.email !== undefined && currentId !== updatedId) {
			throw new NotFoundException('User with this email already exist!');
		}

		return this.prisma.user.update({ where: { id: updatedId }, data: { ...dto, password: await this.hashPassword(dto.password) } });
	}

	async getAll(query: GetAllUsersQuery) {
		const options = this.configureGetAllUsersOptions(query);

		return this.prisma.user.findMany({ where: options });
	}

	async updateAdminStatus(dto: UpdateAdminStatusDto) {
		return this.prisma.user.update({
			where: { id: dto.id },
			data: {
				isAdmin: dto.isAdmin,
			},
		});
	}

	private configureGetAllUsersOptions(query: GetAllUsersQuery) {
		let options: Prisma.UserWhereInput = {};

		if (query.search !== undefined) {
			options = {
				isAdmin: false,
				OR: [
					{ email: { contains: query.search } },
				],
			};
		}
		return options;
	}

	private async hashPassword(password?: string): Promise<string | undefined> {
		if (password === undefined) {
			return password;
		}

		const salt = await genSalt(10);

		return await hash(password, salt);
	}

	async deleteUser(currentUser: User, deleteId: number) {
		if (!currentUser.isAdmin && deleteId !== currentUser.id) {
			throw new ForbiddenException('You don\'t have rights!');
		}
		return this.prisma.user.delete({ where: { id: deleteId } });
	}

	constructor(private prisma: PrismaService) {
	}
}
