/* eslint-disable no-await-in-loop */

const   style   = require('ansi-styles'),
        request = require("request"),
        fs      = require('fs'),
        table3   = require('cli-table3');

const   tblopn = style.cyan.open,
        tblcls = style.cyan.close;

// package.json information
const   pkg = JSON.parse(fs.readFileSync('package.json'));

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

// api request for global data
request.get("https://corona.lmao.ninja/all", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    globalData = JSON.parse(body);
});

// covid19 global tracker
exports.covid19globaltracker = () => {
    const   cases = globalData.cases, 
            deaths = globalData.deaths, 
            recovered = globalData.recovered,
            asof = new Date(globalData.updated),
            table = new table3({
                head: [{colSpan:3,content:`${style.white.open}COVID-19 Tracker CLI v`+pkg.version+` - Global Update${style.white.close}`}],
                chars: {    'top': `${tblopn}═${tblcls}`,
                            'top-mid': `${tblopn}╤${tblcls}`,
                            'top-left': `${tblopn}╔${tblcls}`, 
                            'top-right': `${tblopn}╗${tblcls}`,
                            'bottom': `${tblopn}═${tblcls}`, 
                            'bottom-mid': `${tblopn}╧${tblcls}`, 
                            'bottom-left': `${tblopn}╚${tblcls}`, 
                            'bottom-right': `${tblopn}╝${tblcls}`,
                            'left': `${tblopn}║${tblcls}` , 
                            'left-mid': `${tblopn}╟${tblcls}` , 
                            'mid': `${tblopn}─${tblcls}` , 
                            'mid-mid': `${tblopn}┼${tblcls}`,
                            'right': `${tblopn}║${tblcls}` , 
                            'right-mid': `${tblopn}╢${tblcls}` , 
                            'middle': `${tblopn}│${tblcls}` }
            });

    table.push(
        [{colSpan:3,content:style.gray.open+'As of '+asof.toLocaleString()+' [Date:'+currentdate+']'+style.gray.close}],
        [`${style.magenta.open}Cases${style.magenta.close}`, `${style.red.open}Deaths${style.red.close}`, `${style.green.open}Recovered${style.green.close}`],
        [formatNumber(cases), formatNumber(deaths), formatNumber(recovered)],
        [{colSpan:3,content:style.gray.open+`Source: https://www.worldometers.info/coronavirus/`+style.gray.close}],
        [{colSpan:3,content:style.gray.open+`Code: https://github.com/warengonzaga/covid19-tracker-cli`+style.gray.close}]
    );
    return table.toString()+'\n'+footer;
};

const footer = `
 Always wash your hands, stay safe... 

 ---
 Love this project? Please consider buying me a cup of coffee!
 ${style.yellow.open}buymeacoff.ee/warengonzaga${style.yellow.close}

 ---
 Follow ${style.bgCyan.open}${style.black.open}@warengonzaga${style.black.close}${style.bgCyan.close} for more updates!
\n`;
