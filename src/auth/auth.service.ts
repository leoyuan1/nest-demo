import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async signIn(phone: string, singInPassword: string): Promise<any> {
		const user = await this.usersService.findOne(phone)
		let isMatch = await bcrypt.compare(singInPassword, user?.password)
		if (!isMatch) {
			throw new UnauthorizedException('No user found')
		}
		const payload = { sub: user.id }
		const access_token = await this.jwtService.signAsync(payload)
		return {
			access_token: access_token
		}
	}
}
