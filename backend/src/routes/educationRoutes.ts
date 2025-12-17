import { Router } from 'express'
import { getEducationRecords, createEducationRecord } from '../controllers/educationController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.use(authenticateToken)

router.get('/', getEducationRecords)
router.post('/', createEducationRecord)

export default router