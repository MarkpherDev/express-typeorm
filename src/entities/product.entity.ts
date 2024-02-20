import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true, nullable: false })
	name: string

	@Column({ nullable: false })
	description: string

	@Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
	price: number

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
