import { HandleJwt } from '../utils/handle-jwt'
import { RequestExt } from '../common/interfaces/requestext.interface'
import { NextFunction, Response } from 'express'
import { HandleMessage } from '../utils/handle-message'

export class HandleSession {
	public static async checkJwt(
		req: RequestExt,
		res: Response,
		next: NextFunction
	) {
		try {
			const jwtByUser = req.headers.authorization || ''
			const jwt = jwtByUser.split(' ').pop()
			const isUser = await HandleJwt.verifyToken(`${jwt}`)
			if (!isUser) {
				HandleMessage.error(res, 401, 'Usuario no autenticado')
			} else {
				req.user = isUser
				next()
			}
		} catch (error) {
			HandleMessage.error(res, 400, 'Session no validada')
		}
	}
}
