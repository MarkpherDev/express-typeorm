import { RequestExt } from 'common/interfaces/requestext.interface'
import { NextFunction, Response } from 'express'
import { HandleJwt } from '../utils/handle-jwt'
import { HandleMessage } from '../utils/handle-message'
import { Role } from '../common/enums/Role'

export class HandleRoles {
	public static async isAdmin(
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
				if (req.user.role === Role.ADMIN) {
					next()
				} else {
					HandleMessage.error(res, 401, 'Usuario no authorizado')
				}
			}
		} catch (error) {
			HandleMessage.error(res)
		}
	}

	public static async isUser(
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
				if (req.user.role === Role.ADMIN || req.user.role === Role.USER) {
					next()
				} else {
					HandleMessage.error(res, 401, 'Usuario no authorizado')
				}
			}
		} catch (error) {
			HandleMessage.error(res)
		}
	}

	public static async isEmployee(
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
				if (req.user.role === Role.ADMIN || req.user.role === Role.EMPLOYEE) {
					next()
				} else {
					HandleMessage.error(res, 401, 'Usuario no authorizado')
				}
			}
		} catch (error) {
			HandleMessage.error(res)
		}
	}
}
