import { Request, Response } from 'express'
import { ProductService } from '../services/products.service'
import { HandleMessage } from '../utils/handle-message'

export class ProductController {
	public static async findAll(req: Request, res: Response): Promise<void> {
		try {
			const response = await ProductService.findAll()
			HandleMessage.success(
				res,
				response,
				200,
				'Data obtenida satisfactoriamente'
			)
		} catch (error) {
			HandleMessage.error(res)
		}
	}
	public static async findById(
		{ params }: Request,
		res: Response
	): Promise<void> {
		try {
			const id = Number(params.id)
			const product = await ProductService.findById(id)
			if (!product) {
				HandleMessage.error(res, 404, 'Product Not Found')
			} else {
				HandleMessage.success(res, product, 202, 'Product Encontrado')
			}
		} catch (error) {
			HandleMessage.error(res)
		}
	}

	public static async create(req: Request, res: Response): Promise<void> {
		try {
			const response = await ProductService.create(req.body, req.file)
			HandleMessage.success(
				res,
				response,
				201,
				'Product Creado satisfactoriamente'
			)
		} catch (error) {
			HandleMessage.error(res)
		}
	}

	public static async update(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.params.id)
			if (!req.file) {
				const response = await ProductService.updateWithoutFile(id, req.body)
				if (!response) {
					HandleMessage.error(res, 404, 'Product Not Found')
				} else {
					HandleMessage.success(
						res,
						response,
						202,
						'Product Actualizado Correctamente'
					)
				}
			} else {
				const response = await ProductService.update(id, req.body, req.file)
				if (!response) {
					HandleMessage.error(res, 404, 'Product Not Found')
				} else {
					HandleMessage.success(
						res,
						response,
						202,
						'Product Actualizado Correctamente'
					)
				}
			}
		} catch (error) {
			HandleMessage.error(res)
		}
	}

	public static async delete(
		{ params }: Request,
		res: Response
	): Promise<void> {
		try {
			const id = Number(params.id)
			const response = await ProductService.delete(id)
			if (!response) {
				HandleMessage.error(res, 404, 'Product Not Found')
			} else {
				HandleMessage.success(
					res,
					response,
					202,
					'Producto borrado Satisfactoriamente'
				)
			}
		} catch (error) {
			HandleMessage.error(res)
		}
	}
}
