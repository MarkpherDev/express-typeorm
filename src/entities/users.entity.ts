import { Role } from '../common/enums/Role'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ nullable: false })
	firstname: string

	@Column({ nullable: false })
	lastname: string

	@Column({ unique: true, nullable: false })
	email: string

	@Column({ nullable: false })
	password: string

	@Column({ type: 'enum', default: Role.USER, enum: Role, nullable: false })
	role: Role

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@DeleteDateColumn()
	deletedAt: Date
}
