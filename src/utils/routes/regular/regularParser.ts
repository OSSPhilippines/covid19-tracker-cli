import { getAllInfo, getCountryInfo } from "../../getInformation";
import {
    convertToPercentage,
    normalizeNumbers,
} from "../../libs/numberNormalizers";

export const globalInfo: () => Promise<{
    timeUpdated: number;
    rowsOfData: (string | string[])[];
}> = async () => {
    // Get raw data from getAllInfo
    const { updated, data } = await getAllInfo();
    let { cases, deaths, recovered, deathRate, recoveryRate } = data;

    // Parse data and convert into rows
    let dataInStringArray = normalizeNumbers(cases, deaths, recovered);
    let [deathRatePercent, recoveryRatePercent] = convertToPercentage(
        deathRate,
        recoveryRate
    );

    dataInStringArray.push(deathRatePercent, recoveryRatePercent);

    let rowsOfData = [
        [
            "Cases".magenta,
            "Deaths".red,
            "Recovered".green,
            "Mortality %".red,
            "Recovered %".green,
        ],
        dataInStringArray,
    ];

    return { timeUpdated: updated, rowsOfData };
};

export const countryInfo: (
    country: string
) => Promise<{
    timeUpdated: number;
    formalCountryName: string;
    apiCountryName: string;
    rowsOfData: (string | string[])[];
}> = async (country) => {
    // prettier-ignore
    const { updated, formalCountryName, data, apiCountryName } = await getCountryInfo(country);
    // prettier-ignore
    let {active, cases, casesPerOneMillion, critical, deathRate, deaths,recovered, recoveryRate, todayCases, todayDeaths} = data;

    let [deathRatePercent, recoveryRatePercent] = convertToPercentage(
        deathRate,
        recoveryRate
    );

    // prettier-ignore
    let normalizedNumbers = normalizeNumbers(cases, deaths, recovered, active, casesPerOneMillion, todayCases, todayDeaths, critical);
    // First row contains the first 5 arguments that were passed to normalizeNumbers
    let firstRow = normalizedNumbers.slice(0, 5);
    // Second row contains the rest of the arguments
    let secondRow = normalizedNumbers.slice(5);
    // Then we push the percentages
    secondRow.push(deathRatePercent, recoveryRatePercent);

    // prettier-ignore
    let rowsOfData: (string | string[])[] = [
		[ "Cases".magenta, "Deaths".red, "Recovered".green, "Active".blue, "Cases/Million".blue,], 
		firstRow,
		[ "Today Cases".magenta, "Today Deaths".red, "Critical".red, "Mortaility %".red, "Recovery %".green], 
		secondRow	
	];

    return {
        timeUpdated: updated,
        formalCountryName,
        apiCountryName,
        rowsOfData,
    };
};
