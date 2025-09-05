# 🛒 E-Commerce API

A full-featured RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB.

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

## 📚 API Documentation

### Base URL
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

#### User Registration
```bash
curl -X POST http://localhost:3000/api/v1/auth/sign \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

#### Create Product (Admin)
```bash
curl -X POST http://localhost:3000/api/v1/product \
  -H "Authorization: Bearer__<your-admin-token>" \
  -F "name=Sample Product" \
  -F "price=99.99" \
  -F "stock=50" \
  -F "images=@product-image.jpg"
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

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Set environment variables in Vercel dashboard

### Database Setup
- **Development**: Local MongoDB
- **Production**: MongoDB Atlas recommended

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Fatma** - [GitHub](https://github.com/your-username)

---

⭐ If you found this project helpful, please give it a star!
