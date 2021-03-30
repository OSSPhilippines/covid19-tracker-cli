import { PlainData } from "./getInformation";
import { getSaying } from "./getSaying";
import { getTimestamp } from "./getTimestamp";
const { version } = require("../../package.json");

export const generatePlainOutput: (
    info: PlainData,
    chartType: string,
    extraRows?: string[]
) => string = ({ data, metainfo }, chartType, extraRows) => {
    // Set line depending if it contains a chart or not
    let line = extraRows === undefined ? "-".repeat(60) : "-".repeat(68);
    line += "\n";

    let header = `COVID-19 Tracker CLI v${version} - ${chartType}`;
    let timestamp = getTimestamp(metainfo.updated as number);
    let saying = getSaying();

    // Include GCash message if the query is to the PH
    let GCashMessage = chartType.toLowerCase().includes("philippines")
        ? "(GCash) +639176462753\n"
        : "";

    // Generate table
    let table = "";

    // Create columns
    let normalizedArray: string[] = [];
    Object.keys(data).forEach((key) => {
        let value = data[key];
        let line = `${key.padEnd(15, " ")}| ${value.padEnd(13, " ")}`; // create a line with length 30;
        normalizedArray.push(line);
    });

    while (normalizedArray.length > 0) {
        let left = normalizedArray.shift();
        let right = normalizedArray.shift();

        //right may be undefined, so default to empty string
        if (right === undefined) right = "";

        table += `${left}${right}`;
        if (normalizedArray.length !== 0) table += `\n`; // do not add whitespace at the end of the table
    }

    /**
     * responseArray is the array of the raw data **before** adding the separator lines
     */
    let responseArray: string[] = [header, timestamp, table];

    // Add extraRows to responseArray
    if (extraRows !== undefined) {
        extraRows.forEach((str) => {
            responseArray.push(str);
        });
    }

    // Add the help msg and other messages
    responseArray = responseArray.concat([
        "Help: Try to append the URL with /help to learn more...",
        "Source: https://www.worldometers.info/coronavirus/",
        "Code: https://github.com/warengonzaga/covid19-tracker-cli",
        `\n${saying}\n`,
        `Love this project? Help us to help others by means of coffee!\n${GCashMessage}(Buy Me A Coffee) warengonza.ga/coffee4dev`,
        "Follow me on twitter for more updates!\n@warengonzaga #covid19trackercli",
    ]);

    // Construct the final output
    let response: string = "\n";
    responseArray.forEach((str) => {
        response += `${line}`;
        response += `${str}\n`;
    });

    // Add padding to the side
    response = response
        .split("\n")
        .map((str) => `    ${str}`)
        .join("\n");

    response += "\n";

    return response;
};
