# 🚀 Start Backend - Quick Guide

## ✅ Prerequisites Checklist

Before starting the backend, ensure:

- [ ] PostgreSQL is installed and running
- [ ] Database `umwiza_rwanda` is created
- [ ] Node.js is installed (v18+)
- [ ] Dependencies are installed (`npm install`)

## 📝 Step-by-Step Startup

### 1. Update Database Connection

Edit `backend/.env` file and update the DATABASE_URL with YOUR PostgreSQL password:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/umwiza_rwanda"
```

Replace `YOUR_PASSWORD` with your actual PostgreSQL password.

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Generate Prisma Client

```bash
npm run prisma:generate
```

Expected output:
```
✔ Generated Prisma Client
```

### 4. Run Database Migrations

```bash
npm run prisma:migrate
```

This will create all the database tables.

### 5. Start the Backend

```bash
npm run dev
```

Expected output:
```
[nodemon] starting `ts-node src/server.ts`
Server running on port 5000
Environment: development
Database connected successfully
```

### 6. Test the Backend

Open your browser or use curl:

```
http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔧 Common Issues & Solutions

### Issue 1: "Cannot find module"

**Solution:**
```bash
npm install
```

### Issue 2: "Database connection failed"

**Solution:**
1. Check PostgreSQL is running
2. Verify DATABASE_URL in .env
3. Test connection:
```bash
psql -U postgres -d umwiza_rwanda
```

### Issue 3: "Port 5000 already in use"

**Solution:**
```bash
# Find and kill the process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

### Issue 4: "Prisma Client not generated"

**Solution:**
```bash
npm run prisma:generate
```

### Issue 5: TypeScript compilation errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 What's Running?

When backend starts successfully, you have:

✅ **Express Server** on port 5000
✅ **PostgreSQL Database** connected
✅ **Socket.io** for real-time features
✅ **API Routes** available at `/api/v1/`

## 🔗 Available Endpoints

### Health Check
```
GET http://localhost:5000/health
```

### Authentication
```
POST http://localhost:5000/api/v1/auth/login
POST http://localhost:5000/api/v1/auth/refresh
POST http://localhost:5000/api/v1/auth/logout
POST http://localhost:5000/api/v1/auth/change-password
```

## 🎯 Next Steps

1. ✅ Backend is running
2. 🚧 Start the frontend (see START_FRONTEND.md)
3. 🚧 Test login functionality
4. 🚧 Start building features

## 💡 Development Tips

- Backend auto-restarts on file changes (nodemon)
- Check logs in `backend/logs/` folder
- Use Prisma Studio to view database: `npm run prisma:studio`
- API documentation: See API_DOCUMENTATION.md

## 🆘 Still Having Issues?

1. Check SETUP_GUIDE.md for detailed setup
2. Check GETTING_STARTED.md for troubleshooting
3. Verify all prerequisites are met
4. Check error logs in `backend/logs/error.log`

---

**Ready to code! 🚀**
