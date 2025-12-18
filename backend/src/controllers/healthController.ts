import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()

export const getHealthRecords = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId, recordType } = req.query
    
    const where: any = {}
    
    if (childId) {
      where.childId = childId as string
    }
    
    if (recordType) {
      where.recordType = recordType
    }

    const records = await prisma.healthRecord.findMany({
      where,
      include: {
        child: {
          include: {
            family: {
              include: {
                community: true
              }
            }
          }
        }
      },
      orderBy: { recordDate: 'desc' }
    })

    res.json({
      success: true,
      data: records,
      count: records.length
    })
  } catch (error) {
    console.error('Error fetching health records:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch health records'
    })
  }
}

export const createHealthRecord = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      childId,
      recordType,
      title,
      description,
      diagnosis,
      treatment,
      medications,
      hospitalName,
      doctorName,
      followUpDate
    } = req.body

    const userId = req.user?.id

    const record = await prisma.healthRecord.create({
      data: {
        childId,
        recordDate: new Date(),
        recordType,
        title,
        description,
        diagnosis,
        treatment,
        medications,
        hospitalName,
        doctorName,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
        createdBy: userId
      },
      include: {
        child: {
          include: {
            family: {
              include: {
                community: true
              }
            }
          }
        }
      }
    })

    res.status(201).json({
      success: true,
      data: record,
      message: 'Health record created successfully'
    })
  } catch (error) {
    console.error('Error creating health record:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create health record'
    })
  }
}