import axios from "axios";
let countryCodes: { [key: string]: string } = {};
(async () => {
    countryCodes = (await axios.get("http://country.io/names.json")).data;
})();

export const convertCountryCode: (country: string) => Promise<string> = async (
    country
) => {
    // Wait 1 second for countryCodes to initialize, needed for CLI
    if (Object.keys(countryCodes).length === 0) {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }

    if (country.length < 3) country = countryCodes[country.toUpperCase()];

    if (country === undefined || typeof country === "undefined")
        throw new Error(`Cannot find provided country`);
    else return country;
};
