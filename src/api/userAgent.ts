import { Request, Response, NextFunction } from "express";

// Type of middleware and handler
export type Handler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

const isTerminal: (userAgent: string | undefined) => boolean = (userAgent) => {
    if (userAgent === undefined) return false;
    if (/curl|wget|httpie/i.test(userAgent)) return true;
    return false;
};

export const userAgentMiddleware: Handler = (req, res, next) => {
    const userAgent = req.headers["user-agent"];
    if (!isTerminal(userAgent)) {
        res.send(
            `Welcome to COVID-19 Tracker CLI v3.9.3 by Waren Gonzaga.\n\nPlease visit: https://warengonza.ga/covid19-tracker-cli`
        );
        return;
    }

    next();
};
