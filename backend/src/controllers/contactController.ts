import { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import logger from '../utils/logger'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacy: z.boolean().refine(val => val === true, 'Privacy agreement is required')
})

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  })
}

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = contactSchema.parse(req.body)
    
    // Check if email configuration exists
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      logger.error('Email configuration missing')
      return res.status(500).json({
        success: false,
        message: 'Email service not configured'
      })
    }

    const transporter = createTransporter()
    
    // Compose email
    const emailContent = `
New Contact Form Submission from U'mwiza Rwanda Website

Name: ${validatedData.firstName} ${validatedData.lastName}
Email: ${validatedData.email}
Phone: ${validatedData.phone || 'Not provided'}
Organization: ${validatedData.organization || 'Not provided'}
Subject: ${validatedData.subject}

Message:
${validatedData.message}

---
This message was sent from the U'mwiza Rwanda contact form.
    `.trim()

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to your own email
      subject: 'UMWIZA RWANDA – Contact Message',
      text: emailContent,
      replyTo: validatedData.email
    }

    // Send email
    await transporter.sendMail(mailOptions)
    
    logger.info(`Contact form submitted by ${validatedData.email}`)
    
    res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      })
    }

    logger.error('Contact form submission failed:', error)
    
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    })
  }
}