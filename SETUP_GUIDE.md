# Complete Setup Guide - Database, JWT & AWS

## 🗄️ Part 1: PostgreSQL Database Setup

### Step 1: Open SQL Shell (psql)

1. **Open SQL Shell (psql)** from your Start Menu
2. Press **Enter** for all default prompts until you reach password
3. Enter your PostgreSQL password (set during installation)

```
Server [localhost]:          [Press Enter]
Database [postgres]:         [Press Enter]
Port [5432]:                 [Press Enter]
Username [postgres]:         [Press Enter]
Password for user postgres:  [Enter your password]
```

### Step 2: Create Database

```sql
-- Create the database
CREATE DATABASE umwiza_rwanda;

-- Verify it was created
\l

-- You should see umwiza_rwanda in the list
```

### Step 3: Create Database User (Optional but Recommended)

```sql
-- Create a dedicated user for the application
CREATE USER umwiza WITH PASSWORD 'umwizapassword2024';

-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON DATABASE umwiza_rwanda TO umwiza;

-- Connect to the new database
\c umwiza_rwanda

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO umwiza;
```

### Step 4: Verify Connection

```sql
-- Connect to your new database
\c umwiza_rwanda

-- Check connection
SELECT current_database();

-- Should show: umwiza_rwanda
```

### Step 5: Get Your Connection String

**Option A: Using postgres user (simpler for development)**
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/umwiza_rwanda"
```

**Option B: Using dedicated user (recommended)**
```
DATABASE_URL="postgresql://umwiza:umwiza_password_2024@localhost:5432/umwiza_rwanda"
```

**Replace:**
- `YOUR_PASSWORD` with your actual PostgreSQL password
- `localhost` with your server address (usually localhost for local dev)
- `5432` with your PostgreSQL port (default is 5432)

### Step 6: Test Connection

```sql
-- In psql, connected to umwiza_rwanda database
SELECT version();

-- Should show PostgreSQL version
```

### Step 7: Exit psql

```sql
\q
```

---

## 🔐 Part 2: Generate JWT Secrets

### Method 1: Using Node.js (Recommended)

1. **Open Command Prompt or PowerShell**

2. **Run these commands:**

```bash
# Generate JWT Access Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate JWT Refresh Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Example Output:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2
```

### Method 2: Using PowerShell

```powershell
# Generate JWT Access Secret
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})

# Generate JWT Refresh Secret
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

### Method 3: Using Online Tool

1. Go to: https://www.uuidgenerator.net/
2. Click "Generate" twice
3. Copy both UUIDs
4. Combine them for longer secrets

### Method 4: Manual (Quick but less secure)

```
JWT_ACCESS_SECRET=umwiza_rwanda_access_secret_2024_change_in_production
JWT_REFRESH_SECRET=umwiza_rwanda_refresh_secret_2024_change_in_production
```

⚠️ **Important:** Change these in production!

---

## ☁️ Part 3: AWS Credentials Setup

### Option A: For Development (Skip AWS, Use Local Storage)

**You can skip AWS for now and use local file storage:**

1. In `backend/.env`, comment out AWS variables:
```env
# AWS S3 (File Storage) - OPTIONAL FOR DEVELOPMENT
# AWS_ACCESS_KEY_ID=your-aws-access-key
# AWS_SECRET_ACCESS_KEY=your-aws-secret-key
# AWS_REGION=us-east-1
# AWS_S3_BUCKET=umwiza-rwanda-files
```

2. Files will be stored locally in `backend/uploads/` folder

### Option B: Set Up AWS (For Production)

#### Step 1: Create AWS Account

1. Go to: https://aws.amazon.com/
2. Click "Create an AWS Account"
3. Follow the registration process
4. **Note:** Requires credit card, but has free tier

#### Step 2: Create IAM User

1. **Login to AWS Console**: https://console.aws.amazon.com/
2. **Search for "IAM"** in the top search bar
3. Click **"Users"** in the left sidebar
4. Click **"Add users"** button

**User Details:**
- User name: `umwiza-rwanda-app`
- Access type: ✅ **Programmatic access**
- Click **"Next: Permissions"**

#### Step 3: Set Permissions

1. Click **"Attach existing policies directly"**
2. Search and select: **"AmazonS3FullAccess"**
3. Click **"Next: Tags"** (skip tags)
4. Click **"Next: Review"**
5. Click **"Create user"**

#### Step 4: Save Credentials

⚠️ **IMPORTANT:** This is your ONLY chance to see the secret key!

