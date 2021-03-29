import { Request, Response, NextFunction } from "express";
type Handler<R> = (req: Request, res: Response, next: NextFunction) => R;
const handleAsync: (asyncFn: Handler<Promise<void>>) => Handler<void> = (
    asyncFn
) => {
    return (req, res, next) => {
        Promise.resolve(asyncFn(req, res, next)).catch(next);
    };
};

export default handleAsync;
