import { Product } from '../entities/product.entity'
import { AppDataSouce } from '../config/datasource'
import { CreateProductDto } from '../dto/products/create-product.dto'
import { UpdateProductDto } from '../dto/products/update-product.dto'
import * as fs from 'fs/promises'
import * as path from 'path'
import { routeProductsImage } from '../common/constants/imageProducts'

export class ProductService {
	private static readonly productRepository =
		AppDataSouce.getRepository(Product)

	public static async create(
		data: CreateProductDto,
		file?: Express.Multer.File
	): Promise<Product> {
		data.image = file?.filename
		const product = this.productRepository.create(data)
		return await this.productRepository.save(product)
	}

	public static async findAll(): Promise<Product[]> {
		const products = await this.productRepository.find()
		return products
	}

	public static async findById(id: number): Promise<Product | null> {
		const productFound = await this.productRepository.findOneBy({ id })
		if (!productFound) {
			return null
		}
		return productFound
	}

	public static async update(
		id: number,
		data: UpdateProductDto,
		file: Express.Multer.File
	): Promise<Product | null> {
		const productFound = await this.findById(id)
		if (!productFound) {
			return null
		}
		await fs.unlink(
			path.join(process.cwd(), `${routeProductsImage}${productFound.image}`)
		)
		data.image = file.filename
		await this.productRepository.update(id, data)
		return await this.findById(id)
	}

	public static async delete(id: number): Promise<Product | null> {
		const productFound = await this.findById(id)
		if (!productFound) {
			return null
		}
		await fs.unlink(
			path.join(process.cwd(), `${routeProductsImage}${productFound.image}`)
		)
		await this.productRepository.delete(id)
		return productFound
	}

	public static async updateWithoutFile(id: number, data: UpdateProductDto) {
		await this.productRepository.update(id, data)
		return await this.findById(id)
	}
}
