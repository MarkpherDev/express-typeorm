import { compare, hash } from 'bcrypt'
export class HandleBcrypt {
	private static readonly salt = 10
	public static async hashPassword(password: string): Promise<string> {
		const hashText = await hash(password, this.salt)
		return hashText
	}

	public static async comparePassword(
		password: string,
		hashedPassword: string
	): Promise<boolean> {
		const isMatch = await compare(password, hashedPassword)
		return isMatch
	}
}
