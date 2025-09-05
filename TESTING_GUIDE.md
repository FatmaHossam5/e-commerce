# 🧪 API Testing Guide

## 🌐 Your Live API Base URLs
- **Main**: https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app
- **API**: https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1

## 🔧 **Method 1: Browser Testing (Easiest)**

### **Quick Browser Tests:**
1. **Welcome Page**: https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app
2. **API Docs**: https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1
3. **Products**: https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/product/productList

## 🛠️ **Method 2: Postman Testing (Best for Portfolio)**

### **Download Postman:**
1. Go to https://www.postman.com/downloads/
2. Download and install Postman
3. Create a free account

### **Import This Collection:**

Create a new collection in Postman with these requests:

#### **1. Welcome Page**
- **Method**: GET
- **URL**: `https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app`

#### **2. API Documentation**
- **Method**: GET  
- **URL**: `https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1`

#### **3. Get All Products**
- **Method**: GET
- **URL**: `https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/product/productList`

#### **4. Admin Login** (if environment variables are set)
- **Method**: POST
- **URL**: `https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "email": "admin@fatmaecommerce.com",
  "password": "FatmaAdmin123!"
}
```

#### **5. User Registration Test**
- **Method**: POST
- **URL**: `https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/auth/sign`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "userName": "Test User",
  "email": "test@example.com",
  "password": "TestPassword123",
  "cPassword": "TestPassword123"
}
```

## 💻 **Method 3: Command Line Testing**

### **PowerShell Commands:**

```powershell
# Test welcome page
Invoke-RestMethod -Uri "https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app"

# Test API documentation
Invoke-RestMethod -Uri "https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1"

# Test product list
Invoke-RestMethod -Uri "https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/product/productList"

# Test admin login
$body = @{email="admin@fatmaecommerce.com"; password="FatmaAdmin123!"} | ConvertTo-Json
Invoke-RestMethod -Uri "https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/auth/login" -Method POST -Body $body -ContentType "application/json"
```

### **curl Commands (if you have curl):**

```bash
# Welcome page
curl https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app

# API documentation
curl https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1

# Product list
curl https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/product/productList

# Admin login
curl -X POST https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fatmaecommerce.com","password":"FatmaAdmin123!"}'
```

## 🔧 **Method 4: Local Testing**

If you want to test locally alongside your live version:

```bash
# Make sure you have the .env file set up
npm run dev

# Test locally
curl http://localhost:3000/api/v1/product/productList
```

## 🎯 **Expected Responses**

### **✅ Welcome Page Response:**
```json
{
  "success": true,
  "message": "🛒 E-Commerce API - Portfolio Project",
  "version": "1.0.0",
  "author": "Fatma Hossam",
  "description": "Professional Node.js E-Commerce API with security hardening",
  "endpoints": { ... },
  "features": [ ... ],
  "status": "🟢 Live & Ready for Portfolio Demo"
}
```

### **✅ Product List Response:**
```json
{
  "message": "Done",
  "finalProducts": []
}
```

### **✅ Admin Login Response (if configured):**
```json
{
  "message": "Done",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🚀 **Portfolio Demo Script**

### **For Job Interviews:**

1. **Open browser** to your live API
2. **Show welcome page**: "This is my live e-commerce API"
3. **Navigate to `/api/v1`**: "Here's the complete API documentation"
4. **Open Postman**: "Let me demonstrate the endpoints"
5. **Test product list**: Show it working
6. **Explain architecture**: Point to GitHub repo
7. **Highlight security**: Mention rate limiting, validation, etc.

### **Key Points to Mention:**
- "This is a **live production API** deployed on Vercel"
- "It uses **MongoDB Atlas** for cloud database"
- "I implemented **comprehensive security** including rate limiting"
- "The code is **fully documented** on GitHub"
- "It demonstrates **modern Node.js** development practices"

## 🔍 **Troubleshooting**

### **If Admin Login Fails:**
- Environment variables might not be set on Vercel
- This is normal for a demo - focus on other working endpoints

### **If Any Endpoint Fails:**
- Check the URL is correct
- Verify the API is deployed (check Vercel dashboard)
- Try the browser test first

### **For Portfolio Purposes:**
- Even if some features need environment setup, the architecture and code quality are what matter
- Focus on the working endpoints and professional documentation

---

## 🎊 **Your API is Live and Testable!**

Your e-commerce API is successfully deployed and ready for portfolio demonstrations. The working endpoints prove your technical capabilities, and the comprehensive documentation shows your professionalism!
