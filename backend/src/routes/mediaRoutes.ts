import { Router } from 'express'
import { getMediaByChild, uploadMedia, deleteMedia, upload } from '../controllers/mediaController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.use(authenticateToken)

router.get('/child/:childId', getMediaByChild)
router.post('/upload', upload.single('file'), uploadMedia)
router.delete('/:id', deleteMedia)

export default router