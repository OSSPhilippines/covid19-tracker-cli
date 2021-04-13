import { Request, Router } from "express";
import {
    globalHistory,
    globalInformation,
    historyPerCountry,
    informationPerCountry,
} from "../utils/routes/regular/regularHandlers";
import handleAsync from "./handleAsync";

/**
 *
 * @param req Express request
 * @returns Boolean if the request starts with /quiet
 */
export const isQuiet: (req: Request) => boolean = (req) =>
    req.baseUrl.startsWith("/quiet");

/**
 * The regularRouter handles all the processing of the requests *after* passing through
 * all middlewares except not found and error handling middleware
 */
export const regularRouter = Router({ mergeParams: true });

regularRouter.get(
    "/history/:mode?",
    handleAsync(async (req, res, next) => {
        // get mode from params
        let mode = req.params.mode as "cases" | "deaths" | "recovered";

        //default to cases if mode is undefined
        mode = mode === undefined ? "cases" : mode;

        // if the mode is not in the api then return to next handler
        if (!["cases", "deaths", "recovered"].includes(mode)) return next();
        res.send(await globalHistory(mode, isQuiet(req)));
    })
);

regularRouter.get(
    "/history/:country/:mode?",
    handleAsync(async (req, res, next) => {
        const country = req.params.country;
        // get mode from params
        let mode = req.params.mode as "cases" | "deaths" | "recovered";

        //default to cases if mode is undefined
        mode = mode === undefined ? "cases" : mode;

        // if the mode is not in the api then return to next handler
        if (!["cases", "deaths", "recovered"].includes(mode)) return next();
        res.send(await historyPerCountry(country, mode, isQuiet(req)));
    })
);

regularRouter.get(
    "/:country",
    handleAsync(async (req, res, _next) => {
        const country = req.params.country;
        res.send(await informationPerCountry(country, isQuiet(req)));
    })
);

regularRouter.get(
    "/",
    handleAsync(async (req, res, _next) => {
        res.send(await globalInformation(isQuiet(req)));
    })
);
