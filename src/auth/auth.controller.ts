import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {

	@Post('register')
	@HttpCode(200)
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto);
	}

	@Post('login')
	@HttpCode(200)
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto);
	}

	@Post('login/access-token')
	@HttpCode(200)
	async updateTokens(@Body() dto: RefreshTokenDto) {
		return this.authService.getNewTokens(dto);
	}


	constructor(private authService: AuthService) {
	}
}
