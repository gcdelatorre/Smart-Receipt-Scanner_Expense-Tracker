import { z } from "zod"

export const expenseTransactionSchema = z.object({
    body: z.object({
        amount: z.coerce.number()
            .positive("Amount must be greater than 0"),
        date: z.coerce.date({
            errorMap: () => ({ message: "Please select a valid date" })
        })
    })
})

export const incomeTransactionSchema = z.object({
    body: z.object({
        amount: z.coerce.number()
            .positive("Amount must be greater than 0"),
        date: z.coerce.date({
            errorMap: () => ({ message: "Please select a valid date" })
        })
    })
})