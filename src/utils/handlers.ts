import axios from "axios";
import { addFooterAndGenerateChart } from "./addFooterAndGenerateChart";
import { generateAsciichart } from "./generateAsciichart";

axios.defaults.baseURL = "https://disease.sh/v3/covid-19";
let countryCodes: { [key: string]: string } = {};
(async () => {
    countryCodes = (await axios.get("http://country.io/names.json")).data;
})();

/**
 *
 * @returns an array in the format of [timestamp, rows]
 */
const getAllInfo: () => Promise<[number, (string[] | string)[]]> = async () => {
    let { data: globalData } = await axios.get("/all");
    let { cases, deaths, recovered, updated } = globalData;

    let mortalityPercentage = ((deaths / cases) * 100).toFixed(2) + "%";
    let recoveredPercentage = ((recovered / cases) * 100).toFixed(2) + "%";

    [cases, deaths, recovered] = [cases, deaths, recovered].map((num: number) =>
        num.toLocaleString("en-US", { maximumFractionDigits: 0 })
    );

    // prettier-ignore
    return [updated, [
        ["Cases".magenta, "Deaths".red,"Recovered".green, "Mortality %".red,"Recovered %".green],
        [cases, deaths, recovered, mortalityPercentage, recoveredPercentage]]]
};

/**
 *
 * @param country the country code or string that the user provides from req.params or CLI
 * @returns an array in the format of [timestamp, API countryname, formal countryname, rows[]]
 */
const getCountryInfo: (
    country: string
) => Promise<[number, string, string, (string[] | string)[]]> = async (
    country
) => {
    // Wait 1 second for countryCodes to initialize, needed for CLI
    if (Object.keys(countryCodes).length === 0) {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }

    country =
        country.length < 3 ? countryCodes[country.toUpperCase()] : country; // Convert country code to country name

    if (country === undefined || typeof country === "undefined")
        throw new Error(`Cannot find provided country`);

    try {
        let { data: countryData } = await axios.get(`/countries/${country}`);
        // prettier-ignore
        let { country: countryName, updated, cases, deaths, recovered, active, casesPerOneMillion, todayCases, todayDeaths, critical} = countryData;

        let mortalityPercentage = ((deaths / cases) * 100).toFixed(2) + "%";
        let recoveredPercentage = ((recovered / cases) * 100).toFixed(2) + "%";

        // prettier-ignore
        [ cases, deaths, recovered, active, casesPerOneMillion, todayCases, todayDeaths, critical ] = 
		[ cases, deaths, recovered, active, casesPerOneMillion, todayCases, todayDeaths, critical,
			].map((num: number) =>
				num.toLocaleString("en-US", { maximumFractionDigits: 0 })
			);

        //prettier-ignore
        return [updated, country, countryName, [
			[ "Cases".magenta, "Deaths".red, "Recovered".green, "Active".blue, "Cases/Million".blue,], 
			[ cases, deaths, recovered, active, casesPerOneMillion,],
			[ "Today Cases".magenta, "Today Deaths".red, "Critical".red, "Mortaility %".red, "Recovery %".green], 
			[ todayCases, todayDeaths, critical, mortalityPercentage, recoveredPercentage]]
		]
    } catch {
        throw new Error(`Cannot find the provided country`);
    }
};

/**
 * historyPerCountry shows a tablechart of the <mode> of a country
 * Shows Cases, Deaths, Recovered, Active, Cases/Million
 * Today Cases, Today Deaths, Critical, Mortality %, Recovery in a chart
 * @param country country code or country name that the user wants to query
 * @param mode Mode that the user wants to query must be: "cases" | "deaths" | "recoveries"
 */
export const historyPerCountry: (
    country: string,
    mode: "cases" | "deaths" | "recovered"
) => Promise<string> = async (country, mode) => {
    // Get summary info about a country
    let [updated, apiCountryname, countryName, rows] = await getCountryInfo(
        country
    );
    let { data: historicalData } = await axios.get(
        `/historical/${apiCountryname}`
    );

    // get data from API request based on the mode
    let data = historicalData["timeline"][mode];

    // Get first and last date of timeline
    const firstDate = Object.keys(data).shift();
    const lastDate = Object.keys(data).pop();

    //generate historical graph
    const chart = generateAsciichart(Object.values(data)).split("\n");

    // add chart label and chart
    // prettier-ignore
    rows.push(`${ mode.charAt(0).toUpperCase() + mode.slice(1) } from ${firstDate} to ${lastDate}`.magenta);
    rows = rows.concat(chart);

    // generate table
    let response = addFooterAndGenerateChart(
        `${countryName} Historical Chart`,
        updated,
        rows
    );

    return response;
};

/**
 * globalHistory shows a tablechart of the cases of all the countries
 * Shows Cases, Deaths, Recovered, Active, Cases/Million
 * and a graph of a country's cases
 */
export const globalHistory: (
    mode: "cases" | "deaths" | "recovered"
) => Promise<string> = async (mode) => {
    // Get summary info
    let [updated, rows] = await getAllInfo();

    // Get data from API
    const { data: historicalData } = await axios.get("/historical/all");
    const data: {
        [key: string]: number;
    } = historicalData[mode];

    const firstDate = Object.keys(data).shift();
    const lastDate = Object.keys(data).pop();

    // generate historical graph;
    const chart = generateAsciichart(Object.values(data)).split("\n");

    // prettier-ignore
    rows.push(`${ mode.charAt(0).toUpperCase() + mode.slice(1) } from ${firstDate} to ${lastDate}`.magenta)
    rows = rows.concat(chart);

    let response = addFooterAndGenerateChart(
        "Global Historical Chart",
        updated,
        rows
    );

    return response;
};

/**
 *  informationPerCountry tracks the info of a country
 * 	Shows Cases, Deaths, Recovered, Active, Cases/Million
 *  Today Cases, Today Deaths, Critical, Mortality %, Recovery in a chart
 * 	@param country country code or country name that the user wants to query
 */
export const informationPerCountry: (
    country: string
) => Promise<string> = async (country) => {
    let [updated, _, countryName, rows] = await getCountryInfo(country);

    let response = addFooterAndGenerateChart(
        `${countryName} Update`,
        updated,
        rows
    );

    // return response;
    return response;
};

/**
 *  globalInformation tracks the info of all countries
 * 	Shows Cases, Deaths, Recovered, Mortality %, Recovered% in a chart
 */
export const globalInformation: () => Promise<string> = async () => {
    const [updated, rowsOfData] = await getAllInfo();

    let response = addFooterAndGenerateChart(
        "Global Update",
        updated,
        rowsOfData
    );

    return response;
};
