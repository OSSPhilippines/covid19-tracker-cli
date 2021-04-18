import world from "world-countries";
import {
    getAllInfo,
    getCountryInfo,
    getHistorical,
} from "../../getInformation";
import { capitalizeFirstLetter } from "../../libs/capitalizeFirstLetter";
import { columnizeData } from "../../libs/columnizeData";
import { getTimestamp } from "../../libs/getTimestamp";
import {
    convertToPercentage,
    normalizeNumbers,
} from "../../libs/numberNormalizers";
import {
    generateDashboardOutput,
    LineDataObject,
} from "./generateDashboardOutput";
import { generateWebDashboard } from "./generateWebDashboard";
export type DashboardSize = "sm" | "md" | "lg";

const convertHistoricalDataToChart: (historical: {
    [key: string]: {
        [key: string]: number;
    };
}) => LineDataObject[] = (historical) => {
    let keys = Object.keys(historical);
    let response: LineDataObject[] = [];
    let colorPerKey = {
        cases: "blue",
        deaths: "red",
        recovered: "green",
    };

    keys.forEach((key) => {
        let values = Object.values(historical[key]);
        let labels = values.map((_) => " ");
        let title = capitalizeFirstLetter(key);
        // @ts-expect-error
        let color: string = colorPerKey[key];

        response.push({
            title,
            x: labels,
            y: values,
            style: {
                line: color,
            },
        });
    });

    return response;
};

/**
 *
 * @param country Country that the user requested
 * @param size Size that the user requested
 * @param isWeb Boolean that states if the output will be run through the html template
 */
export const countryDashboard = async (
    country: string,
    size: DashboardSize,
    isWeb: boolean
) => {
    let {
        data,
        formalCountryName,
        apiCountryName,
        updated,
    } = await getCountryInfo(country);

    // Make Line data
    let { chartData, date: lineLabel } = await getHistorical(
        "all",
        apiCountryName
    );
    let convertedHistoricalData = convertHistoricalDataToChart(chartData);

    // Parse data
    // prettier-ignore
    let { active, cases, casesPerOneMillion, critical, deathRate, deaths, recovered, recoveryRate, todayCases, todayDeaths } = data;
    let [deathRatePercent, recoveryRatePercent] = convertToPercentage(
        deathRate,
        recoveryRate
    );

    // prettier-ignore
    let [stringCases, stringDeaths, stringRecovered, stringActive, stringCasesPerMillion, stringTodayCases, stringTodayDeaths, stringCritical
	] = normalizeNumbers(cases, deaths, recovered, active, casesPerOneMillion, todayCases, todayDeaths, critical);

    // Make table for dashboard
    let tableLabel = getTimestamp(updated);
    let tableData =
        "\n" +
        columnizeData({
            Cases: stringCases,
            Deaths: stringDeaths,
            Recovered: stringRecovered,
            Active: stringActive,
            "Cases/Million": stringCasesPerMillion,
            "Today Cases": stringTodayCases,
            "Today Deaths": stringTodayDeaths,
            Critical: stringCritical,
            "Mortality %": deathRatePercent,
            "Recovery %": recoveryRatePercent,
        });

    const donutData = [
        {
            percent: Math.round(deathRate * 1e2) / 1e2,
            label: "Mortality %",
            color: "red",
        },
        {
            percent: Math.round(recoveryRate * 1e2) / 1e2,
            label: "Recovery %",
            color: "green",
        },
    ];

    const barData = {
        titles: ["Cases", "Deaths", "Recovered", "Active"],
        data: [cases, deaths, recovered, active],
    };

    const countryInfo = world.filter(
        (country) => country.name.common === formalCountryName
    )[0];
    const [latitude, longitude] = countryInfo.latlng;
    const countryCode = countryInfo.cca2;

    const mapMarker = {
        latitude,
        longitude,
        country: countryCode,
    };

    let response = generateDashboardOutput(
        {
            lineData: convertedHistoricalData,
            lineLabel,
            tableData,
            tableLabel,
            mapMarker,
            barData,
            donutData,
        },
        size
    );

    // generate web based dashboard if request is not from terminal
    if (isWeb) response = generateWebDashboard(response);
    return response;
};

/**
 *
 * @param size Size that the user requested
 * @param isWeb Boolean that states if the output will be run through the html template
 */
export const globalDashboard = async (size: DashboardSize, isWeb: boolean) => {
    let { data, updated } = await getAllInfo();

    // Make line data
    let { chartData, date: lineLabel } = await getHistorical("all");
    let convertedHistoricalData = convertHistoricalDataToChart(chartData);

    // Parse data
    // prettier-ignore
    let {cases, deathRate, deaths, recovered, recoveryRate, active} = data;
    let [deathRatePercent, recoveryRatePercent] = convertToPercentage(
        deathRate,
        recoveryRate
    );

    // prettier-ignore
    let [stringCases, stringDeaths, stringRecovered, stringActive] = normalizeNumbers(cases, deaths, recovered, active)

    // Make table for box
    let tableLabel = getTimestamp(updated);
    let tableData =
        "\n" +
        columnizeData({
            Cases: stringCases,
            Deaths: stringDeaths,
            Recovered: stringRecovered,
            Active: stringActive,
            "Mortality %": deathRatePercent,
            "Recovery %": recoveryRatePercent,
        });

    const donutData = [
        {
            percent: Math.round(deathRate * 1e2) / 1e2,
            label: "Mortality %",
            color: "red",
        },
        {
            percent: Math.round(recoveryRate * 1e2) / 1e2,
            label: "Recovery %",
            color: "green",
        },
    ];

    const barData = {
        titles: ["Cases", "Deaths", "Recovered", "Active"],
        data: [cases, deaths, recovered, active],
    };

    let response = generateDashboardOutput(
        {
            lineData: convertedHistoricalData,
            lineLabel,
            tableData,
            tableLabel,
            barData,
            donutData,
        },
        size
    );

    // generate web based dashboard if request is not from terminal
    if (isWeb) response = generateWebDashboard(response);
    return response;
};
