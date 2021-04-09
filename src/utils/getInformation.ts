import axios from "axios";
import { convertCountryCode } from "../utils/libs/convertCountry";
import { capitalizeFirstLetter } from "../utils/libs/capitalizeFirstLetter";
axios.defaults.baseURL = "https://disease.sh/v3/covid-19";

/**
 * @param isPlain Set to true to recieve an object containing the responses instead of the rows
 * @returns an object containing the data and metainfo **if isPlain is set to true**
 * @returns an array in the format of [timestamp, rows] **if isPlain is set to false**
 */
export const getAllInfo: () => Promise<{
    updated: number;
    data: {
        cases: number;
        deaths: number;
        recovered: number;
        deathRate: number;
        recoveryRate: number;
    };
}> = async () => {
    let { data: globalData } = await axios.get("/all");
    let { cases, deaths, recovered, updated } = globalData;
    let deathRate = (deaths / cases) * 100;
    let recoveryRate = (recovered / cases) * 100;

    return {
        updated,
        data: {
            cases,
            deaths,
            recovered,
            deathRate,
            recoveryRate,
        },
    };
};

/**
 * @param country the country code or string that the user provides from req.params or CLI
 * @param isPlain Set to true to recieve an object containing the responses instead of the rows
 * @returns an object containing the data and metainfo **if isPlain is set to true**
 * @returns an array in the format of [timestamp, API countryname, formal countryname, rows[]] **if isPlain is false**
 */
export const getCountryInfo: (
    country: string
) => Promise<{
    updated: number;
    formalCountryName: string;
    apiCountryName: string;
    data: {
        cases: number;
        todayCases: number;
        active: number;
        recovered: number;
        deaths: number;
        todayDeaths: number;
        critical: number;
        deathRate: number;
        recoveryRate: number;
        casesPerOneMillion: number;
    };
}> = async (country) => {
    // Convert country to country code
    country = await convertCountryCode(country);
    let formalCountryName = capitalizeFirstLetter(country);

    try {
        let { data: countryData } = await axios.get(`/countries/${country}`);
        // prettier-ignore
        let { country: apiCountryName, updated, cases, deaths, recovered, active, casesPerOneMillion, todayCases, todayDeaths, critical} = countryData;
        let deathRate = (deaths / cases) * 100;
        let recoveryRate = (recovered / cases) * 100;

        return {
            updated,
            formalCountryName,
            apiCountryName,
            // prettier-ignore
            data: {
				cases, todayCases, active, recovered, deaths, todayDeaths, critical, deathRate, recoveryRate, casesPerOneMillion
			},
        };
    } catch {
        throw new Error(`Cannot find the provided country`);
    }
};

type getHistoricalMode = "cases" | "deaths" | "recovered" | "all";

// prettier-ignore
export async function getHistorical<T extends getHistoricalMode>(
    mode: T,
    country?: string
): Promise<
    T extends "all" ? {
    	date: string;
        chartData: {
        	[key: string]: {
        		[key: string]: number;
            };
        };
    } : {
        date: string;
        chartData: number[];
    }
>;

export async function getHistorical(
    mode: getHistoricalMode,
    country = "all"
): Promise<{
    date: string;
    chartData:
        | number[]
        | {
              [key: string]: {
                  [key: string]: number;
              };
          };
}> {
    const { data: historicalData } = await axios.get(`/historical/${country}`);

    // Get all the modes
    let chartData =
        country === "all" ? historicalData : historicalData["timeline"];

    // If the user did not select all, then get the mode they wanted
    if (mode !== "all") chartData = chartData[mode];

    // Get first and last date
    const dates = Object.keys(mode === "all" ? chartData["cases"] : chartData);

    // Label for chart
    const date = `${
        mode.charAt(0).toUpperCase() + mode.slice(1)
    } from ${dates.shift()} to ${dates.pop()}`;

    if (mode === "all") {
        return {
            date,
            chartData,
        };
    } else {
        return {
            date,
            chartData: Object.values(chartData) as number[],
        };
    }
}
