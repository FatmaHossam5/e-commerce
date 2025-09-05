import morgan from 'morgan'
import { globalErrorHandling } from '../services/errorHandling.js'
import authRouter from './auth/auth.router.js'
import brandRouter from './brand/brand.router.js'
import cartRouter from './cart/cart.router.js'
import categoryRouter from './category/category.router.js'
import couponRouter from './coupon/coupon.router.js'
import orderRouter from './order/order.router.js'
import productRouter from './product/product.router.js'
import reviewsRouter from './reviews/reviews.router.js'
import subcategoryRouter from './subcategory/subcategory.router.js'
import userRouter from './user/user.router.js'
import express from 'express'
import connectDB from '../../DB/connection.js'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'





export const appRouter=(app)=>{
    const baseUrl = process.env.BASEURL

    // Security Middleware
    app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" }
    }))
    
    // Rate Limiting
    const limiter = rateLimit({
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
        max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP
        message: 'Too many requests from this IP, please try again later.',
        standardHeaders: true,
        legacyHeaders: false,
    })
    app.use(limiter)

    // Sanitize data against NoSQL injection
    app.use(mongoSanitize())

    //convert Buffer Data
    app.use(express.json({ limit: '10mb' }))
    app.use(express.urlencoded({ extended: false, limit: '10mb' }))

    //setup cors with proper configuration
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000']
    app.use(cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true)
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }))

    // morgan check response
    if (process.env.MOOD === 'DEV') {
        app.use(morgan("dev"))
    } else {
        app.use(morgan("combined"))
    }

  // API Welcome Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "🛒 E-Commerce API - Portfolio Project",
        version: "1.0.0",
        author: "Fatma Hossam",
        description: "Professional Node.js E-Commerce API with security hardening",
        documentation: "https://github.com/FatmaHossam5/e-commerce",
        endpoints: {
            auth: `${req.protocol}://${req.get('host')}${baseUrl}/auth`,
            products: `${req.protocol}://${req.get('host')}${baseUrl}/product/productList`,
            admin_login: `${req.protocol}://${req.get('host')}${baseUrl}/auth/login`,
        },
        features: [
            "JWT Authentication",
            "Role-based Access Control", 
            "Security Middleware (Helmet, Rate Limiting)",
            "MongoDB Atlas Integration",
            "Input Validation & Sanitization",
            "Professional Error Handling"
        ],
        tech_stack: ["Node.js", "Express.js", "MongoDB", "JWT", "Vercel"],
        status: "🟢 Live & Ready for Portfolio Demo"
    })
})

// API v1 Welcome and Documentation Endpoint
app.get(`https://e-commerce-gr8wmbyf3-fatmahossam5s-projects.vercel.app/${baseUrl}`, (req, res) => {
    res.status(200).json({
        success: true,
        message: " E-Commerce API v1 - Portfolio Project by Fatma Hossam",
        version: "1.0.0",
        status: " Live & Operational",
        description: "Professional Node.js E-Commerce API with complete CRUD operations",
        author: {
            name: "Fatma Hossam",
            github: "https://github.com/FatmaHossam5",
            email: "fatmahossam15590@gmail.com"
        },
        tech_stack: {
            runtime: "Node.js 16+",
            framework: "Express.js",
            database: "MongoDB Atlas",
            deployment: "Vercel",
            security: ["JWT", "bcrypt", "Helmet", "Rate Limiting", "CORS"]
        },
        base_url: `${req.protocol}://${req.get('host')}${baseUrl}`,
        quick_test: {
            products: `${req.protocol}://${req.get('host')}${baseUrl}/product/productList`,
            admin_login: `POST ${req.protocol}://${req.get('host')}${baseUrl}/auth/login`
        },
        available_endpoints: {
            " Authentication": {
                "Admin Login": `POST ${baseUrl}/auth/login`,
                "User Register": `POST ${baseUrl}/auth/sign`,
                "Confirm Email": `GET ${baseUrl}/auth/confirmEmail/:token`,
                "Reset Password": `POST ${baseUrl}/auth/forgetPassword`
            },
            "Products": {
                "Get All Products": `GET ${baseUrl}/product/productList`,
                "Create Product": `POST ${baseUrl}/product (Admin)`,
                "Update Product": `PUT ${baseUrl}/product/:id (Admin)`,
                "Delete Product": `DELETE ${baseUrl}/product/:id (Admin)`
            },
            "🛒 Shopping": {
                "Add to Cart": `POST ${baseUrl}/cart`,
                "Create Order": `POST ${baseUrl}/order`,
                "Get User Orders": `GET ${baseUrl}/order`,
                "Add to Wishlist": `POST ${baseUrl}/product/:id/wishlist`
            },
            " Categories": {
                "Get Categories": `GET ${baseUrl}/category`,
                "Create Category": `POST ${baseUrl}/category (Admin)`,
                "Create Subcategory": `POST ${baseUrl}/subCategory (Admin)`
            },
            "Admin Features": {
                "Manage Brands": `POST ${baseUrl}/brand (Admin)`,
                "Manage Coupons": `POST ${baseUrl}/coupon (Admin)`,
                "View Reviews": `GET ${baseUrl}/reviews`,
                "User Management": `GET ${baseUrl}/user (Admin)`
            }
        },
        demo_credentials: {
            note: "Test the admin endpoints with these credentials:",
            admin_email: "admin@fatmaecommerce.com",
            admin_password: "FatmaAdmin123!",
            example_login: `curl -X POST ${req.protocol}://${req.get('host')}${baseUrl}/auth/login -H "Content-Type: application/json" -d '{"email":"admin@fatmaecommerce.com","password":"FatmaAdmin123!"}'`
        },
        portfolio_links: {
            github_repo: "https://github.com/FatmaHossam5/e-commerce",
            live_demo: `${req.protocol}://${req.get('host')}${baseUrl}/product/productList`,
            documentation: `${req.protocol}://${req.get('host')}${baseUrl}`
        }
    })
})

  //Setup API Routing 
app.use(`${baseUrl}/auth`, authRouter)
app.use(`${baseUrl}/user`, userRouter)
app.use(`${baseUrl}/product`, productRouter)
app.use(`${baseUrl}/category`, categoryRouter)
app.use(`${baseUrl}/subCategory`, subcategoryRouter)
app.use(`${baseUrl}/reviews`, reviewsRouter)
app.use(`${baseUrl}/coupon`, couponRouter)
app.use(`${baseUrl}/cart`, cartRouter)
app.use(`${baseUrl}/order`, orderRouter)
app.use(`${baseUrl}/brand`, brandRouter)


 //Handle invalid routes
app.use('*', (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`, { cause: 404 })
    next(error)
})

 //Error Handling
app.use(globalErrorHandling) 

  //connectionDB
connectDB()
}
