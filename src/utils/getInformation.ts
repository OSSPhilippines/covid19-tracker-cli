import axios from "axios";
axios.defaults.baseURL = "https://disease.sh/v3/covid-19";

let countryCodes: { [key: string]: string } = {};
(async () => {
    countryCodes = (await axios.get("http://country.io/names.json")).data;
})();

export interface PlainData {
    data: {
        [key: string]: string;
    };
    metainfo: {
        [key: string]: number | string;
    };
}

/**
 * @param isPlain Set to true to recieve an object containing the responses instead of the rows
 * @returns an object containing the data and metainfo **if isPlain is set to true**
 * @returns an array in the format of [timestamp, rows] **if isPlain is set to false**
 */
export const getAllInfo: (
    isPlain?: boolean
) => Promise<[number, (string[] | string)[]] | PlainData> = async (
    isPlain = false
) => {
    let { data: globalData } = await axios.get("/all");
    let { cases, deaths, recovered, updated } = globalData;

    let mortalityPercentage = ((deaths / cases) * 100).toFixed(2) + "%";
    let recoveredPercentage = ((recovered / cases) * 100).toFixed(2) + "%";

    [cases, deaths, recovered] = [cases, deaths, recovered].map((num: number) =>
        num.toLocaleString("en-US", { maximumFractionDigits: 0 })
    );

    // Return object containing information if isPlain is set to true
    if (isPlain) {
        return {
            data: {
                Cases: cases,
                Deaths: deaths,
                "Mortality %": mortalityPercentage,
                Recovered: recovered,
                "Recovered %": recoveredPercentage,
            },
            metainfo: {
                updated,
            },
        };
    }

    // Return rows if isPlain is set to false
    // prettier-ignore
    return [updated, [
        ["Cases".magenta, "Deaths".red,"Recovered".green, "Mortality %".red,"Recovered %".green],
        [cases, deaths, recovered, mortalityPercentage, recoveredPercentage]]]
};

/**
 * @param country the country code or string that the user provides from req.params or CLI
 * @param isPlain Set to true to recieve an object containing the responses instead of the rows
 * @returns an object containing the data and metainfo **if isPlain is set to true**
 * @returns an array in the format of [timestamp, API countryname, formal countryname, rows[]] **if isPlain is false**
 */
export const getCountryInfo: (
    country: string,
    isPlain?: boolean
) => Promise<
    [number, string, string, (string[] | string)[]] | PlainData
> = async (country, isPlain) => {
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

        // Return object containing information if isPlain is set to true
        if (isPlain) {
            return {
                data: {
                    Cases: cases,
                    "Today Cases": todayCases,
                    Active: active,
                    Recovered: recovered,
                    Deaths: deaths,
                    "Today Deaths": todayDeaths,
                    Critical: critical,
                    "Mortality %": mortalityPercentage,
                    "Recovery %": recoveredPercentage,
                    "Cases/Million": casesPerOneMillion,
                },
                metainfo: {
                    updated,
                    countryName,
                },
            };
        }

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
