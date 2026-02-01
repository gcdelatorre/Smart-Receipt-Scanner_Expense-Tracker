import rateLimit from "express-rate-limit";

// rate limiting are used to prevent abuse of the API or brute force attacks or ddos attacks

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 25,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
})

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
})

export const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
})