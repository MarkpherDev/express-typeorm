import { hash } from 'bcrypt'

export class HandleBcrypt {
	private static readonly salt = 10
	public static async hashPassword(password: string) {
		const hashText = await hash(password, this.salt)
		return hashText
	}

	public static async comparePassword() {}
}
