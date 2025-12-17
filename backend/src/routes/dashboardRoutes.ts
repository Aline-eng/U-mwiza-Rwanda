import { Router } from 'express'
import { getStaffDashboard, getAdminDashboard } from '../controllers/dashboardController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.use(authenticateToken)

router.get('/staff', getStaffDashboard)
router.get('/admin', getAdminDashboard)

export default router