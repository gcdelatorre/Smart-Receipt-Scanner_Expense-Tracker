export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (e) {
        // Return only the error messages for a cleaner frontend experience
        return res.status(400).json({
            success: false,
            errors: e.errors.map(err => ({
                path: err.path,
                message: err.message
            }))
        });
    }
};
