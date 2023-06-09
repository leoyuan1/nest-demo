import { ApiProperty } from '@nestjs/swagger'
import {
	IsNotEmpty,
	IsString,
	IsInt,
	MinLength,
	IsPhoneNumber
} from 'class-validator'

export class User {
	@ApiProperty({ default: 1 })
	@IsInt()
	id: number
	@ApiProperty({ default: 'test' })
	@IsString()
	@IsNotEmpty()
	username: string
	@ApiProperty({ default: 'testing1' })
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string
	@ApiProperty({ default: '67664515' })
	@IsNotEmpty()
	@IsPhoneNumber('HK')
	phone: string
}
