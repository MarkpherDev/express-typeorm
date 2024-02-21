import { Request } from 'express'

export interface RequestExt extends Request {
	user?: { email: string; role: string }
}
