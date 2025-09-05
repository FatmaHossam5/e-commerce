#  E-Commerce API



A full-featured RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB.

##  Live Demo
** API is live and ready to use!**
- **Live URL**: https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1
- **Status**: ✅ Active and deployed on Vercel
- **Database**: ✅ Connected to MongoDB Atlas

## 🚀 Features

- **User Authentication** (JWT-based with email verification)
- **Product Management** (CRUD with image upload via Cloudinary)
- **Shopping Cart & Orders** (Full order processing system)
- **Category Management** (Categories, subcategories, and brands)
- **Coupon System** (Discount management)
- **Product Reviews & Ratings**
- **Wishlist Functionality**
- **Admin Panel** (Role-based access control)
- **Email Notifications** (Welcome, confirmation, password reset)

## 🛠️ Tech Stack

- **Runtime**: Node.js v14.x
- **Framework**: Express.js v4.18.2
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Validation**: Joi
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the `config` folder:
   ```env
   # Server Configuration
   PORT=3000
   BASEURL=/api/v1
   MOOD=DEV

   # Database
   DBURI=mongodb://localhost:27017/ecommerce

   # JWT Secrets
   emailToken=your-jwt-secret-here
   BearerKey=Bearer__

   # Password Hashing
   SALTROUND=8

   # Email Configuration (Gmail)
   nodeMailerEmail=your-email@gmail.com
   nodeMailerPassword=your-app-password

   # Cloudinary Configuration
   cloud_name=your-cloudinary-name
   api_key=your-cloudinary-key
   api_secret=your-cloudinary-secret

   # Admin Configuration
   ADMIN_USERNAME=admin
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=secure-password-here
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

##  API Documentation

### Base URLs
** Production (Live)**
```
https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1
```

**🔧 Development (Local)**
```
http://localhost:3000/api/v1
```

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer__<your-jwt-token>
```

### Main Endpoints

#### Authentication
- `POST /auth/sign` - User registration
- `POST /auth/login` - User login
- `GET /auth/confirmEmail/:token` - Email confirmation
- `POST /auth/forgetPassword` - Password reset

#### Products
- `GET /product/productList` - Get all products
- `POST /product` - Create product (Admin only)
- `PUT /product/:id` - Update product (Admin only)

#### Shopping
- `POST /cart` - Add to cart
- `POST /order` - Create order
- `GET /order` - Get user orders

#### Categories
- `GET /category` - Get all categories
- `POST /category` - Create category (Admin only)

### Request/Response Examples

#### User Registration (Live API)
```bash
curl -X POST https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/auth/sign \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

#### Admin Login (Live API)
```bash
curl -X POST https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@fatmaecommerce.com",
    "password": "FatmaAdmin123!"
  }'
```

#### Get Products (Live API)
```bash
curl https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/product/productList
```

## 🏗️ Project Structure

```
├── config/              # Configuration files
├── DB/
│   ├── connection.js    # Database connection
│   ├── DBMethods.js     # Database abstraction layer
│   └── model/           # Mongoose models
├── src/
│   ├── middleware/      # Authentication & validation
│   ├── modules/         # Feature modules (MVC)
│   └── services/        # Shared services
├── index.js            # Application entry point
└── vercel.json         # Deployment configuration
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation with Joi
- Role-based access control
- Email verification system
- CORS protection

## 🚀 Deployment

### Live Production Deployment
**The API is already deployed and running!**

- **Live URL**: https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1
- **Platform**: Vercel
- **Status**: ✅ Active
- **Database**: MongoDB Atlas (Cloud)
- **SSL**: ✅ HTTPS Enabled

### 🔗 Quick Links
- **📱 Live API**: [Try it now!](https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/product/productList)
- **⚙️ Vercel Dashboard**: [Manage deployment](https://vercel.com/fatmahossam5s-projects/e-commerce)
- **📊 GitHub Repository**: [View source code](https://github.com/FatmaHossam5/e-commerce)

### 🧪 Test the Live API
Try these working examples:

**API Welcome & Documentation:**
```bash
curl https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1
```
*Returns: Complete API documentation, endpoints list, demo credentials, and portfolio info*

**Get All Products:**
```bash
curl https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/product/productList
```

** Admin Login:**
```bash
curl -X POST https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fatmaecommerce.com","password":"FatmaAdmin123!"}'
```

### For Your Own Deployment
1. Fork this repository
2. Install Vercel CLI: `npm i -g vercel`
3. Run: `vercel --prod`
4. Set environment variables in Vercel dashboard
5. Configure MongoDB Atlas connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request


## 🏆 Portfolio Showcase

### 💼 Professional Highlights
This project demonstrates:
- ✅ **Full-stack API development** with Node.js & Express
- ✅ **Cloud deployment** on Vercel with MongoDB Atlas
- ✅ **Production-ready security** (JWT, bcrypt, rate limiting, CORS)
- ✅ **RESTful API design** with comprehensive documentation
- ✅ **Database modeling** with Mongoose ODM
- ✅ **File upload handling** with Cloudinary integration
- ✅ **Email services** with Nodemailer
- ✅ **Environment configuration** for dev/prod environments

### 🎯 Key Technical Achievements
- **Live Production API** serving real requests
- **Scalable architecture** with modular design patterns
- **Comprehensive error handling** and validation
- **Admin panel functionality** with role-based access
- **Shopping cart and order processing** system
- **Product catalog with search and filtering**

### 🌟 Perfect for Demonstrating
- Backend development expertise
- Cloud deployment skills
- API design and documentation
- Database management
- Security best practices
- Production environment setup

## 👨‍💻 Author

**Fatma Hossam** 
-  **Live API**: [e-commerce-api.vercel.app](https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1)
-  **GitHub**: [FatmaHossam5](https://github.com/FatmaHossam5)


---



This live, working API demonstrates real-world development skills:
- **Try the live demo**: https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/api/v1/product/productList
- **View the code**: https://github.com/FatmaHossam5/e-commerce
- **See it in action**: Working authentication, CRUD operations, and more!


