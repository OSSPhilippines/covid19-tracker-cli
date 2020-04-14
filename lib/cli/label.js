const say = require("../sayings/threads.json"); // sayings
const { color, txt } = require("./helper");
const pkg = require("../../package.json"); // package.json info
const { space, line, br, tab } = txt;

const randomSay = () => say[Math.floor(Math.random() * say.length)];

exports.randomSay = randomSay;

const source = "Source: https://www.worldometers.info/coronavirus/",
  repo = "Code: https://github.com/warengonzaga/covid19-tracker-cli",
  help = "Help: Try to append the URL with /help to learn more...",
  bmcurl = "warengonza.ga/coffee4dev",
  twitterhandle = "@warengonzaga",
  twitterhashtag = "#covid19trackercli",
  bmc = "(Buy Me A Coffee) ",
  bmcline = "Love this project? Help us to help others by means of coffee!",
  twitterline = "Follow me on twitter for more updates!",
  gcashNum = "+639176462753",
  ansiBMC = color.redBright("(Buy Me A Coffee) " + bmcurl),
  ansiTwitter =
    color.cyanBG(color.black(twitterhandle)) +
    space +
    color.cyanBG(color.black(twitterhashtag)),
  gCash = "(GCash) ",
  ansiGCash = color.cyan(gCash + gcashNum),
  title = {
    global: "COVID-19 Tracker CLI v" + pkg.version + " - Global Update",
    country: (name) =>
      "COVID-19 Tracker CLI v" + pkg.version + " - " + name + " Update",
    globalHistory:
      "COVID-19 Tracker CLI v" + pkg.version + " - Global Historical Chart",
    history: (name) =>
      `COVID-19 Tracker CLI v ${pkg.version} - ${name} Historical Chart`,
  },
  asOfDate = (asof, currentdate) =>
    "As of " + asof.toLocaleString() + " [Date:" + currentdate + "]",
  footerOne = br + br + " " + line + br + " " + bmcline + br + " ",
  footerTwo = br + " " + line + br + " " + twitterline + br + " ",
  defaultFooter = footerOne + ansiBMC + footerTwo + ansiTwitter + br + br,
  specialFooter =
    footerOne +
    ansiGCash +
    br +
    " " +
    ansiBMC +
    footerTwo +
    ansiTwitter +
    br +
    br,
  plainDefaultFooter =
    br +
    tab +
    line +
    br +
    tab +
    bmcline +
    br +
    tab +
    bmc +
    bmcurl +
    br +
    tab +
    line +
    br +
    tab +
    twitterline +
    br +
    tab +
    twitterhandle +
    space +
    twitterhashtag +
    br +
    br,
  plainCountryDefaultFooter =
    br +
    tab +
    line +
    br +
    tab +
    bmcline +
    br +
    tab +
    bmc +
    bmcurl +
    br +
    tab +
    line +
    br +
    tab +
    twitterline +
    br +
    tab +
    twitterhandle +
    space +
    twitterhashtag +
    br +
    br,
  plainCountrySpecialFooter =
    br +
    tab +
    line +
    br +
    tab +
    bmcline +
    br +
    tab +
    gCash +
    gcashNum +
    br +
    tab +
    bmc +
    bmcurl +
    br +
    tab +
    line +
    br +
    tab +
    twitterline +
    br +
    tab +
    twitterhandle +
    space +
    twitterhashtag +
    br +
    br,
  manual = `
    ${line}
    COVID-19 Tracker CLI v${pkg.version} by Waren Gonzaga
    ${line}

    Basic Usage:

    /<country name> ................... by country stats
                                        ex. /philippines /korea
    /<ISO 3166-1 code> ................ by country stats shortcut
                                        ex. /ph /kor

    /cmd .............................. if using CMD
    /cmd/<country name> ............... by country stats on CMD
    /cmd/<ISO 3166-1 code> ............ by country stats shortcut on CMD

    /plain or /basic .................. if your cli does not support ANSI encoding
                                        similar to /cmd usage and layout
                                        ex. /plain/philippines or /plain/ph
                                        /basic/philippines or /basic/ph

    ${line}

    ANSI Supported Features

    /history/ or /history/all ......... historical chart globally

    /history/<country name> ........... historical chart for cases of a country
                                        ex. /history/philippines /history/korea
    /history/<ISO 3166-1 code> ........ shortcut historical chart for cases of a country
                                        ex. /history/ph /history/kor

    Cases and Deaths is currently available for historical chart.

    /history/ph/cases or /history/ph/deaths

    ${line}

    To learn more about the usage... please visit
    https://warengonza.ga/covid19-tracker-cli

    ISO 3166-1 Code List:
    https://warengonza.ga/iso-3166-1-codes

    ${line}
    ${repo}
    ${line}

    ${randomSay()}
    `,
  helpMenu =
    manual +
    br +
    tab +
    line +
    br +
    tab +
    bmcline +
    br +
    tab +
    bmc +
    bmcurl +
    br +
    tab +
    txt.line +
    br +
    tab +
    twitterline +
    br +
    tab +
    twitterhandle +
    space +
    twitterhashtag +
    br +
    br;

exports.labels = {
  pkg,
  source,
  repo,
  help,
  bmcurl,
  twitterhandle,
  twitterhashtag,
  bmc,
  bmcline,
  twitterline,
  gCash,
  gcashNum,
  ansiBMC,
  ansiTwitter,
  ansiGCash,
  title,
  asOfDate,
  footerOne,
  footerTwo,
  defaultFooter,
  specialFooter,
  plainDefaultFooter,
  plainCountryDefaultFooter,
  plainCountrySpecialFooter,
  manual,
  helpMenu,
};
