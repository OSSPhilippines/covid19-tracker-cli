import { generateRegularOutput } from "./generateRegularOutput";
import { generateAsciichart } from "../../libs/generateAsciichart";
import {
    getAllInfo,
    getCountryInfo,
    getHistorical,
} from "../../getInformation";

/**
 * historyPerCountry shows a tablechart of the <mode> of a country
 * Shows Cases, Deaths, Recovered, Active, Cases/Million
 * Today Cases, Today Deaths, Critical, Mortality %, Recovery in a chart
 * @param country country code or country name that the user wants to query
 * @param mode Mode that the user wants to query must be: "cases" | "deaths" | "recoveries"
 * @param quiet tells the response to be in quiet mode or not
 */
export const historyPerCountry: (
    country: string,
    mode: "cases" | "deaths" | "recovered",
    quiet: boolean
) => Promise<string> = async (country, mode, quiet) => {
    // Get summary info about a country
    let [updated, apiCountryname, countryName, rows] = (await getCountryInfo(
        country
    )) as [number, string, string, (string[] | string)[]];

    // Fetch chart data and generate historical graph;
    let historicalData = await getHistorical(mode, apiCountryname);
    const chart = generateAsciichart(historicalData.chart).split("\n");

    // add chart label and chart
    rows.push(historicalData.date.magenta);
    rows = rows.concat(chart);

    // Generate table
    let response = generateRegularOutput(
        `${countryName} Historical Chart`,
        updated,
        rows,
        quiet
    );

    return response;
};

/**
 * globalHistory shows a tablechart of the cases of all the countries
 * Shows Cases, Deaths, Recovered, Active, Cases/Million
 * and a graph of a country's cases
 * @param mode Mode that the user wants to query must be: "cases" | "deaths" | "recoveries"
 * @param quiet tells the response to be in quiet mode or not
 */
export const globalHistory: (
    mode: "cases" | "deaths" | "recovered",
    quiet: boolean
) => Promise<string> = async (mode, quiet) => {
    // Get summary info
    let [updated, rows] = (await getAllInfo()) as [
        number,
        (string[] | string)[]
    ];

    // Fetch chart data and generate historical graph;
    const historicalData = await getHistorical(mode);
    const chart = generateAsciichart(historicalData.chart).split("\n");

    rows.push(historicalData.date.magenta);
    rows = rows.concat(chart);

    let response = generateRegularOutput(
        "Global Historical Chart",
        updated,
        rows,
        quiet
    );

    return response;
};

/**
 *  informationPerCountry tracks the info of a country
 * 	Shows Cases, Deaths, Recovered, Active, Cases/Million
 *  Today Cases, Today Deaths, Critical, Mortality %, Recovery in a chart
 * 	@param country country code or country name that the user wants to query
 *  @param quiet tells the response to be in quiet mode or not
 */
export const informationPerCountry: (
    country: string,
    quiet: boolean
) => Promise<string> = async (country, quiet) => {
    // prettier-ignore
    let [updated, _, countryName, rows] = (await getCountryInfo(country)) as [
		number, string, string, (string[] | string)[]];

    let response = generateRegularOutput(
        `${countryName} Update`,
        updated,
        rows,
        quiet
    );

    // return response;
    return response;
};

/**
 *  globalInformation tracks the info of all countries
 * 	Shows Cases, Deaths, Recovered, Mortality %, Recovered% in a chart
 *  @param quiet tells the response to be in quiet mode or not
 */
export const globalInformation: (quiet: boolean) => Promise<string> = async (
    quiet
) => {
    const [updated, rowsOfData] = (await getAllInfo()) as [
        number,
        (string[] | string)[]
    ];

    let response = generateRegularOutput(
        "Global Update",
        updated,
        rowsOfData,
        quiet
    );

    return response;
};
