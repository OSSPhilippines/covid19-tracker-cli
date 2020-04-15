const 
    blessed         =   require('blessed'),
    pkg             =   require('../../../package.json'),
    say             =   require('../../sayings/threads.json'),
    serverUtil      =   require('./server-util')
    template        =   require ('./template.js'),
    {sm, md, lg}    =   require('../../../bin/util/layout')
    ts              =   Date.now(),
    date_ob         =   new Date(ts),
    date            =   date_ob.getDate(),
    month           =   date_ob.getMonth() + 1,
    year            =   date_ob.getFullYear(),
    currentdate     =   month + "/" + date + "/" + year,
    space           =   ' ',
    br              =   '\n',
    header          =   '`COVID19-TRACKER-CLI (v'+pkg.version+')`',
    tagline         =   '*A curl-based command line tracker for Novel Coronavirus or COVID-19 pandemic.*',
    source          =   'Source: https://www.worldometers.info/coronavirus/',
    repo            =   'Code: https://github.com/warengonzaga/covid19-tracker-cli',
    bmcurl          =   'warengonza.ga/coffee4dev',
    twitterhandle   =   '@warengonzaga',
    twitterhashtag  =   '#covid19trackercli',
    gcashNum        =   '+639176462753',
    ansiBMC         =   '`(Buy Me A Coffee)` '+bmcurl,
    ansiTwitter     =   twitterhandle+space+twitterhashtag,
    ansiGCash       =   '(GCash) '+gcashNum;


// random sayings
const randomSay = () => {
    let random = Math.floor(Math.random() * say.length);
    return say[random];
};

const patchBlessed = () => {
    blessed.Program.prototype.listem = function() {}
    process.on = function() {}
};

patchBlessed();

exports.historyCountryTracker = (req, res, n, c, tC, d, tD, r, a, cl, cPOM, u, h, chartType, countryInfo, chartSize = 'sm') => {
    const   name = n, cases = c, todayCases = tC,
            deaths = d, todayDeaths = tD, recovered = r,
            active = a, critical = cl, casesPerOneMillion = cPOM,
            mortalityPercentage = (d/c)*100, recoveredPercentage = (r/c)*100,
            asof = new Date(u),
            dates = Object.keys(h.timeline[chartType]),
            from = dates[0],
            to  = dates[dates.length - 1],
            tableFooter = randomSay(),
            defaultfooter = ansiBMC+ansiTwitter+br+br,
            specialfooter = ansiGCash+br+ansiBMC+ansiTwitter+br+br,
            defaultHeader = header+br+tagline,
            footer = (n.toLowerCase() == 'philippines') ? tableFooter+br+specialfooter+br+source+br+repo : tableFooter+br+defaultfooter+br+source+br+repo,
            defaultChartStyle = chartSize === 'sm' ? sm : (chartSize === 'md' ? md : lg);

    serverUtil.loadTemplate(template, defaultChartStyle, {
        name,
        cases,
        deaths,
        recovered,
        active,
        casesPerOneMillion,
        todayCases,
        todayDeaths,
        critical,
        mortalityPercentage,
        recoveredPercentage,
        countryInfo,
        from,
        to,
        currentdate,
        asof,
        h,
        defaultHeader,
        footer,
    }, (screen) => {
        res.send(screen+'\r\n'+'\033[?25h')
    })
   
};

