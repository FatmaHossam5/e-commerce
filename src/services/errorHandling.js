export const asyncHandler = (fun) => {
    return (req, res, next) => {
        Promise.resolve(fun(req, res, next)).catch(err => {
            // Handle different types of errors
            if (err.name === 'ValidationError') {
                return next(new Error('Validation Error: ' + err.message, { cause: 400 }))
            }
            if (err.name === 'CastError') {
                return next(new Error('Invalid ID format', { cause: 400 }))
            }
            if (err.code === 11000) {
                const field = Object.keys(err.keyValue)[0]
                return next(new Error(`${field} already exists`, { cause: 409 }))
            }
            next(new Error(err.message || 'Internal Server Error', { cause: err.cause || 500 }))
        })
    }
}

export const globalErrorHandling = (err, req, res, next) => {
    if (err) {
        const statusCode = err.cause || 500
        
        // Log error for monitoring (in production, use proper logging service)
        if (process.env.MOOD === 'DEV') {
            console.error('Error:', {
                message: err.message,
                stack: err.stack,
                url: req.url,
                method: req.method,
                timestamp: new Date().toISOString()
            })
        }

        // Send appropriate response
        if (process.env.MOOD === 'DEV') {
            return res.status(statusCode).json({
                success: false,
                message: err.message,
                stack: err.stack,
                error: err
            })
        } else {
            // In production, don't expose internal error details
            const message = statusCode >= 500 ? 'Internal Server Error' : err.message
            return res.status(statusCode).json({
                success: false,
                message
            })
        }
    }
}






