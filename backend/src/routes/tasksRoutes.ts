import { Router } from 'express'
import { getTasks, updateTaskStatus } from '../controllers/tasksController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.use(authenticateToken)

router.get('/', getTasks)
router.patch('/:id/status', updateTaskStatus)

export default router