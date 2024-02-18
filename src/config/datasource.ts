import { Product } from '../entities/product.entity'
import { DataSource } from 'typeorm'

export const AppDataSouce = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '',
	database: 'puntoventadb',
	entities: [Product],
	synchronize: true
})
