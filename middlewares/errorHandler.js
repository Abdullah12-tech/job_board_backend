const errorHandler = (err, req, res, next) => {
    // Log the error with additional context
    console.error(`[${new Date().toISOString()}] Error:`, {
        name: err.name,
        message: err.message,
        code: err.code,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query
    });

    // Handle known error types
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errorType = 'server_error';
    let details = null;

    // Mongoose duplicate key error
    if (err.code === 11000 || (err.cause && err.cause.code === 11000)) {
        const keyValue = err.keyValue || (err.cause && err.cause.keyValue) || {};
        const key = Object.keys(keyValue)[0] || 'field';
        const value = Object.values(keyValue)[0] || 'value';
        statusCode = 409;
        message = `${key} '${value}' already exists`;
        errorType = 'duplicate_key_error';
    }
    // JWT errors
    else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid authentication token';
        errorType = 'authentication_error';
    } 
    else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Authentication token expired';
        errorType = 'authentication_error';
    }
    // Validation errors
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        const errors = Object.values(err.errors).map(e => e.message);
        message = 'Validation failed';
        errorType = 'validation_error';
        details = errors;
    }
    // Cast errors (invalid ID format, etc.)
    else if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
        errorType = 'invalid_input';
    }
    // Custom application errors
    else if (err.isOperational) {
        statusCode = err.statusCode || 500;
        message = err.message;
        errorType = err.errorType || 'operational_error';
    }
    // Schema validation messages
    else if (err.message && (
        err.message.includes('is required') ||
        err.message.includes('must be at least') ||
        err.message.includes('cannot be more than') ||
        err.message.includes('Please fill a valid')
    )) {
        statusCode = 400;
        message = err.message;
        errorType = 'validation_error';
    }
    // Rate limiting errors
    else if (err.name === 'RateLimitExceededError') {
        statusCode = 429;
        message = 'Too many requests, please try again later';
        errorType = 'rate_limit_exceeded';
    }
    // Database connection errors
    else if (err.name === 'MongoServerError' || err.name === 'MongoNetworkError') {
        statusCode = 503;
        message = 'Database service unavailable';
        errorType = 'database_error';
    }

    // Prepare error response
    const errorResponse = {
        status: 'error',
        error: errorType,
        message: message,
        ...(details && { details }),
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    // Send error response
    res.status(statusCode).json(errorResponse);

    // For critical errors, consider shutting down gracefully in production
    if (!err.isOperational && process.env.NODE_ENV === 'production') {
        console.error('FATAL ERROR:', err);
        process.exit(1);
    }
};

module.exports = errorHandler;