const handleDuplicateError = (err) => {
    const keyValue = err.keyValue || (err.cause && err.cause.keyValue) || {};
    const errorKey = Object.keys(keyValue)[0];
    const errorValue = Object.values(keyValue)[0];
    const messageObj = new Error(`${errorKey} of ${errorValue} already exists`);
    const error = {
        statusCode: 400,
        message: messageObj.message
    };
    return error;
};

const handleValidationError = (err) => {
    const errorMessage = Object.values(err.errors).map(error => error.message);
    return {
        statusCode: 400,
        message: errorMessage[0]
    };
};

const handleCastError = (err) => {
    const message = `${err.path} ${err.value} is invalid`;
    const error = new Error(message);
    return {
        statusCode: 400,
        message: error.message
    };
};

const handleJwtError = (err) => {
    return {
        statusCode: 401,
        message: "Invalid token, please login again"
    };
};

const handleSchemaValidationErrors = (err) => {
    // Handle specific schema validation errors
    if (err.message.includes('Skills are required') || 
        err.message.includes('At least one skill is required')) {
        return {
            statusCode: 400,
            message: err.message
        };
    }
    
    if (err.message.includes('Headline cannot be more than 120 characters')) {
        return {
            statusCode: 400,
            message: err.message
        };
    }
    
    if (err.message.includes('Please fill a valid URL')) {
        return {
            statusCode: 400,
            message: err.message
        };
    }
    
    if (err.message.includes('Company name is required') || 
        err.message.includes('Company email is required') || 
        err.message.includes('Company website is required')) {
        return {
            statusCode: 400,
            message: err.message
        };
    }
    
    if (err.message.includes('Description should be at least 50 characters')) {
        return {
            statusCode: 400,
            message: err.message
        };
    }
    
    if (err.message.includes('Job title is required') || 
        err.message.includes('Job description is required')) {
        return {
            statusCode: 400,
            message: err.message
        };
    }
    
    if (err.message.includes('Please fill a valid email address')) {
        return {
            statusCode: 400,
            message: err.message
        };
    }
    
    if (err.message.includes('Password must be at least 8 characters')) {
        return {
            statusCode: 400,
            message: err.message
        };
    }
    
    if (err.message.includes('Resume is required')) {
        return {
            statusCode: 400,
            message: err.message
        };
    }
    
    // Default case for other validation errors
    return {
        statusCode: 400,
        message: err.message || 'Validation failed'
    };
};

const errorHandler = (err, req, res, next) => {
    console.log(err.code, err.name, err.message);

    // DUPLICATE ERROR
    if (err.code === 11000 || (err.cause && err.cause.code === 11000)) {
        const error = handleDuplicateError(err);
        return res.status(error.statusCode).json({
            message: error.message,
            status: "error"
        });
    }
    // JWT ERROR
    else if (err.name === "JsonWebTokenError") {
        const error = handleJwtError(err);
        return res.status(error.statusCode).json({
            message: error.message,
            status: "error"
        });
    }
    // VALIDATION ERROR
    else if (err.name === "ValidationError") {
        const error = handleValidationError(err);
        return res.status(error.statusCode).json({
            message: error.message,
            status: "error"
        });
    }
    // CAST ERROR
    else if (err.name === "CastError") {
        const error = handleCastError(err);
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }
    // SCHEMA VALIDATION ERRORS
    else if (err.message && (
        err.message.includes('is required') || 
        err.message.includes('cannot be more than') || 
        err.message.includes('Please fill a valid') || 
        err.message.includes('must be at least'))) {
        const error = handleSchemaValidationErrors(err);
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }
    // UNHANDLED ERRORS
    else {
        console.error('Unhandled error:', err);
        return res.status(500).json({
            "status": "error",
            message: err.message || "Something went wrong"
        });
    }
};

module.exports = errorHandler;