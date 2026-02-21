import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'
import { z } from 'zod'

const prisma = new PrismaClient()

const createFamilySchema = z.object({
  familyCode: z.string().min(1, 'Family code is required'),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  guardianName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  communityId: z.string().min(1, 'Community ID is required')
})

export const getFamilies = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { communityId, status } = req.query

    const where: any = {}
    if (communityId) where.communityId = communityId
    if (status) where.status = status

    const families = await prisma.family.findMany({
      where,
      include: {
        community: true,
        children: true
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

export const createFamily = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const validatedData = createFamilySchema.parse(req.body)

    const family = await prisma.family.create({
      data: {
        familyCode: validatedData.familyCode,
        fatherName: validatedData.fatherName,
        motherName: validatedData.motherName,
        guardianName: validatedData.guardianName,
        address: validatedData.address,
        phone: validatedData.phone,
        communityId: validatedData.communityId,
        enrollmentDate: new Date(),
        status: 'ACTIVE'
      },
      include: {
        community: true,
        children: true
      }
    })

    res.status(201).json({
      success: true,
      data: family,
      message: 'Family created successfully'
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

    console.error('Error creating family:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create family'
    })
  }
}

export const getFamilyById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const family = await prisma.family.findUnique({
      where: { id },
      include: {
        community: true,
        children: true
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