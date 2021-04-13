import { generateColorTable } from "../../libs/generateTable";
import { getTimestamp } from "../../libs/getTimestamp";
import { getSaying } from "../../libs/getSaying";
import { lines } from "../../libs/getResponses";

/**
 *
 * @param chartType The type of chart that will be placed on the header
 * @param updateTime The unix timestamp from the API of when the data was last updated
 * @param data The data formatted into tables
 * @param quiet Optional, set to true if the user does not want unnecessary information
 * @returns A string containing a formatted table
 */
export const generateRegularOutput: (
    chartType: string,
    updateTime: number,
    data: (string | string[])[],
    quiet?: boolean
) => string = (chartType, updateTime, data, quiet) => {
    quiet = quiet === undefined ? true : quiet;
    let header = `${lines.defaultHeader} - ${chartType}`;
    let timestamp = getTimestamp(updateTime).yellow;

    data.unshift(timestamp);
    if (!quiet) data.unshift(header);

    if (!quiet)
        data = data.concat([
            lines.helpMessage,
            lines.docsLink,
            lines.WNrepoLink,
        ]);

    let response = generateColorTable(data, "cyan");
    if (!quiet) {
        response += `\n${getSaying().green}\n`; //saying
        response += `\n${"═".repeat(60)}\n`;
    }

    response += lines.sponsorMessage; // support msg

    // @ts-expect-error: Missing type definitions causes TS to highlight brightRed
    response += `${lines.BMCLink}\n`.brightRed; //BMC link

    if (!quiet) {
        response += `${"═".repeat(60)}\n`;
        response += `${lines.twitterPlug}`;
        response +=
            lines.handleHashtag.map((text) => text.black.bgCyan).join(" ") +
            "\n";
    }

    response += "\n";
    return response;
};
