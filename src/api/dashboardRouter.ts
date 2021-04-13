import { Request, Router } from "express";
import {
    globalDashboard,
    DashboardSize,
    countryDashboard,
} from "../utils/routes/dashboard/dashboardHandlers";
import handleAsync from "./handleAsync";
import { isTerminal } from "./userAgent";

export const dashboardRouter = Router({ mergeParams: true });

/**
 *
 * @param req Express request
 * @returns True if the request is from a not from wget, curl or httpie
 */
const isWeb: (req: Request) => boolean = (req) => {
    // Check if the link is asking for web version of dashboard
    const link = req.baseUrl.startsWith("/history/web/charts");
    // Check if the user agent is NOT coming from terminal based application
    const isNotTerminal = !isTerminal(req.headers["user-agent"]);
    return link && isNotTerminal;
};

dashboardRouter.get(
    "/:size?",
    handleAsync(async (req, res, next) => {
        // Get parameters from request
        let size = req.params.size as DashboardSize;

        // Set default size and check then check if size var matches
        if (size === undefined) size = "sm";
        if (!["sm", "md", "lg"].includes(size)) return next();

        let response = await globalDashboard(size, isWeb(req));
        res.send(response);
    })
);

dashboardRouter.get(
    "/:country/:size?",
    handleAsync(async (req, res, next) => {
        // Get parameters from request
        let country = req.params.country;
        let size = req.params.size as DashboardSize;

        // Set default size and check then check if size var matches
        if (size === undefined) size = "sm";
        if (!["sm", "md", "lg"].includes(size)) return next();

        let response = await countryDashboard(country, size, isWeb(req));
        res.send(response);
    })
);
