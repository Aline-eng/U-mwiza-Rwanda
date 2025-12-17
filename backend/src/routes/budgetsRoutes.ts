import { Router } from 'express'
import { getBudgets, createBudget, submitBudget } from '../controllers/budgetsController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.use(authenticateToken)

router.get('/', getBudgets)
router.post('/', createBudget)
router.patch('/:id/submit', submitBudget)

export default router