You'll see:
```
Access key ID:     AKIAIOSFODNN7EXAMPLE
Secret access key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

**Copy both immediately!**

#### Step 5: Create S3 Bucket

1. **Search for "S3"** in AWS Console
2. Click **"Create bucket"**

**Bucket Settings:**
- Bucket name: `umwiza-rwanda-files` (must be globally unique)
- Region: `us-east-1` (or your preferred region)
- Block all public access: ✅ **Keep checked** (for security)
- Click **"Create bucket"**

#### Step 6: Configure Bucket CORS

1. Click on your bucket name
2. Go to **"Permissions"** tab
3. Scroll to **"Cross-origin resource sharing (CORS)"**
4. Click **"Edit"**
5. Paste this configuration:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
        "ExposeHeaders": ["ETag"]
    }
]
```

6. Click **"Save changes"**

---

## 📝 Part 4: Update .env File

### Step 1: Navigate to Backend Folder

```bash
cd backend
```

### Step 2: Copy .env.example to .env

**Windows Command Prompt:**
```bash
copy .env.example .env
```

**Windows PowerShell:**
```bash
Copy-Item .env.example .env
```

### Step 3: Edit .env File

Open `backend/.env` in your text editor and update:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database (UPDATE THIS)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/umwiza_rwanda"

# JWT Secrets (UPDATE THESE)
JWT_ACCESS_SECRET=your_generated_access_secret_here
JWT_REFRESH_SECRET=your_generated_refresh_secret_here
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Redis (Optional for development)
REDIS_URL=redis://localhost:6379

# AWS S3 (UPDATE THESE or comment out for local storage)
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_S3_BUCKET=umwiza-rwanda-files

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload Limits (in bytes)
MAX_FILE_SIZE_IMAGE=5242880
MAX_FILE_SIZE_VIDEO=52428800
MAX_FILE_SIZE_DOCUMENT=10485760

# Logging
LOG_LEVEL=info
```

---

## ✅ Part 5: Verify Setup

### Step 1: Test Database Connection

```bash
# In backend folder
npm install
npm run prisma:generate
```

**Expected output:**
```
✔ Generated Prisma Client
```

### Step 2: Run Database Migrations

```bash
npm run prisma:migrate
```

**Expected output:**
```
✔ Database migrations completed
```

### Step 3: Test Backend Server

```bash
npm run dev
```

**Expected output:**
```
Server running on port 5000
Environment: development
Database connected successfully
```

### Step 4: Test Health Endpoint

Open browser or use curl:
```
http://localhost:5000/health
```

**Expected response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🔧 Troubleshooting

### Database Connection Failed

**Error:** "Can't reach database server"

**Solutions:**
1. Check PostgreSQL is running:
   - Windows: Open Services, look for "postgresql"
   - Should say "Running"

2. Verify password in DATABASE_URL

3. Test connection in psql:
```sql
psql -U postgres -d umwiza_rwanda
```

### JWT Errors

**Error:** "JWT secret not defined"

**Solution:**
- Ensure JWT_ACCESS_SECRET and JWT_REFRESH_SECRET are set in .env
- No spaces around the = sign
- No quotes needed

### AWS Errors

**Error:** "AWS credentials not found"

**Solutions:**
1. For development: Comment out AWS variables in .env
2. For production: Verify credentials are correct
3. Check IAM user has S3 permissions

### Port Already in Use

**Error:** "Port 5000 is already in use"

**Solution:**
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

---

## 📋 Quick Reference

### PostgreSQL Commands

```sql
\l                          -- List databases
\c database_name            -- Connect to database
\dt                         -- List tables
\du                         -- List users
\q                          -- Quit psql
```

### Your Credentials Template

```env
# Save this securely!

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/umwiza_rwanda"

JWT_ACCESS_SECRET=YOUR_GENERATED_SECRET_1
JWT_REFRESH_SECRET=YOUR_GENERATED_SECRET_2

AWS_ACCESS_KEY_ID=YOUR_AWS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET
AWS_S3_BUCKET=umwiza-rwanda-files
```

---

## 🎉 Success Checklist

- [ ] PostgreSQL database created
- [ ] Database user created (optional)
- [ ] Connection string obtained
- [ ] JWT secrets generated
- [ ] AWS account created (or skipped for dev)
- [ ] IAM user created
- [ ] S3 bucket created
- [ ] .env file updated
- [ ] Prisma client generated
- [ ] Database migrations run
- [ ] Backend server starts successfully
- [ ] Health endpoint responds

**All done? You're ready to develop! 🚀**

---

## 🔒 Security Reminders

1. **Never commit .env file to Git** (already in .gitignore)
2. **Change all secrets in production**
3. **Use strong passwords**
4. **Rotate AWS keys regularly**
5. **Enable MFA on AWS account**
6. **Keep credentials secure**

---

**Need help?** Check [GETTING_STARTED.md](GETTING_STARTED.md) for more troubleshooting!
