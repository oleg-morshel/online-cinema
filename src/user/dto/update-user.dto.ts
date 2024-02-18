import { IsEmail, IsEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	@MinLength(6, { message: 'Min password length should be 6' })
	@MaxLength(26, { message: 'Max password length should be 26' })
	password?: string;

	@IsEmpty({ message: 'You don\'t have rights to update admin status' })
	isAdmin?: boolean;
}
