import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'
import { z } from 'zod'

const prisma = new PrismaClient()

const createLetterSchema = z.object({
  childId: z.string().min(1, 'Child ID is required'),
  sponsorId: z.string().min(1, 'Sponsor ID is required'),
  direction: z.enum(['TO_CHILD', 'FROM_CHILD']),
  letterType: z.enum(['TEXT', 'VIDEO', 'PHOTO', 'AUDIO']),
  content: z.string().optional(),
  fileUrl: z.string().optional(),
  language: z.string().optional(),
  notes: z.string().optional()
})

export const getLettersByChild = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId } = req.params
    const { direction, status } = req.query

    const where: any = { childId }
    
    if (direction) {
      where.direction = direction
    }
    
    if (status) {
      where.status = status
    }

    const letters = await prisma.letter.findMany({
      where,
      include: {
        child: {
          select: {
            firstName: true,
            lastName: true,
            childCode: true
          }
        },
        sponsor: {
          select: {
            firstName: true,
            lastName: true,
            sponsorCode: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      data: letters,
      count: letters.length
    })
  } catch (error) {
    console.error('Error fetching letters:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch letters'
    })
  }
}

export const createLetter = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const validatedData = createLetterSchema.parse(req.body)
    const userId = req.user?.id

    const letter = await prisma.letter.create({
      data: {
        childId: validatedData.childId,
        sponsorId: validatedData.sponsorId,
        direction: validatedData.direction,
        letterType: validatedData.letterType,
        content: validatedData.content,
        fileUrl: validatedData.fileUrl,
        language: validatedData.language,
        notes: validatedData.notes,
        sentDate: new Date(),
        status: 'PENDING',
        handledBy: userId
      },
      include: {
        child: {
          select: {
            firstName: true,
            lastName: true,
            childCode: true
          }
        },
        sponsor: {
          select: {
            firstName: true,
            lastName: true,
            sponsorCode: true
          }
        }
      }
    })

    res.status(201).json({
      success: true,
      data: letter,
      message: 'Letter created successfully'
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

    console.error('Error creating letter:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create letter'
    })
  }
}

export const updateLetterStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { status } = req.body

    const letter = await prisma.letter.update({
      where: { id },
      data: {
        status,
        ...(status === 'DELIVERED' && { deliveredDate: new Date() }),
        ...(status === 'READ' && { readDate: new Date() })
      },
      include: {
        child: {
          select: {
            firstName: true,
            lastName: true,
            childCode: true
          }
        },
        sponsor: {
          select: {
            firstName: true,
            lastName: true,
            sponsorCode: true
          }
        }
      }
    })

    res.json({
      success: true,
      data: letter,
      message: 'Letter status updated successfully'
    })
  } catch (error) {
    console.error('Error updating letter status:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update letter status'
    })
  }
}