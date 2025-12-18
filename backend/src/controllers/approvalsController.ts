import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()

export const getPendingApprovals = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user || user.role !== 'ADMIN') {
      res.status(403).json({ success: false, message: 'Access denied' })
      return
    }

    const [pendingBudgets, pendingTasks, pendingHealthRecords, pendingEducationRecords] = await Promise.all([
      prisma.budget.findMany({
        where: { status: 'SUBMITTED' },
        include: {
          family: {
            include: {
              community: true,
              children: true
            }
          }
        },
        orderBy: { submittedAt: 'desc' }
      }),
      prisma.task.findMany({
        where: { status: 'PENDING' },
        include: {
          assignedToUser: {
            select: { firstName: true, lastName: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.healthRecord.findMany({
        where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
        include: {
          child: {
            include: {
              family: {
                include: { community: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),
      prisma.educationRecord.findMany({
        where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
        include: {
          child: {
            include: {
              family: {
                include: { community: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      })
    ])

    res.json({
      success: true,
      data: {
        budgets: pendingBudgets,
        tasks: pendingTasks,
        healthRecords: pendingHealthRecords,
        educationRecords: pendingEducationRecords,
        summary: {
          totalPending: pendingBudgets.length + pendingTasks.length,
          budgets: pendingBudgets.length,
          tasks: pendingTasks.length,
          recentRecords: pendingHealthRecords.length + pendingEducationRecords.length
        }
      }
    })
  } catch (error) {
    console.error('Error fetching approvals:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch approvals' })
  }
}

export const approveBudget = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { reviewComments } = req.body
    const userId = req.user?.id

    const budget = await prisma.budget.update({
      where: { id },
      data: {
        status: 'APPROVED',
        reviewedBy: userId,
        reviewedAt: new Date(),
        reviewComments
      },
      include: {
        family: {
          include: { community: true }
        }
      }
    })

    res.json({
      success: true,
      data: budget,
      message: 'Budget approved successfully'
    })
  } catch (error) {
    console.error('Error approving budget:', error)
    res.status(500).json({ success: false, message: 'Failed to approve budget' })
  }
}

export const rejectBudget = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { reviewComments } = req.body
    const userId = req.user?.id

    if (!reviewComments) {
      res.status(400).json({ success: false, message: 'Review comments required for rejection' })
      return
    }

    const budget = await prisma.budget.update({
      where: { id },
      data: {
        status: 'REJECTED',
        reviewedBy: userId,
        reviewedAt: new Date(),
        reviewComments
      },
      include: {
        family: {
          include: { community: true }
        }
      }
    })

    res.json({
      success: true,
      data: budget,
      message: 'Budget rejected with feedback'
    })
  } catch (error) {
    console.error('Error rejecting budget:', error)
    res.status(500).json({ success: false, message: 'Failed to reject budget' })
  }
}