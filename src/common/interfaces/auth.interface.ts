import { JwtPayload } from 'jsonwebtoken'

export interface Auth {
	email: string
	token: string
}

export interface JWTResponse extends JwtPayload {
	email: string
	role: string
}
