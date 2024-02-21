import { UserService } from '../services/users.service'
import { LoginDto } from '../dto/auth/login-user.dto'
import * as dotenv from 'dotenv'
import { sign, verify } from 'jsonwebtoken'
import { JWTResponse } from '../common/interfaces/auth.interface'
dotenv.config()

export class HandleJwt {
	public static async generateToken(data: LoginDto): Promise<string> {
		const user = await UserService.findByEmail(data.email)
		const payload = { email: user?.email, role: user?.role }
		const token = sign(payload, String(process.env.JWT_SECRET), {
			expiresIn: '4h'
		})
		return token
	}
	public static async verifyToken(token: string): Promise<JWTResponse> {
		const isOk = verify(token, String(process.env.JWT_SECRET))
		return isOk as JWTResponse
	}
}
