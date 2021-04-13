import { columnizeData } from "../../libs/columnizeData";
import { lines } from "../../libs/getResponses";
import { getSaying } from "../../libs/getSaying";
import { getTimestamp } from "../../libs/getTimestamp";

/**
 * @param info The plain data that will be shown at the top in two columns
 * @param chartType The type of chart that will be shown. Ex:  "Global Update", "Philippine Historical Chart"
 * @param quiet Boolean, set to true if the user requsted quiet mode
 * @param extraRows Any extra rows that will be presented under the main info. Used for Asciichart
 * @returns A string showing the provided data and configuration
 */
export const generatePlainOutput: (
    info: {
        data: {
            [key: string]: string;
        };
        timeUpdated: number;
    },
    chartType: string,
    quiet: boolean,
    extraRows?: string[]
) => string = ({ data, timeUpdated }, chartType, quiet, extraRows) => {
    // Set line depending if it contains a chart or not
    let line = extraRows === undefined ? "-".repeat(60) : "-".repeat(68);
    line += "\n";

    let header = `${lines.defaultHeader} - ${chartType}`;
    let timestamp = getTimestamp(timeUpdated);
    let saying = getSaying();

    let table = columnizeData(data);

    // responseArray is the array of the raw data **before** adding the separator lines
    let responseArray: string[] = [timestamp, table];
    if (!quiet) responseArray.unshift(header);

    // Add extraRows to responseArray
    if (extraRows !== undefined) {
        extraRows.forEach((str) => {
            responseArray.push(str);
        });
    }

    // Add the help msg and other messages
    if (!quiet)
        responseArray = responseArray.concat([
            lines.helpMessage,
            lines.docsLink,
            lines.WNrepoLink,
            `\n${saying}\n`,
        ]);

    responseArray.push(`${lines.sponsorMessage}${lines.BMCLink}`);

    if (!quiet)
        responseArray.push(
            `${lines.twitterPlug}${lines.handleHashtag.join(" ")}`
        );

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
