import { IsString } from 'class-validator';

export class RefreshTokenDto {
	@IsString({ message: 'Invalid token format' })
	refreshToken: string;
}
