import { Request, Response } from 'express'
import { HandleMessage } from '../utils/handle-message'
import { UserService } from '../services/users.service'

export class UserController {
	public static async create({ body }: Request, res: Response): Promise<void> {
		try {
			const response = await UserService.create(body)
			HandleMessage.success(
				res,
				response,
				201,
				'User Creado Satisfactoriamente'
			)
		} catch (error) {
			HandleMessage.error(res)
		}
	}

	public static async findAll(req: Request, res: Response) {
		try {
			const response = await UserService.findAll()
			HandleMessage.success(
				res,
				response,
				202,
				'User obtenidos Satisfactoriamente'
			)
		} catch (error) {
			HandleMessage.error(res)
		}
	}

	public static async findOne({ params }: Request, res: Response) {
		try {
			const email = String(params.email)
			const product = await UserService.findByEmail(email)
			if (!product) {
				HandleMessage.error(res, 404, 'User Not Found')
			} else {
				HandleMessage.success(res, product, 202, 'User encontrado')
			}
		} catch (error) {
			HandleMessage.error(res)
		}
	}

	public static async update(req: Request, res: Response) {}

	public static async delete(req: Request, res: Response) {}
}
