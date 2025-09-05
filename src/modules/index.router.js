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
