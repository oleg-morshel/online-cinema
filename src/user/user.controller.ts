import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { DUser } from '../auth/decorator/user.decorator';
import { Auth } from '../auth/decorator/auth.decorator';
import { GetAllUsersQuery } from './queries/get-all-users.query';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateAdminStatusDto } from './dto/update-admin-status.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {

	@Get('profile')
	@Auth()
	async getProfile(@DUser('id') id?: number) {
		return await this.userService.getById(id);
	}


	@Get()
	@Auth()
	async getUsers(@Query() query: GetAllUsersQuery) {
		return this.userService.getAll(query);
	}

	@Put()
	@Auth()
	async update(@DUser('id') currentId: number, @Body() dto: UpdateUserDto) {
		return this.userService.updateUser(currentId, currentId, dto);
	}

	@Put('admin-status')
	@Auth('admin')
	async updateAdminStatus(@Body() dto: UpdateAdminStatusDto) {
		return this.userService.updateAdminStatus(dto);
	}

	@Put(':id')
	@Auth('admin')
	async updateUser(@DUser('id') currentId: number, @Param('id', ParseIntPipe) updatedId: number, @Body() dto: UpdateAdminUserDto) {
		return this.userService.updateUser(currentId, updatedId, dto);
	}

	@Delete(':id')
	@Auth()
	async delete(@DUser() user: User, @Param('id', ParseIntPipe) id: number) {
		return this.userService.deleteUser(user, id);
	}

	constructor(private userService: UserService) {
	}
}
