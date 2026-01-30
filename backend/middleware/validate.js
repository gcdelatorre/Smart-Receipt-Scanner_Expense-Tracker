import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (e) {
        // Name-based check is safer than instanceof in some environments
        if (e.name === "ZodError" || e instanceof ZodError) {
            // Zod uses .issues primarily; .errors is a getter. We check both.
            const errorList = e.issues || e.errors || [];

            return res.status(400).json({
                success: false,
                errors: errorList.map(err => ({
                    path: err.path,
                    message: err.message
                }))
            });
        }

        console.error("Validation Middleware Error:", e);
        return res.status(500).json({
            success: false,
            message: "Internal server error during validation"
        });
    }
};
