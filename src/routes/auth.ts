import { HandleSession } from '../middleware/Handlesession'
import { AuthController } from '../controllers/auth.controller'
import { Router } from 'express'
import { HandleRoles } from '../middleware/HandleRoles'

export const router = Router()

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.get(
	'/profile',
	[HandleRoles.isAdmin, HandleSession.checkJwt],
	AuthController.profile
)
