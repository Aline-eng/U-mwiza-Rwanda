# U'mwiza Rwanda - Humanitarian Platform

A comprehensive, modern, secure, API-driven platform for managing humanitarian operations, family sponsorships, and community development in Rwanda.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)

## 🌟 Overview

U'mwiza Rwanda is a full-stack web application designed to:
- Support poor families through structured programs
- Connect sponsors with children in need
- Manage scholarships for bright but disadvantaged students
- Coordinate volunteers and community services
- Track family progress and development
- Facilitate communication between sponsors and families

## ✨ Features

### Public Website
- ✅ Modern, responsive landing page
- ✅ Mission, vision, and values presentation
- ✅ Programs overview
- ✅ Impact statistics
- ✅ Success stories
- ✅ Upcoming events
- ✅ Contact information

### Staff Portal
- ✅ Community-specific dashboard
- ✅ Family and child management
- ✅ Health records tracking
- ✅ Education progress monitoring
- ✅ Budget preparation and submission
- ✅ Yearly action plan creation
- ✅ File uploads (letters, videos, photos)
- ✅ Sponsor letter management
- ✅ Real-time notifications
- ✅ Task management
- ✅ Activity reporting

### Admin Portal
- ✅ System-wide dashboard
- ✅ Staff management
- ✅ Task approval workflow
- ✅ Event management
- ✅ Activity monitoring
- ✅ Report generation
- ✅ System analytics
- ✅ Audit logs

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Refresh Tokens
- **File Storage**: AWS S3
- **Real-time**: Socket.io
- **Caching**: Redis
- **Logging**: Winston

### DevOps
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Hosting**: AWS / Vercel
- **Monitoring**: Sentry

## 📁 Project Structure

```
umwiza-rwanda/
├── backend/                    # Express API
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Custom middleware
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Helper functions
│   │   └── server.ts          # Entry point
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # Next.js app
│   ├── src/
│   │   ├── app/               # App router pages
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Utilities
│   │   ├── services/          # API services
│   │   ├── store/             # State management
│   │   └── types/             # TypeScript types
│   ├── public/                # Static assets
│   ├── package.json
│   └── tailwind.config.ts
│
├── docs/                       # Documentation
├── PROJECT_OVERVIEW.md         # System overview
├── DATABASE_SCHEMA.md          # Database documentation
├── API_DOCUMENTATION.md        # API reference
├── DESIGN_SYSTEM.md            # Design guidelines
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Redis (optional, for caching)
- AWS Account (for file storage)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-org/umwiza-rwanda.git
cd umwiza-rwanda
```

2. **Backend Setup**
```bash
cd backend
npm install

# Copy environment variables
copy .env.example .env

# Edit .env with your configuration
# Update DATABASE_URL, JWT secrets, AWS credentials, etc.

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed initial data (optional)
npm run seed
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Create .env.local
echo NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1 > .env.local
```

### Running the Application

**Development Mode:**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/health

### Default Login Credentials

After seeding the database:
```
Admin:
Email: aadmin@umwiza.org
Password: admminn123!

Staff:
Email: sstaff@umwiza.org
Password: ssttaff123!
```

**⚠️ Change these credentials immediately in production!**

## 💻 Development

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages

### Database Migrations

```bash
# Create a new migration
npm run prisma:migrate

# Reset database (development only)
npx prisma migrate reset

# Open Prisma Studio
npm run prisma:studio
```

### API Testing

Use the provided Postman collection in `docs/postman/` or test endpoints directly:

```bash
# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@umwiza.org","password":"admin123"}'

# Get communities (with token)
curl http://localhost:5000/api/v1/communities \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 🚢 Deployment

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Deployment

**Backend (AWS EC2 / Railway):**
1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations
4. Start the server with PM2

**Frontend (Vercel):**
1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Environment Variables

**Production Backend (.env):**
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_ACCESS_SECRET=your-production-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=your-bucket-name
CORS_ORIGIN=https://umwizarwanda.org
```

**Production Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://api.umwizarwanda.org/api/v1
```

## 📚 Documentation

- [Project Overview](PROJECT_OVERVIEW.md) - System architecture and features
- [Database Schema](DATABASE_SCHEMA.md) - Complete database structure
- [API Documentation](API_DOCUMENTATION.md) - All API endpoints
- [Design System](DESIGN_SYSTEM.md) - UI/UX guidelines

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 🔒 Security

- All passwords are hashed with bcrypt
- JWT tokens with short expiry
- Refresh token rotation
- CORS protection
- Rate limiting
- Input validation
- SQL injection prevention (Prisma)
- XSS protection
- File upload validation
- Audit logging

## 📊 Monitoring

- Application logs: Winston
- Error tracking: Sentry
- Performance: Vercel Analytics
- Uptime: UptimeRobot
- Database: Prisma Studio

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Project Lead**: [Name]
- **Backend Developer**: [Name]
- **Frontend Developer**: [Name]
- **UI/UX Designer**: [Name]

## 📞 Support

For support, email support@umwizarwanda.org or join our Slack channel.

## 🙏 Acknowledgments

- Inspired by Unbound.org's humanitarian work
- Built with love for the people of Rwanda
- Special thanks to all contributors and volunteers

---

**Made with ❤️ for U'mwiza Rwanda**
