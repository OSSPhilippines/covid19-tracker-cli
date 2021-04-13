import { getAllInfo, getCountryInfo } from "../../getInformation";
import {
    convertToPercentage,
    normalizeNumbers,
} from "../../libs/numberNormalizers";

export const globalInfoPlain: () => Promise<{
    timeUpdated: number;
    data: {
        Cases: string;
        Deaths: string;
        "Mortality %": string;
        Recovered: string;
        "Recovered %": string;
    };
}> = async () => {
    const { updated, data } = await getAllInfo();
    // Destructure data
    const { cases, deathRate, deaths, recovered, recoveryRate } = data;

    // Normalize and convert to percentages
    const [stringCases, stringDeaths, stringRecovered] = normalizeNumbers(
        cases,
        deaths,
        recovered
    );
    const [stringDeathRate, stringRecoveryRate] = convertToPercentage(
        deathRate,
        recoveryRate
    );

    return {
        timeUpdated: updated,
        data: {
            Cases: stringCases,
            Deaths: stringDeaths,
            "Mortality %": stringDeathRate,
            Recovered: stringRecovered,
            "Recovered %": stringRecoveryRate,
        },
    };
};

export const countryInfoPlain: (
    country: string
) => Promise<{
    timeUpdated: number;
    apiCountryName: string;
    formalCountryName: string;
    data: {
        Cases: string;
        "Today Cases": string;
        Active: string;
        Recovered: string;
        Deaths: string;
        "Today Deaths": string;
        Critical: string;
        "Mortality %": string;
        "Recovery %": string;
        "Cases/Million": string;
    };
}> = async (country) => {
    // prettier-ignore
    const { updated, formalCountryName, data, apiCountryName } = await getCountryInfo(country);
    // prettier-ignore
    let {active, cases, casesPerOneMillion, critical, deathRate, deaths,recovered, recoveryRate, todayCases, todayDeaths} = data;

    let [deathRatePercent, recoveryRatePercent] = convertToPercentage(
        deathRate,
        recoveryRate
    );

    // Disgusting code
    // prettier-ignore
    let [
		stringCases,
		stringDeaths,
		stringRecovered,
		stringActive,
		stringCasesPerMillion,
		stringTodayCases,
		stringTodayDeaths,
		stringCritical
	] = normalizeNumbers(cases, deaths, recovered, active, casesPerOneMillion, todayCases, todayDeaths, critical);

    return {
        timeUpdated: updated,
        apiCountryName,
        formalCountryName,
        data: {
            Cases: stringCases,
            "Today Cases": stringTodayCases,
            Active: stringActive,
            Recovered: stringRecovered,
            Deaths: stringDeaths,
            "Today Deaths": stringTodayDeaths,
            Critical: stringCritical,
            "Mortality %": deathRatePercent,
            "Recovery %": recoveryRatePercent,
            "Cases/Million": stringCasesPerMillion,
        },
    };
};
