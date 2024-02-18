import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
	@IsEmail({}, { message: 'Email wrong format' })
	email: string;

	@IsString()
	@MinLength(6, { message: 'Min password length should be 6' })
	@MaxLength(26, { message: 'Max password length should be 26' })
	password: string;
}
