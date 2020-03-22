/* eslint-disable no-await-in-loop */

const style     = require('ansi-styles'),
      fs        = require('fs'),
      table3    = require('cli-table3');

// ansi style and colors

const 
      // table color
      tblclr = (border) => {return cyan(border);},
      // normal ansi colors
      white = (txt) => {return style.white.open+txt+style.white.close;},
      black = (txt) => {return style.black.open+txt+style.black.close;},
      green = (txt) => {return style.green.open+txt+style.green.close;},
      cyan = (txt) => {return style.cyan.open+txt+style.cyan.close;},
      magenta = (txt) => {return style.magenta.open+txt+style.magenta.close;},
      yellow = (txt) => {return style.yellow.open+txt+style.yellow.close;},
      red = (txt) => {return style.red.open+txt+style.red.close;},
      // bright ansi colors
      cyanBright = (txt) => {return style.cyanBright.open+txt+style.cyanBright.close;},
      magentaBright = (txt) => {return style.magentaBright.open+txt+style.magentaBright.close;},
      redBright = (txt) => {return style.redBright.open+txt+style.redBright.close;},
      // background ansi color
      cyanBG = (txt) => {return style.bgCyan.open+txt+style.bgCyan.close;};


// package.json information
const pkg = JSON.parse(fs.readFileSync('package.json'));

// format data
const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
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
      sourceGlobal = {colSpan:5,content:source},
      repoGlobal = {colSpan:5,content:repo},
      sourceCountry = {colSpan:5,content:source},
      repoCountry = {colSpan:5,content:repo};

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
        [sourceGlobal],[repoGlobal]
    );
    return table.toString()+'\n'+footer;
};

// covid19 country tracker
exports.covid19countrytracker = (n, c, tC, d, tD, r, a, cl, cPOM, u) => {
    const   name = n, cases = c, todayCases = tC,
            deaths = d, todayDeaths = tD, recovered = r,
            active = a, critical = cl, casesPerOneMillion = cPOM,
            mortalityPercentage = (d/c)*100, recoveredPercentage = (r/c)*100,
            asof = new Date(u);
            table = new table3({
                head: [{colSpan:5,content:white('COVID-19 Tracker CLI v'+pkg.version+' - '+name+' Update')}],
                chars: borders
            });
    table.push(
        [{colSpan:5,content:yellow('As of '+asof.toLocaleString()+' [Date:'+currentdate+']')}],
        [magenta('Cases'), red('Deaths'), green('Recovered'), cyan('Active'), cyanBright('Cases Per Million')],
        [formatNumber(cases), formatNumber(deaths), formatNumber(recovered), formatNumber(active), formatNumber(casesPerOneMillion)],
        [magentaBright('Today Cases'), redBright('Today Deaths'), redBright('Critical'), red('Mortality %'), green('Recovered %')],
        [formatNumber(todayCases), formatNumber(todayDeaths), formatNumber(critical), mortalityPercentage.toFixed(2), recoveredPercentage.toFixed(2)],
        [sourceCountry],[repoCountry]
    );
    return table.toString()+'\n'+footer;
};

// cli footer
const footer = `
 Always wash your hands, stay safe...

 ---
 Love this project? Please consider buying me a cup of coffee!
 ${yellow('warengonzaga.com/buymeacoffee')}

 ---
 Follow ${cyanBG(black('@warengonzaga'))} for more updates!
\n`;
