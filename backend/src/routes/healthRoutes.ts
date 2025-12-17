import { Router } from 'express'
import { getHealthRecords, createHealthRecord } from '../controllers/healthController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.use(authenticateToken)

router.get('/', getHealthRecords)
router.post('/', createHealthRecord)

export default router