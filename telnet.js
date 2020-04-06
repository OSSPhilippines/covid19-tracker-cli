const blessed     = require('blessed');
const telnet      = require('telnet2');
const axios       = require('axios');
const covid19     = require('./lib/cli');
const pkg         = require('./package.json');    // package.json info
const apiBaseURL  = "https://corona.lmao.ninja";  // NovelCOVID API
const port        = process.env.TELNET_PORT || 2300;     // set port
const interval    = process.env.INTERVAL || 2000

async function fetchGlobalTracker() {
  const { data } = await axios.get(`${apiBaseURL}/all`);
        
  return covid19.covid19globaltracker(
    data.cases, data.deaths,
    data.recovered, data.updated
  );
}

async function fetchByCountry(query) {
  // empty, country, history, chartType
  const [_x, country, history, chartType] = query.split('/'),
        countryData = await axios.get(`${apiBaseURL}/countries/${country}`),
        d = countryData.data;
  
  if (_x.length > 0) throw "Invalid query format. Must Start with \/"

  if (history) {
    const history = await axios.get(`${apiBaseURL}/v2/historical/${d.country}`),
          h = history.data;

    return covid19.historyCountryTracker(
      d.country, d.cases, d.todayCases, 
      d.deaths, d.todayDeaths, d.recovered, 
      d.active, d.critical, d.casesPerOneMillion,
      d.updated, h, chartType || 'cases'
    )
  }

  return covid19.covid19countrytracker(
    d.country, d.cases, d.todayCases, 
    d.deaths, d.todayDeaths, d.recovered, 
    d.active, d.critical, d.casesPerOneMillion,
    d.updated
  );
}

function renderTracker(box, screen, query = '/all') {
  const footer = '\n\n Press [ENTER] to return the main menu'
  box.setContent(`\n\n\n\n\nLoading....`)
  const renderTrackerContent = async () => {
    if (query === '/all') {
      const data = await fetchGlobalTracker();
      box.setContent(data + footer);
    } else {
      const countryData = await fetchByCountry(query);
      box.setContent(countryData + footer);
    }
    screen.render();
  }

  renderTrackerContent()

  return setInterval(() => renderTrackerContent(), interval)
}

telnet({ tty: true }, client => {
  let executedInterval = null;
  const initialContent = `What do you want to see?
  \r Global Tracking: [/all] 
  \r Country: [/{countryname} or /{ISO 3166-1 code}] 
  \r Country with history: [/{ISO 3166-1}/history/{cases or deaths} For e.g. /ph/history or /ph/history/cases or /ph/history/deaths] 


  \r Please enter your answer: 
  `

  client.on('term', terminal => {
    screen.terminal = terminal;
    screen.render()
  });

  client.on('size', (width, height) => {
    client.columns = width;
    client.rows = height;
    client.emit('resize');
  });

  const screen = blessed.screen({
    smartCSR: true,
    input: client,
    output: client,
    terminal: 'xterm-256color',
    fullUnicode: true
  });
  screen.key('q', function() {
    process.exit(0);
  });

  client.on('close', () => {
    if (!screen.destroyed) {
      screen.destroy();
    }
  });

  screen.key(['C-c', 'q'], (ch, key) => {
    screen.destroy();
  });

  const box = blessed.box({
    parent: screen,
    left: 'center',
    top: 'center',
    width: '80%',
    height: '90%',
    content: `
      Welcome to COVID-19 Tracker CLI v${pkg.version} by Waren Gonzaga\n
      Please visit: https://warengonza.ga/covid19-tracker-cli
    `
  })

  const form = blessed.form({
    parent: box,
    left: 0,
    top: 'center',
    height: 20,
    width: '100%',
    content: '\r\r\nPress [ENTER] to continue'

  });

  form.on('submit', function(data) {
    form.setContent('Submitted.');
    screen.render();
  });

  form.on('reset', function(data) {
    form.setContent('Canceled.');
    screen.render();
  });

  const input = blessed.textbox({
    parent: form,
    name: 'input',
    input: true,
    keys: true,
    top: 10,
    left: 'center',
    height: 20,
    width: '50%',
  });

  input.focus();

  input.key(['enter'], async () => {
    try {
      switch(input.value) {
        case '':
        case null:
        case undefined:
          console.log(executedInterval)
          clearInterval(executedInterval);
          form.hidden && form.show();
          box.setContent('')
          form.setContent(initialContent);
          break;
        case '/all':
          executedInterval = renderTracker(box, screen);
          form.hide();
          break;
        default:
          executedInterval = renderTracker(box, screen, input.value);
          form.hide();
          break;
      }
    } catch(err) {
      console.log(err);
      form.setContent(`${initialContent}\n\n An Error Occured Please Press Enter Again`);
    } finally {
      input.clearValue()
      screen.render();
    }
  })

  client.on('data', () => {
    console.log(input.value);
  })

  screen.render();
}).listen(2300);

console.log(`COVID-19 Tracker v${pkg.version} is listening on port ${port}!`)
