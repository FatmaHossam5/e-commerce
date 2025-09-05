# 🚀 Quick Environment Setup Guide

## **Step-by-Step Setup for Your Portfolio**

### **1. Create .env File (REQUIRED)**
1. In VS Code, right-click in the `config` folder
2. Select "New File" 
3. Name it exactly: `.env`
4. Copy and paste this content:

```env
# Basic Configuration for Testing
PORT=3000
BASEURL=/api/v1
MOOD=DEV

# Database - MongoDB Atlas (Set up below)
DBURI=mongodb://localhost:27017/ecommerce

# JWT Secret (Generate a secure one)
emailToken=my-super-secret-jwt-token-for-development-use-only-change-in-production
BearerKey=Bearer__

# Password Hashing
SALTROUND=10

# Email (Optional for testing - set up later)
nodeMailerEmail=test@example.com
nodeMailerPassword=dummy-password

# Cloudinary (Optional for testing)
cloud_name=dummy
api_key=dummy
api_secret=dummy

# Admin Account
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=Admin123!

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### **2. Set Up MongoDB Atlas (Database)**

**Why Atlas?** ✅ Free, ✅ No installation, ✅ Portfolio-ready

1. **Go to**: https://www.mongodb.com/atlas
2. **Sign up** with your email
3. **Create a FREE cluster**:
   - Choose "M0 Sandbox" (Free tier)
   - Select a region close to you
   - Click "Create Cluster"

4. **Set up database access**:
   - Go to "Database Access" → "Add New Database User"
   - Username: `ecommerce-user`
   - Password: Generate a secure password
   - Database User Privileges: "Read and write to any database"

5. **Set up network access**:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your current IP address

6. **Get connection string**:
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `ecommerce`

7. **Update your .env file**:
   ```env
   DBURI=mongodb+srv://ecommerce-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce
   ```

### **3. Test Your Setup**

```bash
# In your terminal, run:
npm run dev

# You should see:
# "Example app listening on port 3000!"
# "DB Connected successfully..."
# "Admin Added Done" or "There is Admin"
```

### **4. Create Demo Data**

```bash
# Run the seed script to create sample data:
node src/services/seedData.js
```

### **5. Test API Endpoints**

**Using curl or Postman:**

```bash
# Test server is running
curl http://localhost:3000/api/v1/

# Register a new user
curl -X POST http://localhost:3000/api/v1/auth/sign \
  -H "Content-Type: application/json" \
  -d '{"userName":"Test User","email":"test@example.com","password":"Test123456"}'

# Login (admin account)
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"Admin123!"}'
```

---

## **Optional Enhancements (For Full Portfolio)**

### **Email Service (Gmail)**
1. **Enable 2-Factor Authentication** on your Gmail
2. **Generate App Password**:
   - Google Account → Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update .env**:
   ```env
   nodeMailerEmail=your-email@gmail.com
   nodeMailerPassword=your-16-char-app-password
   ```

### **Image Upload (Cloudinary)**
1. **Sign up** at https://cloudinary.com (free tier)
2. **Get credentials** from dashboard
3. **Update .env**:
   ```env
   cloud_name=your-cloud-name
   api_key=your-api-key
   api_secret=your-api-secret
   ```

---

## **Troubleshooting**

### **Common Issues:**

**"Cannot find package 'helmet'"**
```bash
npm install helmet express-rate-limit express-mongo-sanitize
```

**"DB Connection Failed"**
- Check your MongoDB Atlas connection string
- Ensure IP address is whitelisted
- Verify username/password

**"Port already in use"**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or change PORT in .env to 3001
```

**"JWT Error"**
- Ensure emailToken is at least 32 characters
- Check Bearer token format in requests

---

## **🎯 Portfolio Demo Ready!**

Once setup is complete, you'll have:
- ✅ Secure API with authentication
- ✅ Database with sample data  
- ✅ Admin and user accounts
- ✅ Full CRUD operations
- ✅ Professional error handling

**Demo Accounts:**
- **Admin**: admin@test.com / Admin123!
- **Demo User**: user@demo.com / user123 (after running seed script)

Your e-commerce API is now ready to impress! 🚀
