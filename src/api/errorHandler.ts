import { ErrorRequestHandler } from "express";

/**
 *
 * @param error Error object, received from errors thrown in the code
 * @param res Response object from Express
 */
export const errorHandler: ErrorRequestHandler = (error, _, res, _next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.send(error.message + "\n");
    res.end();
};
