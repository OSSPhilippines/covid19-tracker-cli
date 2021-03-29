import argv from "minimist";
import { generateColorTable } from "./utils/generateTable";
import {
    globalHistory,
    globalInformation,
    historyPerCountry,
    informationPerCountry,
} from "./utils/handlers";

const args = argv(process.argv.slice(2));
let { history, mode, help, quiet } = args;
const country = args._[0];

const { version } = require("../package.json");

const helpMessage = `COVID-19 Tracker CLI v${version} by Waren Gonzaga with Wareneutron Developers
Usage: covid [COUNTRY] [OPTIONS...]

Country:  Can be a country name or ISO 3166-1 alpha-2 country code
          Ex: ph = Philippines, kr = South Korea
          Leave empty to show global data

Options:
  --history  Show a chart of country's cases of world's cases
  --mode     Use with --history to make show a chart of cases, deaths, or recovered
  --quiet    Only show necessary information`;

let output: string = "";
const main = async () => {
    if (help) return console.log(helpMessage);
    quiet = quiet === undefined || typeof quiet === "undefined" ? false : quiet;

    if (history === undefined || typeof history === "undefined") {
        if (country === undefined) output = await globalInformation(quiet);
        else output = await informationPerCountry(country, quiet);
    }

    mode = mode === undefined || typeof mode === "undefined" ? "cases" : mode; // defauilt to cases if mode is not present
    if (!["cases", "deaths", "recovered"].includes(mode)) mode === "cases"; // default to cases if mode is not cases | deaths | recovered

    if (history) {
        if (country === undefined) output = await globalHistory(mode, quiet);
        else output = await historyPerCountry(country, mode, quiet);
    }

    console.log(output);
};

main().catch((err) => {
    let errorTable = generateColorTable([err.message], "red");
    console.log(errorTable);
});
