import { ErrorRequestHandler, Response } from "express";

const errorHandler:ErrorRequestHandler = (err, req, res, next) => {
    console.log(`PATH: ${req.path} - ERROR: ${err.message}`);

    return res.status(500).json({
        message: "An error occurred while processing your request.",
        error: err.message
    });
}

export default errorHandler;