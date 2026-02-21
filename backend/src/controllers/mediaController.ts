import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const prisma = new PrismaClient()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/media'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|pdf/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only images, videos, and PDFs are allowed.'))
  }
}

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: fileFilter
})

export const getMediaByChild = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId } = req.params
    const { mediaType } = req.query

    // Since there's no Media model in schema, we'll use Letter model for media
    const where: any = { 
      childId,
      letterType: { in: ['PHOTO', 'VIDEO'] }
    }
    
    if (mediaType) {
      where.letterType = mediaType.toString().toUpperCase()
    }

    const media = await prisma.letter.findMany({
      where,
      include: {
        child: {
          select: {
            firstName: true,
            lastName: true,
            childCode: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      data: media,
      count: media.length
    })
  } catch (error) {
    console.error('Error fetching media:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media'
    })
  }
}

export const uploadMedia = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId, sponsorId, description, mediaType } = req.body
    const userId = req.user?.id

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
      return
    }

    const fileUrl = `/uploads/media/${req.file.filename}`
    
    // Determine letter type based on file extension
    const ext = path.extname(req.file.originalname).toLowerCase()
    let letterType: 'PHOTO' | 'VIDEO' | 'TEXT'
    
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
      letterType = 'PHOTO'
    } else if (['.mp4', '.mov', '.avi'].includes(ext)) {
      letterType = 'VIDEO'
    } else {
      letterType = 'TEXT' // For PDFs and other documents
    }

    const media = await prisma.letter.create({
      data: {
        childId,
        sponsorId,
        direction: 'FROM_CHILD',
        letterType,
        content: description || '',
        fileUrl,
        sentDate: new Date(),
        status: 'DELIVERED',
        handledBy: userId,
        notes: `Uploaded by staff: ${req.file.originalname}`
      },
      include: {
        child: {
          select: {
            firstName: true,
            lastName: true,
            childCode: true
          }
        }
      }
    })

    res.status(201).json({
      success: true,
      data: media,
      message: 'Media uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading media:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to upload media'
    })
  }
}

export const deleteMedia = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const media = await prisma.letter.findUnique({
      where: { id }
    })

    if (!media) {
      res.status(404).json({
        success: false,
        message: 'Media not found'
      })
      return
    }

    // Delete file from filesystem
    if (media.fileUrl) {
      const filePath = path.join(process.cwd(), media.fileUrl)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    await prisma.letter.delete({
      where: { id }
    })

    res.json({
      success: true,
      message: 'Media deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting media:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete media'
    })
  }
}