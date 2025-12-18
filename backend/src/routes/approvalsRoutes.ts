import { Router } from 'express'
import { getPendingApprovals, approveBudget, rejectBudget } from '../controllers/approvalsController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.use(authenticateToken)

router.get('/', getPendingApprovals)
router.patch('/budgets/:id/approve', approveBudget)
router.patch('/budgets/:id/reject', rejectBudget)

export default router