import {
	Body,
	Controller,
	Post,
	HttpCode,
	HttpStatus,
	UseGuards,
	Request
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from './jwt-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'
import { LoginUserDto } from 'src/users/dto/login-user.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req: Express.Request, @Body() user: LoginUserDto) {
		return await this.authService.login(req.user)
	}
}
