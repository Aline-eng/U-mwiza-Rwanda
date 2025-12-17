import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assignedTo, status, taskType, priority } = req.query
    const userId = req.user?.id
    
    const where: any = {}
    
    // Staff can only see their own tasks
    if (req.user?.role === 'STAFF') {
      where.assignedTo = userId
    } else if (assignedTo) {
      where.assignedTo = assignedTo as string
    }
    
    if (status) where.status = status
    if (taskType) where.taskType = taskType
    if (priority) where.priority = priority

    const tasks = await prisma.task.findMany({
      where,
      include: {
        assignedToUser: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        assignedByUser: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' }
      ]
    })

    res.json({
      success: true,
      data: tasks,
      count: tasks.length
    })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks'
    })
  }
}

export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { status, adminComments } = req.body
    const userId = req.user?.id

    // Check if user can update this task
    const task = await prisma.task.findUnique({
      where: { id }
    })

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      })
      return
    }

    if (req.user?.role === 'STAFF' && task.assignedTo !== userId) {
      res.status(403).json({
        success: false,
        message: 'You can only update your own tasks'
      })
      return
    }

    const updateData: any = { status }
    
    if (status === 'COMPLETED') {
      updateData.completedAt = new Date()
    }
    
    if (adminComments) {
      updateData.adminComments = adminComments
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        assignedToUser: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })

    res.json({
      success: true,
      data: updatedTask,
      message: 'Task updated successfully'
    })
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update task'
    })
  }
}