import {
	IsEmail,
	IsOptional,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'
import { Transform } from 'class-transformer'

export class UpdateUserDto {
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(2)
	@MaxLength(30)
	@IsOptional()
	firstname: string

	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(2)
	@MaxLength(30)
	@IsOptional()
	lastname: string

	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(6)
	@MaxLength(20)
	@IsOptional()
	password: string
}
