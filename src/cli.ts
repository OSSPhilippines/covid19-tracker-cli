#!/usr/bin/env node
import argv from "minimist";
import { lines, welcomeMessage } from "./utils/libs/getResponses";
import {
    globalHistory,
    globalInformation,
    historyPerCountry,
    informationPerCountry,
} from "./utils/routes/regular/regularHandlers";
import {
    globalHistoryPlain,
    globalInformationPlain,
    historyPerCountryPlain,
    informationPerCountryPlain,
} from "./utils/routes/plain/plainHandlers";
import {
    countryDashboard,
    globalDashboard,
} from "./utils/routes/dashboard/dashboardHandlers";

const args = argv(process.argv.slice(2));
let { dashboard, history, mode, help, quiet, plain, size } = args;
const country = args._[0];

const helpMessage = `${welcomeMessage}
Usage: covid [COUNTRY] [OPTIONS...]

Country:    Can be a country name or ISO 3166-1 alpha-2 country code
            Ex: ph = Philippines, kr = South Korea
            Leave empty to show global data

Options:
    --dashboard Show a dashboard
	--size      Use with --dashboard to control the size of the output
    --history   Show a chart of country's cases of world's cases
    --mode      Use with --history to show a chart of cases, deaths, or recovered
    --quiet     Only show necessary information
    --plain     Enable plain mode
    
Useful Links:
    ${lines.docsLink}
	${lines.WNrepoLink}
    ${lines.WNDonateLink}`;

const main: () => Promise<string> = async () => {
    if (help) return helpMessage;
    quiet = quiet === undefined ? false : quiet;

    if (dashboard) {
        if (size === undefined) size = "sm";
        if (!["sm", "md", "lg"].includes(size)) size = "sm";

        return country === undefined
            ? await globalDashboard(size, false)
            : await countryDashboard(country, size, false);
    }

    if (history === undefined) {
        if (country === undefined) {
            return plain === true
                ? await globalInformationPlain(quiet)
                : await globalInformation(quiet);
        } else {
            return plain === true
                ? await informationPerCountryPlain(country, quiet)
                : await informationPerCountry(country, quiet);
        }
    }

    mode = mode === undefined ? "cases" : mode; // default to cases if mode is not present
    if (!["cases", "deaths", "recovered"].includes(mode)) mode === "cases"; // default to cases if mode is not cases | deaths | recovered

    if (history) {
        if (country === undefined) {
            return plain === true
                ? await globalHistoryPlain(mode, quiet)
                : await globalHistory(mode, quiet);
        } else {
            return plain === true
                ? await historyPerCountryPlain(country, mode, quiet)
                : await historyPerCountry(country, mode, quiet);
        }
    }

    return "";
};

(async () => {
    let response = await main().catch((err) => {
        // Log error and exit out
        console.log(err.message + "\n");
        process.exit();
    });

    //Remove magic new lines
    let responseArray = response.split("\n");
    while (!/\S/.test(responseArray[responseArray.length - 1])) {
        responseArray.pop();
    }
    response = responseArray.join("\n") + "\n";

    console.log(response);
})();
