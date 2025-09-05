import jwt from 'jsonwebtoken'
import crypto from 'crypto'

/**
 * Generate a secure random token
 * @param {number} length - Token length
 * @returns {string} - Random token
 */
export const generateSecureToken = (length = 32) => {
    return crypto.randomBytes(length).toString('hex')
}

/**
 * Generate a strong JWT secret
 * @returns {string} - JWT secret
 */
export const generateJWTSecret = () => {
    return crypto.randomBytes(64).toString('hex')
}

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input
    
    return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .trim()
        .substring(0, 1000) // Limit length
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result
 */
export const validatePassword = (password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    const isValid = password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers
    
    return {
        isValid,
        errors: [
            ...(password.length < minLength ? ['Password must be at least 8 characters long'] : []),
            ...(!hasUpperCase ? ['Password must contain at least one uppercase letter'] : []),
            ...(!hasLowerCase ? ['Password must contain at least one lowercase letter'] : []),
            ...(!hasNumbers ? ['Password must contain at least one number'] : []),
        ]
    }
}

/**
 * Create secure session token
 * @param {object} payload - Token payload
 * @param {string} secret - JWT secret
 * @param {string} expiresIn - Token expiration
 * @returns {string} - JWT token
 */
export const createSecureToken = (payload, secret, expiresIn = '24h') => {
    return jwt.sign(payload, secret, { 
        expiresIn,
        issuer: 'ecommerce-api',
        audience: 'ecommerce-users'
    })
}

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token
 * @param {string} secret - JWT secret
 * @returns {object} - Decoded payload or null
 */
export const verifySecureToken = (token, secret) => {
    try {
        return jwt.verify(token, secret, {
            issuer: 'ecommerce-api',
            audience: 'ecommerce-users'
        })
    } catch (error) {
        return null
    }
}

/**
 * Hash sensitive data
 * @param {string} data - Data to hash
 * @returns {string} - Hashed data
 */
export const hashData = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex')
}

export default {
    generateSecureToken,
    generateJWTSecret,
    sanitizeInput,
    isValidEmail,
    validatePassword,
    createSecureToken,
    verifySecureToken,
    hashData
}
