// node modules
const express     = require('express'),
      app         = express(),
      util        = require('./bin/util'),
      axios       = require('axios'),
      covid19     = require('./lib/cli'),
      covid19GFX = require('./lib/cli/gfx'),
      pkg         = require('./package.json'),    // package.json info
      apiBaseURL  = "https://corona.lmao.ninja/v2",  // NovelCOVID API
      port        = process.env.port || 7070;     // set port

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

// global historical chart
app.get(['/history/all/:chartType(cases|deaths)?', '/history/'], async (req, res, next) => {
  const userAgent = req.headers['user-agent'],
        api = await axios.get(`${apiBaseURL}/all`),
        chartType = req.params.chartType || 'cases',
        history = await axios.get(`${apiBaseURL}/historical/all?lastdays=all`),
        h = history.data;
        data = api.data;
  
  if (util.isCommandline(userAgent)) {
    await res.send(covid19.historyGlobalTracker(
      data.cases, data.deaths,
      data.recovered, data.updated,
      h, chartType
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
        d = api.data;
  if (util.isCommandline(userAgent)) {
    await res.send(covid19.covid19countrytracker(
      d.country, d.cases, d.todayCases, 
      d.deaths, d.todayDeaths, d.recovered, 
      d.active, d.critical, d.casesPerOneMillion,
      d.updated
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
        d = api.data;
  if (util.isCommandline(userAgent)) {
    await res.send(covid19.plaincountrytracker(
      d.country, d.cases, d.todayCases, 
      d.deaths, d.todayDeaths, d.recovered, 
      d.active, d.critical, d.casesPerOneMillion,
      d.updated
    ));
    return null;
  }
  return next();
});

// historical chart by country
app.get('/history/:country/:chartType(cases|deaths)?', async (req, res, next) => {
  const userAgent = req.headers['user-agent'],
        countryData = req.params.country,
        chartType = req.params.chartType || 'cases',
        summary = await axios.get(`${apiBaseURL}/countries/${countryData}`),
        history = await axios.get(`${apiBaseURL}/historical/${summary.data.country}?lastdays=all`),
        s = summary.data,
        h = history.data;

  if (util.isCommandline(userAgent)) {
    await res.send(
      covid19.historyCountryTracker(
        s.country, s.cases, s.todayCases, 
        s.deaths, s.todayDeaths, s.recovered, 
        s.active, s.critical, s.casesPerOneMillion,
        s.updated, h, chartType
      )
    );
    return null;
  }
  return next();
});

// historical chart by country
app.get('/history/charts/:country/:chartSize(sm|md|lg)?', async (req, res, next) => {
 const userAgent = req.headers['user-agent'],
        countryData = req.params.country,
        chartType = req.params.chartType || 'cases',
        chartSize = req.params.chartSize || 'sm',
        summary = await axios.get(`${apiBaseURL}/countries/${countryData}`),
        history = await axios.get(`${apiBaseURL}/historical/${summary.data.country}?lastdays=all`),
        s = summary.data,
        h = history.data;

  if (util.isCommandline(userAgent)) { 
      covid19GFX.historyCountryTracker(
        req, res,
        s.country, s.cases, s.todayCases, 
        s.deaths, s.todayDeaths, s.recovered, 
        s.active, s.critical, s.casesPerOneMillion,
        s.updated, h, chartType, s.countryInfo, chartSize
      )
    return null;
  }
  return next();
});

app.get('*', (req, res) => res.send(`
Welcome to COVID-19 Tracker CLI v${pkg.version} by Waren Gonzaga\n
Please visit: https://warengonza.ga/covid19-tracker-cli
\n`));

app.listen(port, () => console.log(`COVID-19 Tracker v${pkg.version} is listening on port ${port}!`));
