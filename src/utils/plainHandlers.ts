import axios from "axios";
import { generateAsciichart } from "./generateAsciichart";
import { generatePlainOutput } from "./generatePlainOutput";
import { getAllInfo, getCountryInfo, PlainData } from "./getInformation";

/**
 * globalHistory shows a tablechart of the cases of all the countries
 * Shows Cases, Deaths, Recovered, Active, Cases/Million
 * and a graph of a country's cases
 * @param mode Mode that the user wants to query, must be: "cases" | "deaths" | "recoveries"
 * @param quiet tells the response to be in quiet mode or not
 */
export const globalHistoryPlain: (
    mode: string,
    quiet: boolean
) => Promise<string> = async (mode, quiet) => {
    // Get summary info
    const info = (await getAllInfo(true)) as PlainData;

    // Get data from API
    const { data: historicalData } = await axios.get("/historical/all");
    const data: {
        [key: string]: number;
    } = historicalData[mode];

    // Get first and last date of data
    const dates = Object.keys(data);
    const date = `${
        mode.charAt(0).toUpperCase() + mode.slice(1)
    } from ${dates.shift()} to ${dates.pop()}`;

    // Generate historical graph
    const chart = generateAsciichart(Object.values(data), true, 7);

    return generatePlainOutput(info, `Global Historical Chart`, quiet, [
        date,
        chart,
    ]);
};

/**
 * historyPerCountry shows a tablechart of the <mode> of a country
 * Shows Cases, Deaths, Recovered, Active, Cases/Million
 * Today Cases, Today Deaths, Critical, Mortality %, Recovery in a chart
 * @param country country code or country name that the user wants to query
 * @param mode Mode that the user wants to query, must be: "cases" | "deaths" | "recoveries"
 * @param quiet tells the response to be in quiet mode or not
 */

export const historyPerCountryPlain: (
    country: string,
    mode: string,
    quiet: boolean
) => Promise<string> = async (country, mode, quiet) => {
    // Get summary info about a country
    const info = (await getCountryInfo(country, true)) as PlainData;

    let { data: historicalData } = await axios.get(
        `/historical/${info.metainfo.countryName}`
    );

    // Get data from API request based on the mode;
    let data = historicalData["timeline"][mode];

    // Get first and last date of data
    const dates = Object.keys(data);
    // prettier-ignore
    const date = `${ mode.charAt(0).toUpperCase() + mode.slice(1) } from ${dates.shift()} to ${dates.pop()}`

    // Generate historical graph
    const chart = generateAsciichart(Object.values(data), true, 7);

    return generatePlainOutput(
        info,
        `${info.metainfo.countryName} Chart`,
        quiet,
        [date, chart]
    );
};

/**
 *  informationPerCountry tracks the info of a country
 * 	Shows Cases, Deaths, Recovered, Active, Cases/Million
 *  Today Cases, Today Deaths, Critical, Mortality %, Recovery in a chart
 * 	@param country country code or country name that the user wants to query
 *  @param quiet tells the response to be in quiet mode or not
 */
export const informationPerCountryPlain: (
    country: string,
    quiet: boolean
) => Promise<string> = async (country, quiet) => {
    const info = (await getCountryInfo(country, true)) as PlainData;
    return generatePlainOutput(
        info,
        `${info.metainfo.countryName} Update`,
        quiet
    );
};

/**
 *  globalInformation tracks the info of all countries
 * 	Shows Cases, Deaths, Recovered, Mortality %, Recovered% in a chart
 *  @param quiet tells the response to be in quiet mode or not
 */
export const globalInformationPlain: (
    quiet: boolean
) => Promise<string> = async (quiet) => {
    const info = (await getAllInfo(true)) as PlainData;
    return generatePlainOutput(info, "Global Update", quiet);
};
