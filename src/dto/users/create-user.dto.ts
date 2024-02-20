import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateUserDto {
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(2)
	@MaxLength(30)
	firstname: string

	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(2)
	@MaxLength(30)
	lastname: string

	@IsEmail()
	email: string

	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(6)
	@MaxLength(20)
	password: string
}
