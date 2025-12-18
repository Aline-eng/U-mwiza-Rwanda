import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()

export const getEducationRecords = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId, academicYear, term } = req.query
    
    const where: any = {}
    
    if (childId) {
      where.childId = childId as string
    }
    
    if (academicYear) {
      where.academicYear = academicYear
    }
    
    if (term) {
      where.term = term
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
      orderBy: { createdAt: 'desc' }
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

export const createEducationRecord = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      childId,
      academicYear,
      term,
      gradeLevel,
      schoolName,
      attendancePercentage,
      overallPercentage,
      mathGrade,
      englishGrade,
      scienceGrade,
      socialStudiesGrade,
      classRank,
      totalStudents,
      teacherComments,
      achievements,
      challenges
    } = req.body

    const userId = req.user?.id

    const subjects = {
      math: mathGrade ? parseFloat(mathGrade) : null,
      english: englishGrade ? parseFloat(englishGrade) : null,
      science: scienceGrade ? parseFloat(scienceGrade) : null,
      socialStudies: socialStudiesGrade ? parseFloat(socialStudiesGrade) : null
    }

    const record = await prisma.educationRecord.create({
      data: {
        childId,
        academicYear,
        term,
        gradeLevel,
        schoolName,
        attendancePercentage: attendancePercentage ? parseFloat(attendancePercentage) : null,
        overallPercentage: overallPercentage ? parseFloat(overallPercentage) : null,
        rankInClass: classRank ? parseInt(classRank) : null,
        totalStudents: totalStudents ? parseInt(totalStudents) : null,
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