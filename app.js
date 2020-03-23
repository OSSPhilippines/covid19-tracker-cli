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
app.get(['/help','/manual'], async (req, res, next) => {
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

app.get('*', (req, res) => res.send(`
Sorry, CLI version is only available at the moment...
\n
Try curl https://covid19tracker.xyz
\n`));

app.listen(port, () => console.log(`COVID-19 Tracker v${pkg.version} is listening on port ${port}!`));
