/* eslint-disable no-await-in-loop */

const color     = require('ansi-styles'),
      fs        = require('fs'),
      table3    = require('cli-table3'),
      chart     = require('./chart');

// ansi colors
const 
      // table color
      tblclr = (border) => cyan(border),
      // normal ansi colors
      white = (txt) => color.white.open + txt + color.white.close,
      black = (txt) => color.black.open + txt + color.black.close,
      green = (txt) => color.green.open + txt + color.green.close,
      cyan  = (txt) => color.cyan.open + txt + color.cyan.close,
      magenta = (txt) => color.magenta.open + txt + color.magenta.close,
      yellow = (txt) => color.yellow.open + txt + color.yellow.close,
      red = (txt) => color.red.open + txt + color.red.close,
      // bright ansi colors
      cyanBright = (txt) => color.cyanBright.open + txt + color.cyanBright.close,
      magentaBright = (txt) => color.magentaBright.open + txt + color.magentaBright.close,
      redBright = (txt) => color.redBright.open + txt + color.redBright.close,
      greenBright = (txt) => color.greenBright.open + txt + color.greenBright.close,
      // background ansi color
      cyanBG = (txt) => color.bgCyan.open + txt + color.bgCyan.close,
      // horizontal line
      line = '-'.repeat(60),
      tab = '    ',
      space = ' ',
      br = '\n';


// package.json information
const pkg = JSON.parse(fs.readFileSync('package.json'));
const say = JSON.parse(fs.readFileSync('./lib/sayings/threads.json'));

// random sayings
const randomSay = () => {
    let random = Math.floor(Math.random() * say.length);
    return say[random];
};

