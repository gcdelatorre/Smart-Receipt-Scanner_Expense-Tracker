import { z } from "zod";

export const updateProfileSchema = z.object({
    body: z.object({
        name: z.string().trim()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name cannot exceed 50 characters"),
        username: z.string().trim()
            .min(6, "Username must be at least 6 characters")
            .max(30, "Username cannot exceed 30 characters")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
        email: z.string().trim()
            .toLowerCase() // 👈 Best practice: standardizes email case
            .email("Invalid email format")
            .max(100, "Email cannot exceed 100 characters"),
    })
});

export const changePasswordSchema = z.object({
    body: z.object({
        oldPassword: z.string().min(1, "Old password is required"),
        newPassword: z.string().trim()
            .min(8, "New password must be at least 8 characters")
            .max(100, "Password cannot exceed 100 characters"),
        confirmNewPassword: z.string().trim()
            .min(1, "Confirmation password is required"),
    }).refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match",
        path: ["confirmNewPassword"], // 👈 Essential: puts the error on the correct field
    })
});