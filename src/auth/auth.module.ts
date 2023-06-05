import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { UsersService } from 'src/users/users.service'
import { PrismaService } from 'nestjs-prisma'

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '7d' }
		})
	],
	controllers: [AuthController],
	providers: [AuthService, UsersService, PrismaService]
})
export class AuthModule {}