# 📁 Project Structure

## **Root Directory**
```
e-commerce/
├── 📁 config/              # Environment configuration
├── 📁 DB/                  # Database models and connection
├── 📁 src/                 # Application source code
├── 📁 node_modules/        # Dependencies (auto-generated)
├── 📄 .gitignore          # Git ignore rules
├── 📄 DEPLOYMENT.md       # Deployment instructions
├── 📄 env.example         # Environment variables template
├── 📄 IMPROVEMENTS.md     # Project improvements log
├── 📄 index.js            # Application entry point
├── 📄 package.json        # Node.js dependencies and scripts
├── 📄 package-lock.json   # Locked dependency versions
├── 📄 QUICK_SETUP.md      # Quick setup guide
├── 📄 README.md           # Project documentation
├── 📄 SECURITY.md         # Security guidelines
├── 📄 PROJECT_STRUCTURE.md # This file
└── 📄 vercel.json         # Vercel deployment config
```

## **Source Code Structure (`src/`)**
```
src/
├── 📁 middleware/          # Express middleware
│   ├── auth.js            # Authentication middleware
│   └── validation.js      # Request validation middleware
├── 📁 modules/            # Feature modules (MVC pattern)
│   ├── 📁 auth/           # Authentication module
│   ├── 📁 brand/          # Brand management
│   ├── 📁 cart/           # Shopping cart
│   ├── 📁 category/       # Product categories
│   ├── 📁 coupon/         # Discount coupons
│   ├── 📁 order/          # Order processing
│   ├── 📁 product/        # Product management
│   ├── 📁 reviews/        # Product reviews
│   ├── 📁 subcategory/    # Product subcategories
│   ├── 📁 user/           # User management
│   ├── 📁 wishlist/       # User wishlist
│   └── index.router.js    # Main router configuration
└── 📁 services/           # Shared services
    ├── AddAdmin.js        # Admin account creation
    ├── cloudinary.js      # Image upload service
    ├── email.js           # Email service
    ├── errorHandling.js   # Error handling utilities
    ├── multer.js          # File upload configuration
    ├── pagination.js      # Pagination utilities
    ├── security.js        # Security utilities
    └── seedData.js        # Database seeding
```

## **Database Structure (`DB/`)**
```
DB/
├── 📁 model/              # Mongoose models
│   ├── brand.model.js     # Brand schema
│   ├── cart.model.js      # Shopping cart schema
│   ├── category.model.js  # Category schema
│   ├── coupon.model.js    # Coupon schema
│   ├── order.model.js     # Order schema
│   ├── product.model.js   # Product schema
│   ├── review.model.js    # Review schema
│   ├── subcategory.model.js # Subcategory schema
│   └── user.model.js      # User schema
├── connection.js          # MongoDB connection
└── DBMethods.js           # Database abstraction layer
```

## **Module Structure (Example: `auth/`)**
```
modules/auth/
├── 📁 controller/         # Business logic
│   └── registration.js    # Auth controllers
├── auth.endPoint.js       # Route permissions
├── auth.router.js         # Route definitions
└── auth.validation.js     # Input validation schemas
```

## **Configuration (`config/`)**
```
config/
└── .env                   # Environment variables (NOT in repo)
```

## **Key Files Explained**

### **Entry Point**
- `index.js` - Application startup and configuration

### **Core Configuration**
- `src/modules/index.router.js` - Main application router with middleware
- `DB/connection.js` - Database connection setup
- `package.json` - Dependencies and scripts

### **Security**
- `.gitignore` - Prevents sensitive files from being committed
- `SECURITY.md` - Security guidelines and best practices
- `src/services/security.js` - Security utility functions

### **Documentation**
- `README.md` - Main project documentation
- `DEPLOYMENT.md` - Deployment instructions
- `QUICK_SETUP.md` - Quick start guide
- `IMPROVEMENTS.md` - Development improvements log

### **Development**
- `env.example` - Environment variables template
- `src/services/seedData.js` - Sample data for testing

---

## 🏗️ **Architecture Patterns**

### **MVC (Model-View-Controller)**
- **Models**: `DB/model/` - Data schemas
- **Controllers**: `src/modules/*/controller/` - Business logic
- **Routes**: `src/modules/*/router.js` - API endpoints

### **Service Layer**
- **Services**: `src/services/` - Reusable business logic
- **Middleware**: `src/middleware/` - Request processing

### **Database Abstraction**
- **DBMethods**: `DB/DBMethods.js` - Consistent database operations
- **Models**: Mongoose schemas with validation

This structure promotes:
- ✅ **Modularity** - Each feature is self-contained
- ✅ **Scalability** - Easy to add new features
- ✅ **Maintainability** - Clear separation of concerns
- ✅ **Security** - Proper file organization and protection
