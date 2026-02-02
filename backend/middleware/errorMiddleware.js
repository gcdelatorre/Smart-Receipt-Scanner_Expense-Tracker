export const errorHandler = (err, req, res, next) => {
    // Multer error handling
    if (err.name === 'MulterError') {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ success: false, message: 'File is too large. Max size is 5MB.' });
        }
        return res.status(400).json({ success: false, message: err.message });
    }

    // Custom or specific errors
    if (err.message === 'Invalid file type. Only JPG, PNG, GIF, and WEBP are allowed.') {
        return res.status(400).json({ success: false, message: err.message });
    }

    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};
