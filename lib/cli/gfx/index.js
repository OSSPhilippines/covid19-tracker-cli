const 
    blessed         =   require('blessed'),
    fs              =   require('fs'),   
    contrib         =   require('blessed-contrib'),
    present         =   require('./presenter'),
    pkg             =   require('../../../package.json'),
    xml2js          =   require('xml2js'),
    say             =   require('../../sayings/threads.json'),
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
    ansiGCash       =   '(GCash) '+gcashNum,
    XMLTemplate       =   '/template.xml';

let cachedTemplate = null

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


exports.historyCountryTracker = (req, res, n, c, tC, d, tD, r, a, cl, cPOM, u, h, chartType, countryInfo) => {
    const   name = n, cases = c, todayCases = tC,
            deaths = d, todayDeaths = tD, recovered = r,
            active = a, critical = cl, casesPerOneMillion = cPOM,
            mortalityPercentage = (d/c)*100, recoveredPercentage = (r/c)*100,
            asof = new Date(u),
            dates = Object.keys(h.timeline[chartType]),
            from = dates[0],
            to  = dates[dates.length - 1],
            parser = new xml2js.Parser(),
            builder = new xml2js.Builder(),
            tableFooter = randomSay(),
            defaultfooter = ansiBMC+ansiTwitter+br+br,
            specialfooter = ansiGCash+br+ansiBMC+ansiTwitter+br+br;
    
    const parseXML = (data) => {
        parser.parseString(data, function (err, result) {
      
            const casesDataTable = 
                '\n' +
                `            ,${cases},${deaths},${recovered},${active},${casesPerOneMillion}\n` +
                '            ,Today Cases,Today Deaths,Critical,Mortality %,Recovery %\n' +
                `            ,${todayCases},${todayDeaths},${critical},${mortalityPercentage},${recoveredPercentage}\n`;
        
            // header
            result.document.page[0].item[0].markdown[0].markdown[0] = header+br+tagline
            
            // map
            result.document.page[0].item[1].map[0].markers[0].m[0].$ = {
                lat: countryInfo.lat,
                lon: countryInfo.long,
                char: '\u24E7'+` ${name}`,
                color: 'magenta',
            };

            // Doughnut/donut
            result.document.page[0].item[4].donut[0].data[0].m[0].$={
                color: 'red',
                percent: parseFloat(mortalityPercentage).toFixed(2),
                label: 'Mortality',
            };

            result.document.page[0].item[4].donut[0].data[0].m[1].$={
                color: 'green',
                percent: parseFloat(recoveredPercentage).toFixed(2),
                label: 'Recovery',
            };

            // bar graph
            result.document.page[0].item[3].bar[0].$['data-data'] = `${cases},${deaths},${recovered},${active}`;
            
            // line graph
            result.document.page[0].item[5].line[0].label = `Cases from ${from} to ${to}`
            result.document.page[0].item[5].line[0].data[0].m[0].$ = {
                title: 'Cases',
                'style-line': 'blue',
                x:Object.keys(h.timeline.cases).join(','),
                y:Object.values(h.timeline.cases).join(','),
            };

            result.document.page[0].item[5].line[0].data[0].m[1].$ = {
                title: 'Deaths',
                'style-line': 'red',
                x:Object.keys(h.timeline.deaths).join(','),
                y:Object.values(h.timeline.deaths).join(','),
            };

            result.document.page[0].item[5].line[0].data[0].m[2].$ = {
                title: 'Recovered',
                'style-line': 'green',
                x:Object.keys(h.timeline.recovered).join(','),
                y:Object.values(h.timeline.recovered).join(','),
            };

            // Historical data table
            result.document.page[0].item[2].table[0].label = 'Historical data as of '+asof.toLocaleString()+' [Date:'+currentdate+']'
            result.document.page[0].item[2].table[0]['data-data'][0] = casesDataTable;
            
            // footer
            result.document.page[0].item[6].markdown[0].markdown[0] = (n.toLowerCase() == 'philippines') ? tableFooter+br+specialfooter+br+source+br+repo : tableFooter+br+defaultfooter+br+source+br+repo;
            
            present(req, res, builder.buildObject(result), function(err) {
                if (err) console.log(new Error().stack);
                if (err) return contrib.serverError(req, res, err);
            });
          
        });
    }

    const readXML = () => {
        fs.readFile(__dirname + XMLTemplate, (err, data) => {
            cachedTemplate = data
            parseXML(data)
        });
    }

    // read XML template from file or cache
    if(!cachedTemplate) return readXML ()
    
    try {
        return parseXML(new Buffer.from(cachedTemplate.toString()))   
    } catch (e) {
        return readXML ()
    }
        
    
};
