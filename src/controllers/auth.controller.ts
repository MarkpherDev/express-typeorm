import { RequestExt } from '../common/interfaces/requestext.interface'
import { AuthService } from '../services/auth.service'
import { UserService } from '../services/users.service'
import { HandleMessage } from '../utils/handle-message'
import { Request, Response } from 'express'

export class AuthController {
	public static async register({ body }: Request, res: Response) {
		try {
			const response = await UserService.create(body)
			if (!response) {
				HandleMessage.error(res)
			} else {
				HandleMessage.success(
					res,
					response,
					201,
					'Usuario creado Correctamente'
				)
			}
		} catch (error) {
			HandleMessage.error(res)
		}
	}
	public static async login({ body }: Request, res: Response) {
		try {
			const response = await AuthService.login(body)
			if (!response) {
				HandleMessage.error(res, 404, 'user not Found')
			} else {
				HandleMessage.success(res, response, 202, 'Logeado Correctamente')
			}
		} catch (error) {
			HandleMessage.error(res)
		}
	}
	public static async profile(req: RequestExt, res: Response) {
		try {
			if (!req.user) {
				HandleMessage.error(res, 401, 'No authorizado')
			} else {
				const response = await UserService.findByEmail(req.user?.email)
				HandleMessage.success(res, response, 202, 'Usuario permitido')
			}
		} catch (error) {
			HandleMessage.error(res)
		}
	}
}
