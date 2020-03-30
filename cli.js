#!/usr/bin/env node
const axios = require('axios'),
      clear = require('clear'),
      ora = require('ora'),
      spinner = ora({ text: 'Loading...'}),
      covid19 = require('./lib/cli'),
      apiBaseURL = "https://corona.lmao.ninja",
      argv = require('yargs')
            .usage('Usage: $0 <country> [options]')
            .example('$0 PH', 'Generate stats for Philippines. ISO 3166-1 is supported')
            .nargs('plain', 0)
            .describe('plain', 'If your cli does not support ANSI encoding similar to /cmd usage and layout')        
            .example('$0 PH --plain', 'Generate stats for Philippines with plain format')
            .help('help')
            .argv;   

const getGlobal = (data) => {
    const params = [ data.cases, data.deaths,data.recovered, data.updated];
    let result;
    
    if(argv.plain) {
        result = covid19.plainglobaltracker(...params);
        spinner.stop();
        return console.log(result);
    }

    result = covid19.covid19globaltracker(...params);
    spinner.stop();
    return console.log(result);
}

const getCountry = async (u, country) => {
    let result;
    const api = await axios.get(`${apiBaseURL}/countries/${country}`),
            d = api.data;
    
    const params = [
        d.country, d.cases, d.todayCases, d.deaths, d.todayDeaths, 
        d.recovered, d.active, d.critical, d.casesPerOneMillion,
        u.updated
    ];

    if(argv.plain) {
        result = covid19.plaincountrytracker(...params);
        spinner.stop();
        return console.log(result);
    }
    result = covid19.covid19countrytracker(...params);
    spinner.stop();
    return console.log(result);
}
       
(async () => {
    clear();
    country = argv._[0];      
    spinner.start();
    const all = await axios.get(`${apiBaseURL}/all`);
    !country && getGlobal(all.data);
    country && getCountry(all.data, country);
})()
