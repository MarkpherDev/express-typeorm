import { ProductController } from '../controllers/products.controller'
import { Router } from 'express'
export const router = Router()
router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findById)
router.post('/', ProductController.create)
router.patch('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)
