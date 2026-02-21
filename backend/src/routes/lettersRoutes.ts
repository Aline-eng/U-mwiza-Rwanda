import { Router } from 'express'
import { getLettersByChild, createLetter, updateLetterStatus } from '../controllers/lettersController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.use(authenticateToken)

router.get('/child/:childId', getLettersByChild)
router.post('/', createLetter)
router.put('/:id/status', updateLetterStatus)

export default router