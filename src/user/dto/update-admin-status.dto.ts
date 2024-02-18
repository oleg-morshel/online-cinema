import { IsBoolean, IsInt } from 'class-validator';

export class UpdateAdminStatusDto {
	@IsInt()
	id: number

	@IsBoolean()
	isAdmin: boolean
}