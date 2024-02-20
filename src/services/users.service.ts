import { User } from '../entities/users.entity'
import { AppDataSouce } from '../config/datasource'
import { CreateUserDto } from '../dto/users/create-user.dto'
import { HandleBcrypt } from '../utils/handle-bcrypt'
import { UpdateUserDto } from '../dto/users/update-user.dto'

export class UserService {
	private static readonly userRepository = AppDataSouce.getRepository(User)

	public static async findAll(): Promise<User[]> {
		const products = await this.userRepository.find()
		return products
	}

	public static async create({
		firstname,
		lastname,
		email,
		password
	}: CreateUserDto): Promise<User> {
		const passwordHash = await HandleBcrypt.hashPassword(password)
		const product = await this.userRepository.save({
			firstname,
			lastname,
			email,
			password: passwordHash
		})

		return product
	}

	public static async findByEmail(email: string): Promise<User | null> {
		const userFound = await this.userRepository.findOneBy({ email })
		return userFound
	}

	public static async update(
		email: string,
		data: UpdateUserDto
	): Promise<boolean> {
		const userFound = await this.findByEmail(email)
		if (!userFound) {
			return false
		}
		const { id } = userFound
		const product = await this.userRepository.update(id, data)
		if (product.affected !== 0) {
			return false
		}
		return true
	}
}
