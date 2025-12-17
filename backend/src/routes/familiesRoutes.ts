import { Router } from 'express'
import { getFamilies, getFamilyById, createFamily } from '../controllers/familiesController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.use(authenticateToken)

router.get('/', getFamilies)
router.get('/:id', getFamilyById)
router.post('/', createFamily)

export default router