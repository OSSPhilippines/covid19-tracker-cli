/* eslint-disable no-await-in-loop */

const   style   = require('ansi-styles'),
        request = require("request"),
        fs      = require('fs');

// package.json information
const pkg = JSON.parse(fs.readFileSync('package.json'));

// format data
const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

// time data
let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let currentdate = month + "/" + date + "/" + year;

// api request for global data
request.get("https://corona.lmao.ninja/all", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    globalData = JSON.parse(body);
});

// covid19 global tracker
const covid19globaltracker = (
    trckrvrsn = pkg.version,
    cases = globalData.cases, 
    deaths = globalData.deaths, 
    recovered = globalData.recovered,
    asof = new Date(globalData.updated)
) => `
──────────────────────────────────────────────────
 ${style.cyan.open}Waren Gonzaga's Tracker v${trckrvrsn}${style.cyan.close} | ${style.red.open}COVID19${style.red.close} ${style.yellow.open}[Global]${style.yellow.close}
──────────────────────────────────────────────────
 As of ${asof.toLocaleString()}

 ${style.magenta.open}Cases:${style.magenta.close} ${formatNumber(cases)}
 ${style.red.open}Deaths:${style.red.close} ${formatNumber(deaths)}
 ${style.green.open}Recovered:${style.green.close} ${formatNumber(recovered)}
 
 ---
 ${style.gray.open}Source: https://www.worldometers.info/coronavirus/${style.gray.close}
 ${style.gray.open}Date: ${currentdate}${style.gray.close}
──────────────────────────────────────────────────

 Love this project? Please consider buying me a cup of coffee!
 ${style.yellow.open}buymeacoff.ee/warengonzaga${style.yellow.close}
 ---
 Follow ${style.bgCyan.open}${style.black.open}@warengonzaga${style.black.close}${style.bgCyan.close} for more updates!
\n`;

module.exports = {
    covid19globaltracker
};