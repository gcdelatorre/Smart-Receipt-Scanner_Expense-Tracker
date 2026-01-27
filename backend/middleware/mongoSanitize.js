export const mongoSanitize = () => {
    return (req, res, next) => {
        const sanitize = (obj) => {
            if (obj && typeof obj === 'object') {
                for (const key in obj) {
                    // Check if key starts with $ or contains .
                    if (/^\$|\./.test(key)) {
                        delete obj[key];
                    } else {
                        sanitize(obj[key]);
                    }
                }
            }
        };

        if (req.body) sanitize(req.body);
        if (req.params) sanitize(req.params);
        if (req.query) sanitize(req.query);

        next();
    };
};
