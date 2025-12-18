import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'

const prisma = new PrismaClient()

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const { status, priority, assignedTo } = req.query
    
    let where: any = {}
    
    if (req.user?.role === 'STAFF') {
      where.assignedTo = userId
    }
    
    if (status) {
      where.status = status
    }
    
    if (priority) {
      where.priority = priority
    }
    
    if (assignedTo && req.user?.role === 'ADMIN') {
      where.assignedTo = assignedTo as string
    }

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
      orderBy: { createdAt: 'desc' }
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

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      assignedTo,
      priority,
      dueDate,
      taskType
    } = req.body

    const userId = req.user?.id

    const task = await prisma.task.create({
      data: {
        title,
        description,
        assignedTo,
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
        taskType: taskType || 'GENERAL',
        status: 'PENDING',
        assignedBy: userId
      },
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

    res.status(201).json({
      success: true,
      data: task,
      message: 'Task created successfully'
    })
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create task'
    })
  }
}

export const updateTaskStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { status, completionNotes } = req.body
    const userId = req.user?.id

    const task = await prisma.task.findUnique({ where: { id } })
    
    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' })
      return
    }

    if (req.user?.role === 'STAFF' && task.assignedTo !== userId) {
      res.status(403).json({ success: false, message: 'Access denied' })
      return
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        status,
        adminComments: completionNotes,
        completedAt: status === 'COMPLETED' ? new Date() : null
      },
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