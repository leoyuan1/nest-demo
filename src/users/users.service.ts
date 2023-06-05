import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { PrismaService } from 'nestjs-prisma'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
	private SALT_ROUND = Number(process.env.SALT_ROUND)
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		let currentUser = await this.prisma.users.findUnique({
			where: { phone: createUserDto.phone }
		})
		if (currentUser) {
			throw new NotFoundException('User already exists')
		}
		createUserDto.password = await bcrypt.hash(
			createUserDto.password,
			this.SALT_ROUND
		)
		await this.prisma.users.create({
			data: createUserDto
		})
		return `Created user`
	}

	findAll(): Promise<User[]> {
		return this.prisma.users.findMany()
	}

	findOne(phone: string) {
		let user = this.prisma.users.findUnique({
			where: { phone: phone }
		})
		return user
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
