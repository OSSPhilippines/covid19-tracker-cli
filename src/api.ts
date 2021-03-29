import express from "express";
import morgan from "morgan";
import { errorHandler } from "./api/errorHandler";
import { router } from "./api/router";
import { userAgentMiddleware } from "./api/userAgent";

const { version } = require("../package.json");
const port = parseInt(process.env.PORT!) || 7070;

const app = express();
app.use(morgan("common"));
app.use(userAgentMiddleware);

app.use(["/quiet", "/"], router);
app.use(["/quiet", "/"], errorHandler);

app.use("*", (_req, res) =>
	res.send(
		`Welcome to COVID-19 Tracker CLI v${version} by Waren Gonzaga with Wareneutron Developers\n
Please visit: https://warengonza.ga/covid19-tracker-cli\n`
	)
);

app.listen(port, () => {
	console.log(`Express listening on port ${port}`);
});
