import { Router } from "express";
import {
    globalHistory,
    globalInformation,
    historyPerCountry,
    informationPerCountry,
} from "../utils/handlers";
import handleAsync from "./handleAsync";

/**
 * The rootRouter handles all the processing of the requests *after* passing through
 * all middlewares except not found and error handling middleware
 */
export const router = Router({ mergeParams: true });

// rootRouter.get("/history/:country/:type", historyPerCountryAndType);
router.get(
    "/history/:mode?",
    handleAsync(async (req, res, next) => {
        // get mode from params
        let mode = req.params.mode as "cases" | "deaths" | "recovered";
        //default to cases if mode is undefined
        mode = mode === undefined ? "cases" : mode;
        console.log(mode);

        // if the mode is not in the api then return to next handler
        if (!["cases", "deaths", "recovered"].includes(mode)) return next();
        res.send(await globalHistory(mode, req.baseUrl.startsWith("/quiet")));
    })
);

router.get(
    "/history/:country/:mode?",
    handleAsync(async (req, res, next) => {
        const country = req.params.country;
        console.log("eere");
        // get mode from params
        let mode = req.params.mode as "cases" | "deaths" | "recovered";

        //default to cases if mode is undefined
        mode = mode === undefined ? "cases" : mode;

        // if the mode is not in the api then return to next handler
        if (!["cases", "deaths", "recovered"].includes(mode)) return next();
        res.send(
            await historyPerCountry(
                country,
                mode,
                req.baseUrl.startsWith("/quiet")
            )
        );
    })
);

router.get(
    "/:country",
    handleAsync(async (req, res, _next) => {
        console.log(req.path);
        const country = req.params.country;
        res.send(
            await informationPerCountry(
                country,
                req.baseUrl.startsWith("/quiet")
            )
        );
    })
);

router.get(
    "/",
    handleAsync(async (req, res, _next) => {
        res.send(await globalInformation(req.baseUrl.startsWith("/quiet")));
    })
);
