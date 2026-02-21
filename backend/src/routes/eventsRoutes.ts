import { Router } from 'express'
import { getAllEvents, getEventById, createEvent, deleteEvent } from '../controllers/eventsController'
import { authenticateToken } from '../middleware/auth'

const router = Router()

router.use(authenticateToken)

router.get('/', getAllEvents)
router.get('/:id', getEventById)
router.post('/', createEvent)
router.delete('/:id', deleteEvent)

export default router