// format data
const formatNumber = (value) => {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

// time data
let ts = Date.now(),
    date_ob = new Date(ts),
    date = date_ob.getDate(),
    month = date_ob.getMonth() + 1,
    year = date_ob.getFullYear(),
    currentdate = month + "/" + date + "/" + year;

// table configuration
const borders = { 'top': tblclr('═'),
                  'top-mid': tblclr('╤'),
                  'top-left': tblclr('╔'), 
                  'top-right': tblclr('╗'),
                  'bottom': tblclr('═'), 
                  'bottom-mid': tblclr('╧'), 
                  'bottom-left': tblclr('╚'), 
                  'bottom-right': tblclr('╝'),
                  'left': tblclr('║'), 
                  'left-mid': tblclr('╟'), 
                  'mid': tblclr('─'), 
                  'mid-mid': tblclr('┼'),
                  'right': tblclr('║'), 
                  'right-mid': tblclr('╢'), 
                  'middle': tblclr('│')};

// additional informaton
const source = 'Source: https://www.worldometers.info/coronavirus/',
      repo = 'Code: https://github.com/warengonzaga/covid19-tracker-cli',
      sourceInfo = {colSpan:5,content:source},
      repoInfo = {colSpan:5,content:repo},
      bmcurl = 'warengonza.ga/coffee4dev',
      twitterhandle = '@warengonzaga',
      twitterhashtag = '#covid19trackercli',
      bmcline = 'Love this project? Please consider buying me a cup of coffee!',
      twitterline = 'Follow me on twitter for more updates!',
      gcashNum = '+639176462753',
      ansiBMC = redBright('(Buy Me A Coffee) '+bmcurl),
      ansiTwitter = cyanBG(black(twitterhandle))+space+cyanBG(black(twitterhashtag)),
      ansiGCash = cyan('(GCash) '+gcashNum);

// help menu
exports.help = () => {
    const manual = `
    ${line}
    COVID-19 Tracker CLI v${pkg.version} by Waren Gonzaga
    ${line}

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

    To learn more about the usage... please visit
    https://warengonza.ga/covid19-tracker-cli

    ISO 3166-1 Code List:
    https://warengonza.ga/iso-3166-1-codes

    ${line}
    ${repo}
    ${line}

    "${randomSay()}"
    `;
    const defaultfooter = br+tab+line+br+tab+bmcline+
                          br+tab+'(Buy Me A Coffee) '+bmcurl+
                          br+tab+line+
                          br+tab+twitterline+
                          br+tab+twitterhandle+space+twitterhashtag+br+br;

    return manual+defaultfooter;
};

// covid19 global tracker
exports.covid19globaltracker = (c, d, r, u) => {
    const   cases = c, deaths = d, recovered = r, asof = new Date(u),
            mortalityPercentage = (d/c)*100, recoveredPercentage = (r/c)*100,
            table = new table3({
                head: [{colSpan:5,content:white('COVID-19 Tracker CLI v'+pkg.version+' - Global Update')}],
                chars: borders
            });
    table.push(
        [{colSpan:5,content:yellow('As of '+asof.toLocaleString()+' [Date:'+currentdate+']')}],
        [magenta('Cases'), red('Deaths'), green('Recovered'), red('Mortality %'), green('Recovered %')],
        [formatNumber(cases), formatNumber(deaths), formatNumber(recovered), mortalityPercentage.toFixed(2), recoveredPercentage.toFixed(2)],
        [sourceInfo],[repoInfo]
    );
    const defaultfooter = footerOne+ansiBMC+footerTwo+ansiTwitter+br+br;
    return table.toString()+br+br+space+'"'+green(randomSay())+'"'+defaultfooter;
};

// covid19 country tracker
exports.covid19countrytracker = (n, c, tC, d, tD, r, a, cl, cPOM, u) => {
    const   name = n, cases = c, todayCases = tC,
            deaths = d, todayDeaths = tD, recovered = r,
            active = a, critical = cl, casesPerOneMillion = cPOM,
            mortalityPercentage = (d/c)*100, recoveryPercentage = (r/c)*100,
            asof = new Date(u);
            table = new table3({
                head: [{colSpan:5,content:white('COVID-19 Tracker CLI v'+pkg.version+' - '+name+' Update')}],
                chars: borders
            });
    table.push(
        [{colSpan:5,content:yellow('As of '+asof.toLocaleString()+' [Date:'+currentdate+']')}],
        [magenta('Cases'), red('Deaths'), green('Recovered'), cyan('Active'), cyanBright('Cases/Million')],
        [formatNumber(cases), formatNumber(deaths), formatNumber(recovered), formatNumber(active), formatNumber(casesPerOneMillion)],
        [magentaBright('Today Cases'), redBright('Today Deaths'), redBright('Critical'), red('Mortality %'), greenBright('Recovery %')],
        [formatNumber(todayCases), formatNumber(todayDeaths), formatNumber(critical), mortalityPercentage.toFixed(2), recoveryPercentage.toFixed(2)],
        [sourceInfo],[repoInfo]
    );
    const   tableFooter = table.toString()+br+br+space+'"'+green(randomSay())+'"',
            defaultfooter = footerOne+ansiBMC+footerTwo+ansiTwitter+br+br,
            specialfooter = footerOne+ansiGCash+br+' '+ansiBMC+footerTwo+ansiTwitter+br+br;

    return n=='Philippines' ? tableFooter+specialfooter : tableFooter+defaultfooter;
};

exports.plainglobaltracker = (c, d, r, u) => {
    const   cases = c, deaths = d, recovered = r, asof = new Date(u),
            mortalityPercentage = (d/c)*100, recoveredPercentage = (r/c)*100;

    const visual = `
    ${line}
    COVID-19 Tracker CLI v${pkg.version} - Global Update
    ${line}
    As of ${asof.toLocaleString()} [Date: ${currentdate}]
    ${line}
    Cases       | ${formatNumber(cases)}
    Deaths      | ${formatNumber(deaths)}
    Mortality % | ${mortalityPercentage.toFixed(2)}
    Recovered   | ${formatNumber(recovered)}
    Recovery %  | ${recoveredPercentage.toFixed(2)}
    ${line}
    ${source}
    ${line}
    ${repo}
    ${line}

    "${randomSay()}"
    `;
    const defaultfooter = br+tab+line+br+tab+bmcline+
                          br+tab+'(Buy Me A Coffee) '+bmcurl+
                          br+tab+line+
                          br+tab+twitterline+
                          br+tab+twitterhandle+space+twitterhashtag+br+br;

    return visual+defaultfooter;
};

exports.plaincountrytracker = (n, c, tC, d, tD, r, a, cl, cPOM, u) => {
    const   name = n, cases = c, todayCases = tC,
            deaths = d, todayDeaths = tD, recovered = r,
            active = a, critical = cl, casesPerOneMillion = cPOM,
            mortalityPercentage = (d/c)*100, recoveredPercentage = (r/c)*100,
            asof = new Date(u);

    const visual = `
    ${line}
    COVID-19 Tracker CLI v${pkg.version} - ${name} Update
    ${line}
    As of ${asof.toLocaleString()} [Date: ${currentdate}]
    ${line}
    Cases           | ${formatNumber(cases)}
    Today Cases     | ${formatNumber(todayCases)}
    Deaths          | ${formatNumber(deaths)}
    Today Deaths    | ${formatNumber(todayDeaths)}
    Critical        | ${formatNumber(critical)}
    Mortality %     | ${mortalityPercentage.toFixed(2)}
    Recovered       | ${formatNumber(recovered)}
    Recovery %      | ${recoveredPercentage.toFixed(2)}
    Active          | ${formatNumber(active)}
    Cases/Million   | ${formatNumber(casesPerOneMillion)}
    ${line}
    ${source}
    ${line}
    ${repo}
    ${line}

    "${randomSay()}"
    `;
    const defaultfooter = br+tab+line+br+tab+bmcline+
                          br+tab+'(Buy Me A Coffee) '+bmcurl+
                          br+tab+line+
                          br+tab+twitterline+
                          br+tab+twitterhandle+space+twitterhashtag+br+br,

          specialfooter = br+tab+line+br+tab+bmcline+
                          br+tab+'(GCash) '+gcashNum+
                          br+tab+'(Buy Me A Coffee) '+bmcurl+
                          br+tab+line+
                          br+tab+twitterline+
                          br+tab+twitterhandle+space+twitterhashtag+br+br;

    return n=='Philippines' ? visual+specialfooter : visual+defaultfooter;
};

exports.historyCountryTracker = (n, c, tC, d, tD, r, a, cl, cPOM, u, h, chartType) => {
    const   name = n, cases = c, todayCases = tC,
            deaths = d, todayDeaths = tD, recovered = r,
            active = a, critical = cl, casesPerOneMillion = cPOM,
            mortalityPercentage = (d/c)*100, recoveryPercentage = (r/c)*100,
            asof = new Date(u),
            dates = Object.keys(h.timeline[chartType]),
            from = dates[0],
            to = dates[dates.length - 1],
            table = new table3({
                head: [{colSpan: 5, content: white(`COVID-19 Tracker CLI v ${pkg.version} - ${name} Historical Chart`)}],
                chars: borders,
            }),
            chartData = chart.generate(h, chartType);

    table.push(
        [{colSpan: 5, content: yellow(`As of ${asof.toLocaleString()} Date: [${currentdate}]`)}],
        [magenta('Cases'), red('Deaths'), green('Recovered'), cyan('Active'), cyanBright('Cases/Million')],
        [formatNumber(cases), formatNumber(deaths), formatNumber(recovered), formatNumber(active), formatNumber(casesPerOneMillion)],
        [magentaBright('Today Cases'), redBright('Today Deaths'), redBright('Critical'), red('Mortality %'), greenBright('Recovery %')],
        [formatNumber(todayCases), formatNumber(todayDeaths), formatNumber(critical), mortalityPercentage.toFixed(2), recoveryPercentage.toFixed(2)],
        [{colSpan: 5, content: magenta(`${ucfirst(chartType)} from ${from} to ${to}`)}],
        [{colSpan: 5, content: chartData}],
        [sourceInfo],[repoInfo]
    );

    const   tableFooter = table.toString()+br+br+space+'"'+green(randomSay())+'"',
            defaultfooter = footerOne+ansiBMC+footerTwo+ansiTwitter+br+br,
            specialfooter = footerOne+ansiGCash+br+' '+ansiBMC+footerTwo+ansiTwitter+br+br;
    
    return n == 'Philippines' ? tableFooter+specialfooter : tableFooter+defaultfooter;
}

const   footerOne   = br+br+' '+line+br+' '+bmcline+br+' ',
        footerTwo   = br+' '+line+br+' '+twitterline+br+' ';

// capitalize first letter
const ucfirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);