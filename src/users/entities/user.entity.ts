import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';

export class User {
  @ApiProperty({ default: 1 })
  @IsInt()
  id: number;
  @ApiProperty({ default: 'test' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ default: 'testing' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @ApiProperty({ default: '67664555' })
  @IsNotEmpty()
  @IsPhoneNumber('HK')
  phone: string;
}
