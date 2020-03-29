// node modules
const express   = require('express'),
      app       = express(),
      util      = require('./bin/util'),
      fs        = require('fs'),
      axios     = require('axios'),
      covid19   = require('./lib/cli');

// set port
const port = process.env.port || 7070;

// package.json info
const pkg = JSON.parse(fs.readFileSync('package.json'));

// api base url
const apiBaseURL = "https://corona.lmao.ninja";

// global route for covid19 tracker
app.get('/', async (req, res, next) => {
    const userAgent = req.headers['user-agent'],
          api = await axios.get(`${apiBaseURL}/all`),
          data = api.data;
    if (util.isCommandline(userAgent)) {
      await res.send(covid19.covid19globaltracker(
        data.cases, data.deaths,
        data.recovered, data.updated
      ));
      return null;
    }
    return next();
});

// for cmd and powershell
app.get(['/plain','/cmd','/basic'], async (req, res, next) => {
  const userAgent = req.headers['user-agent'],
          api = await axios.get(`${apiBaseURL}/all`),
          data = api.data;
    if (util.isCommandline(userAgent)) {
      await res.send(covid19.plainglobaltracker(
        data.cases, data.deaths,
        data.recovered, data.updated
      ));
      return null;
    }
    return next();
});

// help options
app.get(['/help','/manual','/cmd/help','/plain/help','/basic/help'], async (req, res, next) => {
  const userAgent = req.headers['user-agent'];
    if (util.isCommandline(userAgent)) {
      await res.send(covid19.help());
      return null;
    }
    return next();
});

// by country route for covid19 tracker
app.get('/:country', async (req, res, next) => {
  const userAgent = req.headers['user-agent'],
        countryData = req.params.country,
        api = await axios.get(`${apiBaseURL}/countries/${countryData}`),
        all = await axios.get(`${apiBaseURL}/all`),
        u = all.data,
        d = api.data;
  if (util.isCommandline(userAgent)) {
    await res.send(covid19.covid19countrytracker(
      d.country, d.cases, d.todayCases, 
      d.deaths, d.todayDeaths, d.recovered, 
      d.active, d.critical, d.casesPerOneMillion,
      u.updated
    ));
    return null;
  }
  return next();
});

// by country route for covid19 tracker
app.get(['/plain/:country','/cmd/:country','/basic/:country'], async (req, res, next) => {
  const userAgent = req.headers['user-agent'],
        countryData = req.params.country,
        api = await axios.get(`${apiBaseURL}/countries/${countryData}`),
        all = await axios.get(`${apiBaseURL}/all`),
        u = all.data,
        d = api.data;
  if (util.isCommandline(userAgent)) {
    await res.send(covid19.plaincountrytracker(
      d.country, d.cases, d.todayCases, 
      d.deaths, d.todayDeaths, d.recovered, 
      d.active, d.critical, d.casesPerOneMillion,
      u.updated
    ));
    return null;
  }
  return next();
});

// by historical chart by country
app.get('/history/:country/:chartType(cases|deaths)?', async (req, res, next) => {
  const userAgent = req.headers['user-agent'],
        countryData = req.params.country,
        chartType = req.params.chartType || 'cases',
        
        summary = await axios.get(`${apiBaseURL}/countries/${countryData}`),
        history = await axios.get(`${apiBaseURL}/v2/historical/${summary.data.country}`),
        all = await axios.get(`${apiBaseURL}/all`),
        s = summary.data,
        h = history.data;
        u = all.data;

  if (util.isCommandline(userAgent)) {
    await res.send(
      covid19.historyCountryTracker(
        s.country, s.cases, s.todayCases, 
        s.deaths, s.todayDeaths, s.recovered, 
        s.active, s.critical, s.casesPerOneMillion,
        u.updated, h, chartType
      )
    );
    return null;
  }
  return next();
});

app.get('*', (req, res) => res.send(`
Welcome to COVID-19 Tracker CLI by Waren Gonzaga
Please visit: https://warengonza.ga/covid19-tracker-cli
\n`));

app.listen(port, () => console.log(`COVID-19 Tracker v${pkg.version} is listening on port ${port}!`));
