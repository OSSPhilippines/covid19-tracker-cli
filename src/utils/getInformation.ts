import axios from "axios";
import { convertCountryCode } from "../utils/libs/convertCountry";
import { capitalizeFirstLetter } from "../utils/libs/capitalizeFirstLetter";
axios.defaults.baseURL = "https://disease.sh/v3/covid-19";

/**
 * @returns An object containing the epoch timestamp of when the data was updated, and the raw data from the API
 */
export const getAllInfo: () => Promise<{
    updated: number;
    data: {
        active: number;
        cases: number;
        deaths: number;
        recovered: number;
        deathRate: number;
        recoveryRate: number;
    };
}> = async () => {
    let { data: globalData } = await axios.get("/all");
    let { cases, deaths, recovered, updated, active } = globalData;
    let deathRate = (deaths / cases) * 100;
    let recoveryRate = (recovered / cases) * 100;

    return {
        updated,
        data: {
            active,
            cases,
            deaths,
            recovered,
            deathRate,
            recoveryRate,
        },
    };
};

/**
 * @param country Country string
 * @returns Object containing the time when the data was updated, API countryname, formal countryname, and the raw data from the API
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

// This is a way of setting conditional types depending on what was passed to the mode parameter
// If the mode parameter receives "all" then the type will be different because instead of only receiving one
// set of data, it will be receiving everything
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

/**
 *
 * @param mode What data the user wants to receive, if all, then the user will be receiving everything but it can be specified to one type of data
 * @param country Country string
 * @returns Object containing date already formatted, and the data which is either a number[] or the raw data in another object *if* mode is set to all
 */
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
    const informationType =
        mode === "all" ? "Data" : mode.charAt(0).toUpperCase() + mode.slice(1);

    const date = `${informationType} from ${dates.shift()} to ${dates.pop()}`;

    // If mode is not all then set the chartData to the values of the dates from the API
    if (mode !== "all") chartData = Object.values(chartData) as number[];

    return {
        date,
        chartData,
    };
}
