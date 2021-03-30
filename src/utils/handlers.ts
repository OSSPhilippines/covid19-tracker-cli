import axios from "axios";
import { generateOutput } from "./generateOutput";
import { generateAsciichart } from "./generateAsciichart";
import { getAllInfo, getCountryInfo } from "./getInformation";
axios.defaults.baseURL = "https://disease.sh/v3/covid-19";

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

    let { data: historicalData } = await axios.get(
        `/historical/${apiCountryname}`
    );

    // get data from API request based on the mode
    let data = historicalData["timeline"][mode];

    // Get first and last date of timeline
    const firstDate = Object.keys(data).shift();
    const lastDate = Object.keys(data).pop();

    // Generate historical graph
    const chart = generateAsciichart(Object.values(data)).split("\n");

    // add chart label and chart
    // prettier-ignore
    rows.push(`${ mode.charAt(0).toUpperCase() + mode.slice(1) } from ${firstDate} to ${lastDate}`.magenta);
    rows = rows.concat(chart);

    // Generate table
    let response = generateOutput(
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

    // Get data from API
    const { data: historicalData } = await axios.get("/historical/all");
    const data: {
        [key: string]: number;
    } = historicalData[mode];

    const firstDate = Object.keys(data).shift();
    const lastDate = Object.keys(data).pop();

    // Generate historical graph;
    const chart = generateAsciichart(Object.values(data)).split("\n");

    // prettier-ignore
    rows.push(`${ mode.charAt(0).toUpperCase() + mode.slice(1) } from ${firstDate} to ${lastDate}`.magenta)
    rows = rows.concat(chart);

    let response = generateOutput(
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

    let response = generateOutput(
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

    let response = generateOutput("Global Update", updated, rowsOfData, quiet);

    return response;
};
