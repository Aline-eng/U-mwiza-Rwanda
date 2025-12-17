import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { childId, sponsorId, status, transactionType } = req.query
    
    const where: any = {}
    
    if (childId) where.childId = childId as string
    if (sponsorId) where.sponsorId = sponsorId as string
    if (status) where.status = status
    if (transactionType) where.transactionType = transactionType

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        child: {
          include: {
            family: {
              include: { community: true }
            }
          }
        },
        sponsor: true
      },
      orderBy: { transactionDate: 'desc' }
    })

    res.json({
      success: true,
      data: transactions,
      count: transactions.length
    })
  } catch (error) {
    console.error('Error fetching transactions:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions'
    })
  }
}

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      childId,
      sponsorId,
      amount,
      currency = 'RWF',
      transactionType,
      paymentMethod,
      referenceNumber,
      notes
    } = req.body

    // Generate transaction code
    const transactionCount = await prisma.transaction.count()
    const transactionCode = `TXN${String(transactionCount + 1).padStart(3, '0')}`

    const transaction = await prisma.transaction.create({
      data: {
        transactionCode,
        childId,
        sponsorId,
        amount,
        currency,
        transactionDate: new Date(),
        transactionType,
        paymentMethod,
        referenceNumber,
        notes,
        status: 'PENDING'
      },
      include: {
        child: {
          include: {
            family: {
              include: { community: true }
            }
          }
        },
        sponsor: true
      }
    })

    res.status(201).json({
      success: true,
      data: transaction,
      message: 'Transaction created successfully'
    })
  } catch (error) {
    console.error('Error creating transaction:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create transaction'
    })
  }
}