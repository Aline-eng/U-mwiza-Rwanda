import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getChildren = async (req: Request, res: Response): Promise<void> => {
  try {
    const { communityId, status, isSponsored } = req.query
    
    const where: any = {}
    
    if (communityId) {
      where.family = { communityId: communityId as string }
    }
    
    if (status) {
      where.status = status
    }
    
    if (isSponsored !== undefined) {
      where.isSponsored = isSponsored === 'true'
    }

    const children = await prisma.child.findMany({
      where,
      include: {
        family: {
          include: {
            community: true
          }
        },
        sponsor: true,
        healthRecords: {
          orderBy: { recordDate: 'desc' },
          take: 1
        },
        educationRecords: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      data: children,
      count: children.length
    })
  } catch (error) {
    console.error('Error fetching children:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch children'
    })
  }
}

export const getChildById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const child = await prisma.child.findUnique({
      where: { id },
      include: {
        family: {
          include: {
            community: true
          }
        },
        sponsor: true,
        healthRecords: {
          orderBy: { recordDate: 'desc' }
        },
        educationRecords: {
          orderBy: { academicYear: 'desc' }
        },
        transactions: {
          orderBy: { transactionDate: 'desc' },
          take: 10
        },
        letters: {
          orderBy: { sentDate: 'desc' },
          take: 10
        }
      }
    })

    if (!child) {
      res.status(404).json({
        success: false,
        message: 'Child not found'
      })
      return
    }

    res.json({
      success: true,
      data: child
    })
  } catch (error) {
    console.error('Error fetching child:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch child'
    })
  }
}

export const createChild = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      familyId,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      gradeLevel,
      schoolName,
      interests,
      dreams,
      specialNeeds
    } = req.body

    // Generate child code
    const childCount = await prisma.child.count()
    const childCode = `CH${String(childCount + 1).padStart(3, '0')}`

    const child = await prisma.child.create({
      data: {
        familyId,
        childCode,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        gradeLevel,
        schoolName,
        interests,
        dreams,
        specialNeeds
      },
      include: {
        family: {
          include: {
            community: true
          }
        }
      }
    })

    res.status(201).json({
      success: true,
      data: child,
      message: 'Child created successfully'
    })
  } catch (error) {
    console.error('Error creating child:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create child'
    })
  }
}

export const updateChild = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const updateData = req.body

    if (updateData.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateData.dateOfBirth)
    }

    const child = await prisma.child.update({
      where: { id },
      data: updateData,
      include: {
        family: {
          include: {
            community: true
          }
        },
        sponsor: true
      }
    })

    res.json({
      success: true,
      data: child,
      message: 'Child updated successfully'
    })
  } catch (error) {
    console.error('Error updating child:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update child'
    })
  }
}