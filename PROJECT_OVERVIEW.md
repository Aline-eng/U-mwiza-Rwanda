# U'mwiza Rwanda - Complete System Documentation

## 🎯 Project Overview

A modern, secure, API-driven humanitarian platform for U'mwiza Rwanda - supporting families, connecting sponsors, managing scholarships, and coordinating community services.

## 🏗️ System Architecture

### Technology Stack

**Frontend:**
- Next.js 14 (React 18)
- TypeScript
- TailwindCSS + Shadcn/ui
- Framer Motion (animations)
- React Query (data fetching)
- Zustand (state management)
- React Hook Form + Zod (validation)

**Backend:**
- Node.js + Express.js
- TypeScript
- PostgreSQL (primary database)
- Prisma ORM
- JWT + Refresh Tokens
- Multer + AWS S3 (file storage)
- Socket.io (real-time notifications)
- Redis (caching & sessions)

**DevOps:**
- Docker & Docker Compose
- Nginx (reverse proxy)
- PM2 (process management)
- GitHub Actions (CI/CD)

## 📁 Project Structure

```
umwiza-rwanda/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/             # Utilities & configs
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   └── types/           # TypeScript types
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                 # Express API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Auth, validation, etc.
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper functions
│   │   └── config/          # Configuration
│   ├── prisma/              # Database schema
│   └── package.json
│
├── docs/                    # Documentation
├── docker-compose.yml       # Container orchestration
└── README.md
```

## 🎨 Design System

### Color Palette
```
Primary: #2563EB (Blue 600)
Secondary: #10B981 (Green 500)
Accent: #F59E0B (Amber 500)
Background: #FFFFFF
Surface: #F9FAFB (Gray 50)
Text Primary: #111827 (Gray 900)
Text Secondary: #6B7280 (Gray 500)
Error: #EF4444 (Red 500)
Success: #10B981 (Green 500)
Warning: #F59E0B (Amber 500)
```

### Typography
- Headings: Inter (Bold)
- Body: Inter (Regular)
- Monospace: JetBrains Mono

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

## 🔐 Security Features

1. **Authentication:**
   - JWT access tokens (15min expiry)
   - Refresh tokens (7 days)
   - HTTP-only cookies
   - CSRF protection

2. **Authorization:**
   - Role-based access control (RBAC)
   - Resource-level permissions
   - Community-based data isolation

3. **Data Protection:**
   - Bcrypt password hashing
   - Input validation & sanitization
   - SQL injection prevention (Prisma)
   - XSS protection
   - Rate limiting
   - File upload validation

4. **Audit Trail:**
   - All critical actions logged
   - User activity tracking
   - Change history

## 📊 Database Schema Overview

### Core Entities
- Users (Staff & Admin)
- Communities
- Families
- Children
- Sponsors
- Health Records
- Education Records
- Budgets
- Action Plans
- Transactions
- Letters
- Events
- Tasks
- Notifications
- Audit Logs

## 🚀 Key Features

### Public Landing Page
- Hero slider with impact stories
- Mission, vision, values
- Programs overview
- Impact statistics
- Success stories
- Upcoming events
- Contact information

### Staff Portal
- Community-specific dashboard
- Family & child management
- Health records tracking
- Education progress monitoring
- Budget preparation
- Action plan creation
- File uploads (letters, videos, photos)
- Sponsor letter management
- Task notifications
- Activity reporting

### Admin Portal
- Staff management
- System-wide analytics
- Task approval workflow
- Event management
- Activity monitoring
- Report generation
- System configuration

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px, 1536px
- Touch-optimized interfaces
- Progressive Web App (PWA) capabilities

## 🔔 Notification System

- Real-time Socket.io notifications
- In-app notification center
- Email notifications (optional)
- Push notifications (PWA)
- Notification categories:
  - Urgent tasks
  - Sponsor letters
  - Missing reports
  - System alerts
  - Task approvals

## 📤 File Management

- Supported formats:
  - Images: JPG, PNG, WEBP
  - Videos: MP4, WEBM
  - Documents: PDF
- Max file sizes:
  - Images: 5MB
  - Videos: 50MB
  - Documents: 10MB
- Cloud storage: AWS S3 / Cloudinary
- Automatic image optimization
- Video transcoding

## 🎯 Performance Optimization

- Server-side rendering (SSR)
- Static site generation (SSG) for landing page
- Image optimization (Next.js Image)
- Code splitting
- Lazy loading
- Redis caching
- Database query optimization
- CDN for static assets

## 🧪 Testing Strategy

- Unit tests: Jest + React Testing Library
- Integration tests: Supertest
- E2E tests: Playwright
- API testing: Postman/Newman
- Load testing: k6

## 📈 Analytics & Monitoring

- Application monitoring: Sentry
- Performance monitoring: Vercel Analytics
- Database monitoring: Prisma Studio
- Log aggregation: Winston + CloudWatch
- Uptime monitoring: UptimeRobot

## 🌍 Deployment Strategy

**Development:**
- Local Docker containers
- Hot reload enabled

**Staging:**
- AWS EC2 / DigitalOcean
- Automated deployments
- Testing environment

**Production:**
- AWS / Vercel (frontend)
- AWS EC2 / Railway (backend)
- RDS PostgreSQL
- S3 for file storage
- CloudFront CDN
- SSL/TLS certificates
- Automated backups
- Zero-downtime deployments

## 📋 Development Phases

### Phase 1: Foundation (Week 1-2)
- Project setup
- Database schema
- Authentication system
- Basic API structure

### Phase 2: Core Features (Week 3-4)
- Staff portal
- Family management
- File uploads
- Notification system

### Phase 3: Admin Features (Week 5-6)
- Admin dashboard
- Task management
- Event management
- Reporting system

### Phase 4: Public Site (Week 7)
- Landing page
- Content management
- SEO optimization

### Phase 5: Testing & Polish (Week 8)
- Comprehensive testing
- Performance optimization
- Security audit
- Documentation

### Phase 6: Deployment (Week 9)
- Production setup
- Data migration
- Training materials
- Go-live

## 🎨 Additional Creative Features

1. **Interactive Community Map:** Visual representation of communities served
2. **Child Milestone Timeline:** Visual progress tracking for each child
3. **Smart Budget Analyzer:** AI-powered budget recommendations
4. **Activity Heatmap:** Visual representation of staff activity
5. **Document OCR:** Automatic text extraction from scanned letters
6. **In-app Messaging:** Real-time chat between staff and admin
7. **Dark Mode:** User preference support
8. **Offline Mode:** PWA with offline capabilities
9. **Multi-language Support:** Kinyarwanda, English, French
10. **Export Center:** Centralized report generation

## 📞 Support & Maintenance

- Regular security updates
- Database backups (daily)
- Performance monitoring
- Bug tracking system
- User feedback collection
- Feature request management

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Maintained by:** Development Team
