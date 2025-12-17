import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getFamilies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { communityId, status } = req.query
    
    const where: any = {}
    
    if (communityId) {
      where.communityId = communityId as string
    }
    
    if (status) {
      where.status = status
    }

    const families = await prisma.family.findMany({
      where,
      include: {
        community: true,
        children: {
          include: {
            sponsor: true
          }
        },
        _count: {
          select: {
            children: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      data: families,
      count: families.length
    })
  } catch (error) {
    console.error('Error fetching families:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch families'
    })
  }
}

export const getFamilyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const family = await prisma.family.findUnique({
      where: { id },
      include: {
        community: true,
        children: {
          include: {
            sponsor: true,
            healthRecords: {
              orderBy: { recordDate: 'desc' },
              take: 3
            },
            educationRecords: {
              orderBy: { createdAt: 'desc' },
              take: 3
            }
          }
        },
        budgets: {
          orderBy: { createdAt: 'desc' }
        },
        actionPlans: {
          orderBy: { year: 'desc' }
        }
      }
    })

    if (!family) {
      res.status(404).json({
        success: false,
        message: 'Family not found'
      })
      return
    }

    res.json({
      success: true,
      data: family
    })
  } catch (error) {
    console.error('Error fetching family:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch family'
    })
  }
}

export const createFamily = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      communityId,
      fatherName,
      fatherAge,
      fatherOccupation,
      motherName,
      motherAge,
      motherOccupation,
      guardianName,
      guardianRelationship,
      address,
      phone,
      housingType,
      incomeLevel,
      notes
    } = req.body

    // Generate family code
    const familyCount = await prisma.family.count()
    const familyCode = `FAM${String(familyCount + 1).padStart(3, '0')}`

    const family = await prisma.family.create({
      data: {
        communityId,
        familyCode,
        fatherName,
        fatherAge,
        fatherOccupation,
        motherName,
        motherAge,
        motherOccupation,
        guardianName,
        guardianRelationship,
        address,
        phone,
        housingType,
        incomeLevel,
        enrollmentDate: new Date(),
        notes
      },
      include: {
        community: true
      }
    })

    res.status(201).json({
      success: true,
      data: family,
      message: 'Family created successfully'
    })
  } catch (error) {
    console.error('Error creating family:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create family'
    })
  }
}