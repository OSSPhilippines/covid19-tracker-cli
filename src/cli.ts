import argv from "minimist";
import {
    globalHistory,
    globalInformation,
    historyPerCountry,
    informationPerCountry,
} from "./utils/handlers";
import {
    globalHistoryPlain,
    globalInformationPlain,
    historyPerCountryPlain,
    informationPerCountryPlain,
} from "./utils/plainHandlers";

const args = argv(process.argv.slice(2));
let { history, mode, help, quiet, plain } = args;
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
  --quiet    Only show necessary information
  --plain    Enable plain mode`;

let output: string = "";
const main = async () => {
    if (help) return console.log(helpMessage);
    quiet = quiet === undefined ? false : quiet;

    if (history === undefined) {
        if (country === undefined) {
            output =
                plain === true
                    ? await globalInformationPlain(quiet)
                    : await globalInformation(quiet);
        } else {
            output =
                plain === true
                    ? await informationPerCountryPlain(country, quiet)
                    : await informationPerCountry(country, quiet);
        }
    }

    mode = mode === undefined ? "cases" : mode; // default to cases if mode is not present
    if (!["cases", "deaths", "recovered"].includes(mode)) mode === "cases"; // default to cases if mode is not cases | deaths | recovered

    if (history) {
        if (country === undefined) {
            output =
                plain === true
                    ? await globalHistoryPlain(mode, quiet)
                    : await globalHistory(mode, quiet);
        } else {
            output =
                plain === true
                    ? await historyPerCountryPlain(country, mode, quiet)
                    : await historyPerCountry(country, mode, quiet);
        }
    }

    console.log(output);
};

main().catch((err) => {
    console.log(err.message + "\n");
});
