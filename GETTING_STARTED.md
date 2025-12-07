# Getting Started with U'mwiza Rwanda

## 🚀 Quick Start Guide

This guide will help you set up and run the U'mwiza Rwanda platform on your local machine in under 30 minutes.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

Optional but recommended:
- **Redis** - For caching (can skip for development)
- **Docker Desktop** - For containerized setup

## 🛠️ Installation Steps

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-org/umwiza-rwanda.git

# Navigate to project directory
cd umwiza-rwanda
```

### Step 2: Set Up PostgreSQL Database

**Option A: Using PostgreSQL directly**

```bash
# Create database
psql -U postgres
CREATE DATABASE umwiza_rwanda;
\q
```

**Option B: Using Docker**

```bash
docker run --name umwiza-postgres \
  -e POSTGRES_USER=umwiza \
  -e POSTGRES_PASSWORD=umwiza_password \
  -e POSTGRES_DB=umwiza_rwanda \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Edit .env file with your settings
# Windows: notepad .env
# Mac/Linux: nano .env

# Update these values in .env:
DATABASE_URL="postgresql://umwiza:umwiza_password@localhost:5432/umwiza_rwanda"
JWT_ACCESS_SECRET="your-secret-key-here"
JWT_REFRESH_SECRET="your-refresh-secret-here"

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed initial data (optional)
npm run seed
```

### Step 4: Frontend Setup

```bash
# Open new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
echo NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1 > .env.local
```

### Step 5: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
Environment: development
Database connected successfully
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000
```

### Step 6: Access the Application

Open your browser and navigate to:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 🔑 Default Login Credentials

After seeding the database, use these credentials:

**Admin Account:**
```
Email: admin@umwiza.org
Password: admin123
```

**Staff Account:**
```
Email: staff@umwiza.org
Password: staff123
```

⚠️ **Important**: Change these passwords immediately after first login!

## 🧪 Verify Installation

### Test Backend API

```bash
# Test health endpoint
curl http://localhost:5000/health

# Expected response:
# {"status":"ok","timestamp":"2024-01-15T10:30:00.000Z"}

# Test login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@umwiza.org","password":"admin123"}'

# You should receive an access token
```

### Test Frontend

1. Open http://localhost:3000
2. You should see the landing page
3. Click "Staff Login" button
4. Login with admin credentials
5. You should see the dashboard

## 🐛 Troubleshooting

### Database Connection Issues

**Error**: "Can't reach database server"

**Solution**:
```bash
# Check if PostgreSQL is running
# Windows:
services.msc
# Look for PostgreSQL service

# Mac:
brew services list

# Linux:
sudo systemctl status postgresql

# Verify connection string in .env matches your setup
```

### Port Already in Use

**Error**: "Port 5000 is already in use"

**Solution**:
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env
PORT=5001
```

### Prisma Migration Errors

**Error**: "Migration failed"

**Solution**:
```bash
# Reset database (development only!)
cd backend
npx prisma migrate reset

# This will:
# 1. Drop the database
# 2. Create a new database
# 3. Run all migrations
# 4. Run seed script
```

### Module Not Found Errors

**Error**: "Cannot find module..."

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use npm ci for clean install
npm ci
```

### Frontend Build Errors

**Error**: "Module parse failed"

**Solution**:
```bash
# Clear Next.js cache
cd frontend
rm -rf .next
npm run dev
```

## 📚 Next Steps

Now that you have the application running:

1. **Explore the Documentation**
   - [Project Overview](PROJECT_OVERVIEW.md)
   - [Database Schema](DATABASE_SCHEMA.md)
   - [API Documentation](API_DOCUMENTATION.md)
   - [Design System](DESIGN_SYSTEM.md)

2. **Understand the Code Structure**
   - Backend: `backend/src/`
   - Frontend: `frontend/src/`
   - Database: `backend/prisma/schema.prisma`

3. **Start Development**
   - Create a new branch: `git checkout -b feature/your-feature`
   - Make your changes
   - Test thoroughly
   - Commit and push

4. **Use Development Tools**
   - Prisma Studio: `npm run prisma:studio` (in backend)
   - API Testing: Use Postman or curl
   - Database GUI: pgAdmin or DBeaver

## 🔧 Development Workflow

### Making Database Changes

```bash
# 1. Edit prisma/schema.prisma
# 2. Create migration
npm run prisma:migrate

# 3. Generate Prisma client
npm run prisma:generate

# 4. Restart backend server
```

### Adding New API Endpoints

```bash
# 1. Create controller in src/controllers/
# 2. Create route in src/routes/
# 3. Add route to src/routes/index.ts
# 4. Test with curl or Postman
```

### Adding New Frontend Pages

```bash
# 1. Create page in src/app/
# 2. Create components in src/components/
# 3. Add API service in src/services/
# 4. Test in browser
```

## 🎯 Common Tasks

### Reset Database

```bash
cd backend
npx prisma migrate reset
```

### View Database

```bash
cd backend
npm run prisma:studio
# Opens at http://localhost:5555
```

### Check Logs

```bash
# Backend logs
cd backend
tail -f logs/combined.log

# Or check console output
```

### Run Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📞 Getting Help

If you encounter issues:

1. **Check Documentation**: Review all .md files in the project
2. **Search Issues**: Look for similar issues on GitHub
3. **Ask Team**: Contact the development team
4. **Create Issue**: Open a new issue with details

## 🎉 Success!

You're now ready to start developing! Here are some suggested first tasks:

- [ ] Explore the landing page
- [ ] Login as admin and staff
- [ ] Browse through different sections
- [ ] Create a test family record
- [ ] Add a child record
- [ ] Upload a test file
- [ ] Create a budget
- [ ] Review the code structure

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Happy Coding! 🚀**

If you found this guide helpful, please star the repository and share with your team!
