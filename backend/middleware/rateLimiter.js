import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        error: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
})

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        error: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
})

export const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        error: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
})