import { z } from "zod";

export const loginSchema = z.object({
    body: z.object({
        emailOrUsername: z.string().trim()
            .min(6, "Email or Username must be at least 6 characters")
            .max(100, "Email or Username cannot exceed 100 characters")
            // can only contain @ and dot
            .regex(/^[a-zA-Z0-9_@.]+$/, "No invalid characters allowed"),
        password: z.string().trim()
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password cannot exceed 100 characters"),
    })
});

export const registerSchema = z.object({
    body: z.object({
        name: z.string().trim()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name cannot exceed 50 characters"),
        username: z.string().trim()
            .min(6, "Username must be at least 6 characters")
            .max(30, "Username cannot exceed 30 characters")
            .regex(/^[a-zA-Z0-9_]+$/, "No invalid characters allowed"),
        email: z.string().trim()
            .toLowerCase()
            .email("Invalid email format")
            .max(100, "Email cannot exceed 100 characters"),
        password: z.string().trim()
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password cannot exceed 100 characters"),
    })
});