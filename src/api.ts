import express from "express";
import morgan from "morgan";
import { dashboardRouter } from "./api/dashboardRouter";
import { errorHandler } from "./api/errorHandler";
import { plainRouter } from "./api/plainRouter";
import { regularRouter } from "./api/regularRouter";
import { userAgentMiddleware } from "./api/userAgent";
import { lines } from "./utils/libs/getResponses";

const port = parseInt(process.env.PORT!) || 7070;

const app = express();
app.use(morgan("tiny"));
app.use("/history/web/charts", dashboardRouter);

app.use(userAgentMiddleware);

app.use("/history/charts", dashboardRouter);

/**
 * Plain CMD/Basic routes have both quiet and full modes
 * Same with regular / routes with ansi color codes
 */
app.use(["/quiet/basic", "/quiet/cmd", "/quiet/plain"], plainRouter);
app.use(["/basic", "/cmd", "/plain"], plainRouter);

app.use(["/quiet", "/"], regularRouter);
app.use("/", errorHandler);

// Not found handler
app.use("*", (_req, res) => res.status(404).send(lines.notFound));

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});
