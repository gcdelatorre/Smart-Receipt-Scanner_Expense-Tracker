import { z } from "zod";

export const updateProfileSchema = z.object({
    body: z.object({
        name: z.string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name cannot exceed 50 characters"),
        username: z.string()
            .min(6, "Username must be at least 6 characters")
            .max(30, "Username cannot exceed 30 characters"),
        email: z.string()
            .email("Invalid email format")
            .max(100, "Email cannot exceed 100 characters"),
    })
});
