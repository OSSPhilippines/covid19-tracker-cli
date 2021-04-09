import { generateRegularOutput } from "./generateRegularOutput";
import { generateAsciichart } from "../../libs/generateAsciichart";
import { getHistorical } from "../../getInformation";
import { countryInfo, globalInfo } from "./regularParser";

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
    let {
        apiCountryName,
        formalCountryName,
        rowsOfData,
        timeUpdated,
    } = await countryInfo(country);

    // Fetch chart data and generate historical graph;
    let historicalData = await getHistorical(mode, apiCountryName);
    const chart = generateAsciichart(historicalData.chartData).split("\n");

    // add chart label and chart
    rowsOfData.push(historicalData.date.magenta);
    rowsOfData = rowsOfData.concat(chart);

    // Generate table
    let response = generateRegularOutput(
        `${formalCountryName} Historical Chart`,
        timeUpdated,
        rowsOfData,
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
    let { timeUpdated, rowsOfData } = await globalInfo();

    // Fetch chart data and generate historical graph;
    const historicalData = await getHistorical(mode);
    const chart = generateAsciichart(historicalData.chartData).split("\n");

    rowsOfData.push(historicalData.date.magenta);
    rowsOfData = rowsOfData.concat(chart);

    let response = generateRegularOutput(
        "Global Historical Chart",
        timeUpdated,
        rowsOfData,
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
    let {timeUpdated, formalCountryName, rowsOfData} = await countryInfo(country);

    let response = generateRegularOutput(
        `${formalCountryName} Update`,
        timeUpdated,
        rowsOfData,
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
    const { timeUpdated, rowsOfData } = await globalInfo();

    let response = generateRegularOutput(
        "Global Update",
        timeUpdated,
        rowsOfData,
        quiet
    );

    return response;
};
