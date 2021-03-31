import express from "express";
import morgan from "morgan";
import { errorHandler } from "./api/errorHandler";
import { plainRouter } from "./api/plainRouter";
import { router } from "./api/router";
import { userAgentMiddleware } from "./api/userAgent";

const { version } = require("../package.json");
const port = parseInt(process.env.PORT!) || 7070;

const app = express();
app.use(morgan("common"));
app.use(userAgentMiddleware);

/**
 * Plain CMD/Basic routes have both quiet and full modes
 * Same with regular / routes with ansi color codes
 */
app.use(["/quiet/basic", "/quiet/cmd", "/quiet/plain"], plainRouter);
app.use(["/basic", "/cmd", "/plain"], plainRouter);

app.use(["/quiet", "/"], router);
app.use("/", errorHandler);

// Not found handler
app.use("*", (_req, res) =>
    res.status(404).send(
        `Welcome to COVID-19 Tracker CLI v${version} by Waren Gonzaga with Wareneutron Developers\n
Please visit: https://warengonza.ga/covid19-tracker-cli\n`
    )
);

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});
