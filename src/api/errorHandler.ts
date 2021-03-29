import { ErrorRequestHandler } from "express";
import { generateColorTable } from "../utils/generateTable";

export const errorHandler: ErrorRequestHandler = (error, _, res, _next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.send(generateColorTable([error.message], "red"));
    res.end();
};
