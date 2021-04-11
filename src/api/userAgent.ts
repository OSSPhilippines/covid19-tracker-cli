import { Request, Response, NextFunction } from "express";
import { lines } from "../utils/libs/getResponses";

// Type of middleware and handler
export type Handler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

/**
 *
 * @param userAgent The user agent of the requester
 * @returns A boolean that is true of the user agent provided is from curl / wget / httpie
 */
export const isTerminal: (userAgent: string | undefined) => boolean = (
    userAgent
) => {
    if (userAgent === undefined) return false;
    if (/curl|wget|httpie/i.test(userAgent)) return true;
    return false;
};

export const userAgentMiddleware: Handler = (req, res, next) => {
    /**
     * Get the user agent from the request
     * Determine if the user agent is from curl / wget / httpie
     * If true then proceed using the next function
     * Else return with message
     */
    const userAgent = req.headers["user-agent"];
    if (!isTerminal(userAgent)) {
        res.send(lines.notFound);
        return;
    }

    next();
};
