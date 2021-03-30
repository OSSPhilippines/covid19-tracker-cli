import { Request, Response, NextFunction } from "express";
type Handler<R> = (req: Request, res: Response, next: NextFunction) => R;

/**
 * @example router.use("/path/", handleAsync((req, res, next)=>{res.send("Hello World!")}));
 * @param asyncFn An asyncronous function that takes in req, res, and next
 * @returns An asyncronous function where errors will be catched and sent to the error handler
 */
const handleAsync: (asyncFn: Handler<Promise<void>>) => Handler<void> = (
    asyncFn
) => {
    return (req, res, next) => {
        Promise.resolve(asyncFn(req, res, next)).catch(next);
    };
};

export default handleAsync;
