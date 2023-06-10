import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(phone: string, password: string): Promise<any> {
		const user = await this.usersService.findOne(phone)
		if (!user) throw new NotFoundException('No user found')
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch)
			throw new UnauthorizedException('Username/password incorrect')
		if (isMatch) {
			const { password, ...result } = user
			return result
		}
		return null
	}

	async login(user: any) {
		console.log(user)
		const payload = { username: user.username, sub: user.userId }
		return {
			access_token: this.jwtService.sign(payload)
		}
	}
}
