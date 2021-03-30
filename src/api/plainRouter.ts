import { Router } from "express";
import handleAsync from "./handleAsync";
import {
    globalInformationPlain,
    informationPerCountryPlain,
    historyPerCountryPlain,
    globalHistoryPlain,
} from "../utils/plainHandlers";
export const plainRouter = Router({ mergeParams: true });

plainRouter.get(
    "/history/:mode?",
    handleAsync(async (req, res, next) => {
        // get mode from params
        let mode = req.params.mode as "cases" | "deaths" | "recovered";

        //default to cases if mode is undefined
        mode = mode === undefined ? "cases" : mode;

        // if the mode is not in the api then return to next handler
        if (!["cases", "deaths", "recovered"].includes(mode)) return next();
        res.send(await globalHistoryPlain(mode));
    })
);

plainRouter.get(
    "/history/:country/:mode?",
    handleAsync(async (req, res, next) => {
        const country = req.params.country;
        // get mode from params
        let mode = req.params.mode as "cases" | "deaths" | "recovered";

        //default to cases if mode is undefined
        mode = mode === undefined ? "cases" : mode;

        // if the mode is not in the api then return to next handler
        if (!["cases", "deaths", "recovered"].includes(mode)) return next();
        res.send(await historyPerCountryPlain(country, mode));
    })
);

plainRouter.get(
    "/:country",
    handleAsync(async (req, res, _next) => {
        const country = req.params.country;
        res.send(await informationPerCountryPlain(country));
    })
);

plainRouter.get(
    "/",
    handleAsync(async (_req, res, _next) => {
        res.send(await globalInformationPlain());
    })
);
