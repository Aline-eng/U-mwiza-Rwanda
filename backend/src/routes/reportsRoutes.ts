import { Router } from 'express'
import { getSystemOverview, getStaffPerformance, getCommunityImpact } from '../controllers/reportsController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.use(authenticateToken)

router.get('/overview', getSystemOverview)
router.get('/staff-performance', getStaffPerformance)
router.get('/community-impact', getCommunityImpact)

export default router