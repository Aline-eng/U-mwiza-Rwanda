import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getEducationRecords = async (req: Request, res: Response): Promise<void> => {
  try {
    const { childId, academicYear } = req.query
    
    const where: any = {}
    
    if (childId) {
      where.childId = childId as string
    }
    
    if (academicYear) {
      where.academicYear = academicYear as string
    }

    const records = await prisma.educationRecord.findMany({
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
      orderBy: [
        { academicYear: 'desc' },
        { term: 'desc' }
      ]
    })

    res.json({
      success: true,
      data: records,
      count: records.length
    })
  } catch (error) {
    console.error('Error fetching education records:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch education records'
    })
  }
}

export const createEducationRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      childId,
      academicYear,
      term,
      gradeLevel,
      schoolName,
      attendancePercentage,
      overallGrade,
      overallPercentage,
      rankInClass,
      totalStudents,
      teacherName,
      teacherComments,
      subjects,
      achievements,
      challenges
    } = req.body

    const userId = req.user?.id

    const record = await prisma.educationRecord.create({
      data: {
        childId,
        academicYear,
        term,
        gradeLevel,
        schoolName,
        attendancePercentage,
        overallGrade,
        overallPercentage,
        rankInClass,
        totalStudents,
        teacherName,
        teacherComments,
        subjects,
        achievements,
        challenges,
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
      message: 'Education record created successfully'
    })
  } catch (error) {
    console.error('Error creating education record:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create education record'
    })
  }
}