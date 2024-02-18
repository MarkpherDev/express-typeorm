import { Product } from '../entities/product.entity'
import { AppDataSouce } from '../config/datasource'
import { CreateProductDto } from '../dto/products/create-product.dto'
import { UpdateProductDto } from 'dto/products/update-product.dto'

export class ProductService {
	private static readonly productRepository =
		AppDataSouce.getRepository(Product)

	public static async create(data: CreateProductDto): Promise<Product> {
		const product = this.productRepository.create(data)
		return await this.productRepository.save(product)
	}

	public static async findAll(): Promise<Product[]> {
		const products = await this.productRepository.find()
		return products
	}

	public static async findById(id: number): Promise<Product | null> {
		const productFound = await this.productRepository.findOneBy({ id })
		return productFound
	}

	public static async update(
		id: number,
		data: UpdateProductDto
	): Promise<boolean> {
		const product = await this.productRepository.update(id, data)
		if (product.affected !== 0) {
			return true
		}
		return false
	}

	public static async delete(id: number): Promise<boolean> {
		const response = await this.productRepository.delete(id)
		return response.affected !== 0
	}
}
