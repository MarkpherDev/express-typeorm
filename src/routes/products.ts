import { HandleSession } from '../middleware/Handlesession'
import { ProductController } from '../controllers/products.controller'
import { Router } from 'express'
import { HandleRoles } from '../middleware/HandleRoles'
import { multerOptions } from '../middleware/HandleMulter'
export const router = Router()
router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findById)
router.post(
	'/',
	[
		multerOptions.single('image'),
		HandleRoles.isAdmin,
		HandleRoles.isEmployee,
		HandleSession.checkJwt
	],
	ProductController.create
)
router.patch(
	'/:id',
	[
		multerOptions.single('image'),
		HandleRoles.isAdmin,
		HandleRoles.isEmployee,
		HandleSession.checkJwt
	],
	ProductController.update
)
router.delete(
	'/:id',
	[HandleRoles.isAdmin, HandleRoles.isEmployee, HandleSession.checkJwt],
	ProductController.delete
)
