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

app.get(`${baseUrl}`, (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 E-Commerce API v1 - Endpoints Available",
        base_url: `${req.protocol}://${req.get('host')}${baseUrl}`,
        available_endpoints: {
            authentication: {
                login: `POST ${baseUrl}/auth/login`,
                register: `POST ${baseUrl}/auth/sign`,
                confirm_email: `GET ${baseUrl}/auth/confirmEmail/:token`
            },
            products: {
                list_all: `GET ${baseUrl}/product/productList`,
                create: `POST ${baseUrl}/product (Admin only)`,
                update: `PUT ${baseUrl}/product/:id (Admin only)`
            },
            categories: {
                create: `POST ${baseUrl}/category (Admin only)`,
                subcategories: `POST ${baseUrl}/subCategory (Admin only)`
            },
            shopping: {
                cart: `POST ${baseUrl}/cart`,
                orders: `POST ${baseUrl}/order`,
                wishlist: `POST ${baseUrl}/product/:id/wishlist`
            },
            admin: {
                brands: `POST ${baseUrl}/brand (Admin only)`,
                coupons: `POST ${baseUrl}/coupon (Admin only)`,
                reviews: `GET ${baseUrl}/reviews`
            }
        },
        demo_credentials: {
            note: "Use these credentials to test admin endpoints",
            admin_email: "Set via environment variables",
            admin_password: "Set via environment variables"
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
