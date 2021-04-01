const { version } = require("../../package.json");

/**
 * This file is a centralized location to get responses to the user
 * Such as the BMC link, the twitter link, github repo page etc.
 */

export const welcomeMessage = `Welcome to COVID-19 Tracker & CLI v${version} by Waren Gonzaga with Wareneutron Developers`;
export const lines = {
    notFound: `\n${welcomeMessage}\n\nPlease visit: https://warengonza.ga/covid19-tracker-cli\n\n`,
    defaultHeader: `COVID-19 Tracker & CLI v${version}`,
    helpMessage: `Help: Try to append the URL with /help to learn more...`,
    source: `Source: https://www.worldometers.info/coronavirus`,
    repoLink: `Code: https://github.com/warengonzaga/covid19-tracker-cli`,
    sponsorMessage: `Love this project? Help us to help others by means of coffee!\n`,
    GCashMessage: `(GCash) +639176462753`,
    BMCLink: `(Buy Me A Coffee) warengonza.ga/coffee4dev`,
    twitterPlug: `Follow me on twitter for more updates!\n`,
    handleHashtag: ["@warengonzaga", "#covid19trackercli"],
    docsLink: "Docs: docs.wareneutron.com/covid19-tracker-cli",
    WNrepoLink: "Repo: repo.wareneutron.com/covid19-tracker-cli",
    WNDonateLink: "Donate:     wareneutron.com/donate",
};
