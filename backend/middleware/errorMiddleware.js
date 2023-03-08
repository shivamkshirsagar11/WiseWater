const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log("Error Middleware")
    console.log(statusCode);
    console.log(err.message);
    console.log(err.stack);
    res.status(statusCode);
    res.json({
        type: 'error', // to check on frontend type of response
        message: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : null,
    });

}

export default errorHandler;