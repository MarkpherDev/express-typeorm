import { Response } from 'express'

export class HandleMessage {
	public static async success(
		res: Response,
		data: unknown,
		statusCode: number = 200,
		message?: string
	) {
		res.status(statusCode).send({
			message,
			data
		})
	}

	public static async error(
		res: Response,
		statusCode: number = 500,
		message: string = 'Internal Server Error'
	) {
		res.status(statusCode).send({
			statusCode,
			message
		})
	}
}
