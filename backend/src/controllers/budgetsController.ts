import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getBudgets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { familyId, status, budgetPeriod } = req.query
    
    const where: any = {}
    
    if (familyId) where.familyId = familyId as string
    if (status) where.status = status
    if (budgetPeriod) where.budgetPeriod = budgetPeriod as string

    const budgets = await prisma.budget.findMany({
      where,
      include: {
        family: {
          include: {
            community: true,
            children: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      data: budgets,
      count: budgets.length
    })
  } catch (error) {
    console.error('Error fetching budgets:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch budgets'
    })
  }
}

export const createBudget = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      familyId,
      budgetPeriod,
      totalAmount,
      currency = 'RWF',
      categories,
      explanation
    } = req.body

    const userId = req.user?.id

    const budget = await prisma.budget.create({
      data: {
        familyId,
        budgetPeriod,
        totalAmount,
        currency,
        categories,
        explanation,
        status: 'DRAFT',
        submittedBy: userId
      },
      include: {
        family: {
          include: {
            community: true,
            children: true
          }
        }
      }
    })

    res.status(201).json({
      success: true,
      data: budget,
      message: 'Budget created successfully'
    })
  } catch (error) {
    console.error('Error creating budget:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create budget'
    })
  }
}

export const submitBudget = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?.id

    const budget = await prisma.budget.update({
      where: { id },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
        submittedBy: userId
      },
      include: {
        family: {
          include: {
            community: true
          }
        }
      }
    })

    res.json({
      success: true,
      data: budget,
      message: 'Budget submitted for review'
    })
  } catch (error) {
    console.error('Error submitting budget:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit budget'
    })
  }
}