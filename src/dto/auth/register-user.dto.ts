import { Transform } from 'class-transformer'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class RegisterDto {
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(2)
	@MaxLength(40)
	lastname: string

	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(2)
	@MaxLength(40)
	firstname: string

	@IsEmail()
	email: string

	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(2)
	@MaxLength(20)
	password: string
}
