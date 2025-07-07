const handleDuplicateError = (err) => {
    const keyValue = err.keyValue || (err.cause && err.cause.keyValue) || {}
    const errorKey = Object.keys(keyValue)[0]
    const errorValue = Object.values(keyValue)[0]
    const messageObj = new Error(`${errorKey} of ${errorValue} already exists`)
    const error = {
        statusCode: 400,
        message: messageObj.message
    }
    return error
}

const handleValidationError = (err) => {
    const errorMessage = Object.values(err.errors).map(error => error.message)
    return {
        statusCode: 400,
        message: errorMessage[0]
    }
}

const handleCastError = (err) => {
    const message = `${err.path} ${err.value} is invalid`
    const error = new Error(message)
    return {
        statusCode: 400,
        message: error.message
    }
}
const handleJwtError = (err)=>{
    return {
        statusCode: 400,
        message: "Invalid token, please login again"
    }
}
const errorHandler = (err, req, res, next) => {
    console.log(err.code,err.name)
    // DUPLICATE ERROR
    if (err.code === 11000 || (err.cause && err.cause.code === 11000)) {
        const error = handleDuplicateError(err)
        return res.status(error.statusCode).json({
            message: error.message,
            status: "error"
        })
    }
    else if (err.name === "JsonWebTokenError"){
        const error = handleJwtError(err)
        return res.status(400).json({
            message: error.message,
            status: "error"
        })
    }
    else if (err.name === "ValidationError") {
        const error = handleValidationError(err)
        return res.status(error.statusCode).json({
            message: error.message
        })
    }
    else if (err.name === "CastError") {
        const error = handleCastError(err)
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    } else {
        return res.status(500).json({
            "status": "error",
            message: "Something went wrong"
        })
    }
}

module.exports = errorHandler