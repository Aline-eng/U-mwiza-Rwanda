import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()

export const getSystemOverview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user || user.role !== 'ADMIN') {
      res.status(403).json({ success: false, message: 'Access denied' })
      return
    }

    const [
      totalChildren,
      sponsoredChildren,
      totalFamilies,
      activeCommunities,
      totalTransactions,
      totalTransactionAmount
    ] = await Promise.all([
      prisma.child.count({ where: { status: 'ACTIVE' } }),
      prisma.child.count({ where: { status: 'ACTIVE', isSponsored: true } }),
      prisma.family.count({ where: { status: 'ACTIVE' } }),
      prisma.community.count({ where: { isActive: true } }),
      prisma.transaction.count(),
      prisma.transaction.aggregate({
        _sum: { amount: true }
      })
    ])

    const sponsorshipRate = totalChildren > 0 ? Math.round((sponsoredChildren / totalChildren) * 100) : 0

    res.json({
      success: true,
      data: {
        overview: {
          totalChildren,
          sponsoredChildren,
          sponsorshipRate,
          totalFamilies,
          activeCommunities,
          totalTransactions,
          totalTransactionAmount: totalTransactionAmount._sum.amount || 0
        }
      }
    })
  } catch (error) {
    console.error('Error generating system overview:', error)
    res.status(500).json({ success: false, message: 'Failed to generate system overview' })
  }
}

export const getStaffPerformance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user || user.role !== 'ADMIN') {
      res.status(403).json({ success: false, message: 'Access denied' })
      return
    }

    const staffMembers = await prisma.user.findMany({
      where: { role: 'STAFF', isActive: true },
      include: {
        community: true,
        tasks: {
          where: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
            }
          }
        }
      }
    })

    const staffPerformance = staffMembers.map(staff => {
      const totalTasks = staff.tasks.length
      const completedTasks = staff.tasks.filter(task => task.status === 'COMPLETED').length
      const pendingTasks = staff.tasks.filter(task => task.status === 'PENDING').length
      const overdueTasks = staff.tasks.filter(task => 
        task.status !== 'COMPLETED' && task.dueDate && new Date(task.dueDate) < new Date()
      ).length

      return {
        name: `${staff.firstName} ${staff.lastName}`,
        email: staff.email,
        community: staff.community?.name || 'Unassigned',
        totalTasks,
        completedTasks,
        pendingTasks,
        overdueTasks,
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
      }
    })

    res.json({
      success: true,
      data: {
        staffPerformance
      }
    })
  } catch (error) {
    console.error('Error generating staff performance report:', error)
    res.status(500).json({ success: false, message: 'Failed to generate staff performance report' })
  }
}

export const getCommunityImpact = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user || user.role !== 'ADMIN') {
      res.status(403).json({ success: false, message: 'Access denied' })
      return
    }

    const communities = await prisma.community.findMany({
      where: { isActive: true },
      include: {
        families: {
          include: {
            children: true
          }
        }
      }
    })

    const communityStats = communities.map(community => {
      const totalFamilies = community.families.length
      const totalChildren = community.families.reduce((sum, family) => sum + family.children.length, 0)
      const sponsoredChildren = community.families.reduce(
        (sum, family) => sum + family.children.filter(child => child.isSponsored).length, 
        0
      )
      const impactRate = totalChildren > 0 ? Math.round((sponsoredChildren / totalChildren) * 100) : 0

      return {
        name: community.name,
        location: community.location,
        totalFamilies,
        totalChildren,
        sponsoredChildren,
        impactRate
      }
    })

    res.json({
      success: true,
      data: {
        communityStats
      }
    })
  } catch (error) {
    console.error('Error generating community impact report:', error)
    res.status(500).json({ success: false, message: 'Failed to generate community impact report' })
  }
}