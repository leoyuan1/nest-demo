import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		let user = await this.prisma.users.create({
			data: createUserDto
		})
		return `Created user`
	}

	findAll(): Promise<User[]> {
		return this.prisma.users.findMany()
	}

	findOne(id: number) {
		// let foundUser = this.users.find((user) => user.id === id)
		// if (!foundUser) throw new NotFoundException(`User not found`)
		// return foundUser
		return []
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
