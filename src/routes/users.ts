import { UserController } from '../controllers/users.controller'
import { Router } from 'express'

export const router = Router()

router.get('/', UserController.findAll)
router.get('/buscar-user/', UserController.findOne)
router.post('/', UserController.create)
router.patch('/:id', UserController.update)
router.delete('/:id', UserController.delete)
