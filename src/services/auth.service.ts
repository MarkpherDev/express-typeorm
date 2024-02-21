import { HandleJwt } from '../utils/handle-jwt'
import { LoginDto } from '../dto/auth/login-user.dto'
import { UserService } from './users.service'
import { Auth } from '../common/interfaces/auth.interface'
import { HandleBcrypt } from '../utils/handle-bcrypt'
import { User } from '../entities/users.entity'

export class AuthService {
	public static async login({
		email,
		password
	}: LoginDto): Promise<Auth | null> {
		const userFound = await UserService.findByEmail(email)
		if (!userFound) {
			return null
		} else {
			const isPasswordMatch = await HandleBcrypt.comparePassword(
				password,
				userFound?.password
			)
			if (!isPasswordMatch) {
				return null
			} else {
				const token = await HandleJwt.generateToken(userFound)
				return {
					email: userFound.email,
					token
				}
			}
		}
	}

	public static async profile({
		email
	}: {
		email: string
	}): Promise<User | null> {
		const user = await UserService.findByEmail(email)
		return user
	}
}
