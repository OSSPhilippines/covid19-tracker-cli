import axios from "axios";
import { generateAsciichart } from "./generateAsciichart";
import { generatePlainOutput } from "./generatePlainOutput";
import { getAllInfo, getCountryInfo, PlainData } from "./getInformation";

export const globalHistoryPlain: (mode: string) => Promise<string> = async (
    mode
) => {
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

    return generatePlainOutput(info, `Global Historical Chart`, [date, chart]);
};

export const historyPerCountryPlain: (
    country: string,
    mode: string
) => Promise<string> = async (country, mode) => {
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

    return generatePlainOutput(info, `${info.metainfo.countryName} Chart`, [
        date,
        chart,
    ]);
};

export const informationPerCountryPlain: (
    country: string
) => Promise<string> = async (country) => {
    const info = (await getCountryInfo(country, true)) as PlainData;
    return generatePlainOutput(info, `${info.metainfo.countryName} Update`);
};

export const globalInformationPlain: () => Promise<string> = async () => {
    const info = (await getAllInfo(true)) as PlainData;
    return generatePlainOutput(info, "Global Update");
};
