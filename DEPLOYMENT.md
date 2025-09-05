# 🚀 Deployment Guide

## Quick Start for Portfolio Demo

### 1. **Environment Setup**
Copy the example environment file and configure it:
```bash
cp env.example .env
```

**Required Environment Variables:**
```env
# Essential for demo
PORT=3000
BASEURL=/api/v1
MOOD=DEV
DBURI=mongodb://localhost:27017/ecommerce
emailToken=your-jwt-secret-minimum-32-characters-long
SALTROUND=10

# For production
ADMIN_USERNAME=your-admin-username
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-secure-admin-password
```

### 2. **Local Development**
```bash
# Install dependencies
npm install

# Start MongoDB (if using local)
mongod

# Run development server
npm run dev

# Seed demo data (optional)
node src/services/seedData.js
```

### 3. **Production Deployment Options**

#### Option A: Vercel (Recommended for API)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

#### Option B: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

#### Option C: Render
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### 4. **Database Setup**

#### MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create cluster (free tier available)
3. Get connection string
4. Update `DBURI` in environment variables

#### Local MongoDB
```bash
# Install MongoDB
# Windows: Download from mongodb.com
# macOS: brew install mongodb-community
# Linux: sudo apt install mongodb

# Start service
mongod
```

### 5. **Essential Configuration**

#### Cloudinary (Image Upload)
1. Create account at [Cloudinary](https://cloudinary.com)
2. Get API credentials from dashboard
3. Add to environment variables:
```env
cloud_name=your-cloud-name
api_key=your-api-key
api_secret=your-api-secret
```

#### Email Service (Gmail)
1. Enable 2-factor authentication on Gmail
2. Generate app password
3. Add to environment variables:
```env
nodeMailerEmail=your-email@gmail.com
nodeMailerPassword=your-16-char-app-password
```

### 6. **Security Checklist**

- ✅ Environment variables configured
- ✅ Strong JWT secret (min 32 characters)
- ✅ Secure admin password
- ✅ CORS origins properly set
- ✅ Rate limiting enabled
- ✅ Input sanitization active

### 7. **Testing the Deployment**

#### Health Check
```bash
curl https://your-api-url.com/api/v1/health
```

#### Test Authentication
```bash
# Register user
curl -X POST https://your-api-url.com/api/v1/auth/sign \
  -H "Content-Type: application/json" \
  -d '{"userName":"Test User","email":"test@example.com","password":"Test123456"}'

# Login
curl -X POST https://your-api-url.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456"}'
```

### 8. **Monitoring & Maintenance**

#### Security Audits
```bash
# Check for vulnerabilities
npm run security-audit

# Fix issues
npm run security-fix
```

#### Performance Monitoring
- Monitor API response times
- Check database query performance
- Monitor memory usage

### 9. **Portfolio Demo Setup**

#### Sample Data
```bash
# Run seed script to create demo data
node src/services/seedData.js
```

#### Demo Accounts
- **Admin**: admin@demo.com / admin123
- **User**: user@demo.com / user123

#### API Documentation
Create a Postman collection with example requests:
- User registration/login
- Product CRUD operations
- Order creation
- Cart management

### 10. **Troubleshooting**

#### Common Issues

**Connection Errors:**
```bash
# Check MongoDB connection
mongo your-connection-string

# Verify environment variables
echo $DBURI
```

**CORS Errors:**
- Ensure frontend domain is in `ALLOWED_ORIGINS`
- Check protocol (http vs https)

**Authentication Issues:**
- Verify JWT secret is set
- Check token expiration
- Confirm user email is verified

#### Logs
```bash
# Check application logs
heroku logs --tail  # For Heroku
vercel logs         # For Vercel
```

---

## 🎯 Portfolio Presentation Tips

1. **Demo Flow:**
   - Show user registration → email confirmation
   - Admin login → product creation
   - User shopping → cart → checkout

2. **Technical Highlights:**
   - RESTful API design
   - JWT authentication
   - Role-based access control
   - File upload with Cloudinary
   - Email notifications
   - Security best practices

3. **Code Walkthrough:**
   - Modular architecture
   - Database abstraction layer
   - Error handling middleware
   - Input validation
   - Security measures
