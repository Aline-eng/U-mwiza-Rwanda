import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()

export const getStaffDashboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { community: true }
    })

    if (!user || user.role !== 'STAFF') {
      res.status(403).json({ success: false, message: 'Access denied' })
      return
    }

    const communityId = user.communityId || ''

    // Get stats for staff's community
    const [
      totalChildren,
      pendingBudgets,
      healthAlerts,
      newLetters,
      recentActivity,
      pendingTasks
    ] = await Promise.all([
      prisma.child.count({
        where: { family: { communityId } }
      }),
      prisma.budget.count({
        where: { 
          family: { communityId },
          status: 'SUBMITTED'
        }
      }),
      prisma.healthRecord.count({
        where: {
          child: { family: { communityId } },
          recordType: 'ILLNESS',
          recordDate: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      }),
      prisma.letter.count({
        where: {
          child: { family: { communityId } },
          status: 'PENDING'
        }
      }),
      prisma.auditLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      prisma.task.findMany({
        where: { 
          assignedTo: userId,
          status: { in: ['PENDING', 'IN_PROGRESS'] }
        },
        orderBy: { dueDate: 'asc' },
        take: 5
      })
    ])

    res.json({
      success: true,
      data: {
        user: {
          name: `${user.firstName} ${user.lastName}`,
          community: user.community?.name
        },
        stats: {
          totalChildren,
          pendingBudgets,
          healthAlerts,
          newLetters
        },
        recentActivity,
        pendingTasks
      }
    })
  } catch (error) {
    console.error('Error fetching staff dashboard:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard data' })
  }
}

export const getAdminDashboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user || user.role !== 'ADMIN') {
      res.status(403).json({ success: false, message: 'Access denied' })
      return
    }

    const [
      totalStaff,
      totalChildren,
      budgetCount,
      taskCount,
      activeCommunities,
      staffPerformance,
      recentActivity
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'STAFF', isActive: true } }),
      prisma.child.count({ where: { status: 'ACTIVE' } }),
      prisma.budget.count({ where: { status: 'SUBMITTED' } }),
      prisma.task.count({ where: { status: 'PENDING' } }),
      prisma.community.count({ where: { isActive: true } }),
      prisma.user.findMany({
        where: { role: 'STAFF' },
        include: {
          community: true,
          tasks: {
            where: { status: { in: ['COMPLETED', 'PENDING', 'IN_PROGRESS'] } }
          }
        }
      }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { user: true }
      })
    ])

    const pendingApprovals = budgetCount + taskCount

    res.json({
      success: true,
      data: {
        stats: {
          totalStaff,
          totalChildren,
          pendingApprovals,
          activeCommunities
        },
        staffPerformance: staffPerformance.map(staff => ({
          name: `${staff.firstName} ${staff.lastName}`,
          community: staff.community?.name,
          totalTasks: staff.tasks.length,
          completedTasks: staff.tasks.filter(t => t.status === 'COMPLETED').length
        })),
        recentActivity
      }
    })
  } catch (error) {
    console.error('Error fetching admin dashboard:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard data' })
  }
}