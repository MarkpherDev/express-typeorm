import { IsDecimal, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateProductDto {
	@IsString()
	@MinLength(2)
	@IsOptional()
	name: string

	@IsString()
	@MinLength(2)
	@IsOptional()
	description: string

	@IsDecimal({ decimal_digits: '2' })
	@IsOptional()
	price: number
}
