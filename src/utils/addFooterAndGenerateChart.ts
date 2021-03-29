import { generateColorTable } from "./generateTable";
import { getTimestamp } from "./getTimestamp";
import { getSaying } from "./getSaying";

const { version } = require("../../package.json");

/**
 *
 * @param chartType The type of chart that will be placed on the header
 * @param updateTime The unix timestamp from the API of when the data was last updated
 * @param data The data formatted into tables
 * @returns A string containing a formatted table
 */
export const addFooterAndGenerateChart: (
    chartType: string,
    updateTime: number,
    data: (string | string[])[]
) => string = (chartType, updateTime, data) => {
    let header = `COVID-19 Tracker CLI v${version} - ${chartType}`;
    let timestamp = getTimestamp(updateTime).yellow;

    data.unshift(header, timestamp);
    data = data.concat([
        "Help: Try to append the URL with /help to learn more...",
        "Source: https://disease.sh/v3/covid-19/",
        "Code: https://github.com/wareneutron/covid19-tracker-cli",
    ]);

    let response = generateColorTable(data, "cyan");
    response += `\n${getSaying().green}\n`; //saying
    response += `\n${"═".repeat(60)}\n`;
    response += `Love this project? Help us to help others by means of coffee!\n`; // support msg

    // Include GCash message if the query is to the PH
    response += chartType.toLowerCase().includes("philippines")
        ? "(GCash) +639176462753".blue + "\n"
        : "";

    // @ts-expect-error: Missing type definitions causes TS to highlight brightRed
    response += `(Buy Me A Coffee) warengonza.ga/coffee4dev\n`.brightRed; //BMC link
    response += `${"═".repeat(60)}\n`;
    response += `Follow me on twitter for more updates!\n`;
    response +=
        ["@warengonzaga", "#covid19trackercli"]
            .map((text) => text.black.bgCyan)
            .join(" ") + "\n";

    return response;
};
