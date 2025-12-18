# Security Guidelines

## 🔒 Environment Variables

**NEVER commit these files:**
- `.env`
- `.env.production` 
- `.env.local`
- Any file containing real credentials

**Always use:**
- `.env.example` templates
- Environment variables in deployment platforms
- Strong, randomly generated secrets

## 🛡️ Production Security

**JWT Secrets:**
- Generate with: `openssl rand -hex 32`
- Use different secrets for access/refresh tokens
- Minimum 32 characters, preferably 64

**Database:**
- Use strong passwords (16+ chars, mixed case, numbers, symbols)
- Enable SSL connections in production
- Restrict database access to application only

**CORS:**
- Set specific origins in production (not `*`)
- Update after frontend deployment

## 🚨 Before Deployment

1. ✅ Check `.gitignore` excludes all `.env*` files
2. ✅ Generate new JWT secrets for production  
3. ✅ Use strong database passwords
4. ✅ Set specific CORS origins
5. ✅ Never commit real credentials to Git

## 📝 Safe Sharing

**For Portfolio/GitHub:**
- ✅ Use `.env.example` templates
- ✅ Include setup instructions
- ✅ Document required environment variables
- ❌ Never include real API keys, passwords, or secrets