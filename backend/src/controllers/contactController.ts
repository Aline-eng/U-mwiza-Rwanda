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
    
    // Create professional HTML email template
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>UMWIZA RWANDA – Contact Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 30px 40px; text-align: center;">
          <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 1px;">U'MWIZA RWANDA</h1>
          <p style="margin: 8px 0 0 0; color: #dcfce7; font-size: 16px; font-weight: 300;">Transforming Lives Through Compassion</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px;">
          <div style="background-color: #f1f5f9; border-left: 4px solid #16a34a; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
            <h2 style="margin: 0 0 10px 0; color: #1e293b; font-size: 20px; font-weight: 600;">New Contact Form Submission</h2>
            <p style="margin: 0; color: #64748b; font-size: 14px;">Received from U'mwiza Rwanda website</p>
          </div>

          <!-- Contact Details -->
          <div style="margin-bottom: 30px;">
            <h3 style="margin: 0 0 20px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Contact Information</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569; width: 140px;">Full Name:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${validatedData.firstName} ${validatedData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Email:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;"><a href="mailto:${validatedData.email}" style="color: #16a34a; text-decoration: none;">${validatedData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Phone:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${validatedData.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569;">Organization:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${validatedData.organization || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: 600; color: #475569;">Subject:</td>
                <td style="padding: 12px 0; color: #1e293b; font-weight: 600;">${validatedData.subject}</td>
              </tr>
            </table>
          </div>

          <!-- Message -->
          <div style="margin-bottom: 30px;">
            <h3 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Message</h3>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; color: #374151; line-height: 1.7; white-space: pre-wrap;">${validatedData.message}</div>
          </div>

          <!-- Action Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${validatedData.email}?subject=Re: ${validatedData.subject}" style="display: inline-block; background-color: #16a34a; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Reply to ${validatedData.firstName}</a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 25px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #64748b; font-size: 14px;">© ${new Date().getFullYear()} U'mwiza Rwanda - Humanitarian Platform</p>
          <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 12px;">This message was sent from the U'mwiza Rwanda contact form</p>
        </div>
      </div>
    </body>
    </html>
    `

    const mailOptions = {
      from: `"UMWIZA RWANDA" <${process.env.GMAIL_USER}>`,
      to: `"UMWIZA RWANDA" <${process.env.GMAIL_USER}>`,
      subject: 'UMWIZA RWANDA – Contact Message',
      html: htmlContent,
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