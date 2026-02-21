import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'
import { z } from 'zod'

const prisma = new PrismaClient()

const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  eventType: z.enum(['COMMUNITY', 'TRAINING', 'CELEBRATION', 'VISIT', 'OTHER']),
  eventDate: z.string().min(1, 'Event date is required'),
  endDate: z.string().optional(),
  location: z.string().optional(),
  communityId: z.string().optional()
})

export const getAllEvents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, eventType, communityId } = req.query

    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (eventType) {
      where.eventType = eventType
    }
    
    if (communityId) {
      where.communityId = communityId
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        community: {
          select: {
            name: true,
            location: true
          }
        }
      },
      orderBy: { eventDate: 'desc' }
    })

    res.json({
      success: true,
      data: events,
      count: events.length
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    })
  }
}

export const getEventById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        community: {
          select: {
            name: true,
            location: true
          }
        }
      }
    })

    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Event not found'
      })
      return
    }

    res.json({
      success: true,
      data: event
    })
  } catch (error) {
    console.error('Error fetching event:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event'
    })
  }
}

export const createEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const validatedData = createEventSchema.parse(req.body)
    const userId = req.user?.id

    const event = await prisma.event.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        eventType: validatedData.eventType,
        eventDate: new Date(validatedData.eventDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        location: validatedData.location,
        communityId: validatedData.communityId,
        status: 'UPCOMING',
        createdBy: userId
      },
      include: {
        community: {
          select: {
            name: true,
            location: true
          }
        }
      }
    })

    res.status(201).json({
      success: true,
      data: event,
      message: 'Event created successfully'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors
      })
      return
    }

    console.error('Error creating event:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create event'
    })
  }
}

export const deleteEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const event = await prisma.event.findUnique({
      where: { id }
    })

    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Event not found'
      })
      return
    }

    await prisma.event.delete({
      where: { id }
    })

    res.json({
      success: true,
      message: 'Event deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting event:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete event'
    })
  }
}