const table3 = require("cli-table3"),
  chart = require("../../bin/util/chart"),
  { labels, randomSay } = require("../../bin/util/label"),
  { color, txt, table, formatNumber, ucfirst } = require("../../bin/util/helper"),
  { line, br, space } = txt,
  { borders, col5 } = table,
  {
    source,
    help,
    repo,
    title,
    asOfDate,
    helpMenu,
    defaultFooter,
    plainDefaultFooter,
    specialFooter,
    plainCountrySpecialFooter,
    plainCountryDefaultFooter,
  } = labels,
  {
    magenta,
    magentaBright,
    red,
    redBright,
    green,
    greenBright,
    white,
    cyan,
    cyanBright,
    yellow,
  } = color;

// time data
let ts = Date.now(),
  date_ob = new Date(ts),
  date = date_ob.getDate(),
  month = date_ob.getMonth() + 1,
  year = date_ob.getFullYear(),
  currentdate = month + "/" + date + "/" + year;

// help menu
exports.help = () => helpMenu;

// covid19 global tracker
exports.covid19globaltracker = (cases, deaths, recovered, u) => {
  const asof = new Date(u),
    mortalityPercentage = (deaths / cases) * 100,
    recoveredPercentage = (recovered / cases) * 100,
    table = new table3({
      head: [col5(white(title.global))],
      chars: borders,
    });
  table.push(
    [col5(yellow(asOfDate(asof, currentdate)))],
    [
      magenta("Cases"),
      red("Deaths"),
      green("Recovered"),
      red("Mortality %"),
      green("Recovered %"),
    ],
    [
      formatNumber(cases),
      formatNumber(deaths),
      formatNumber(recovered),
      mortalityPercentage.toFixed(2),
      recoveredPercentage.toFixed(2),
    ],
    [col5(help)],
    [col5(source)],
    [col5(repo)]
  );
  return (
    table.toString() + br + br + space + green(randomSay()) + defaultFooter
  );
};

// covid19 country tracker
exports.covid19countrytracker = (
  name,
  cases,
  todayCases,
  deaths,
  todayDeaths,
  recovered,
  active,
  critical,
  casesPerOneMillion,
  u
) => {
  const mortalityPercentage = (deaths / cases) * 100,
    recoveryPercentage = (recovered / cases) * 100,
    asof = new Date(u),
    table = new table3({
      head: [col5(color.white(title.country(name)))],
      chars: borders,
    });
  table.push(
    [col5(yellow(asOfDate(asof, currentdate)))],
    [
      magenta("Cases"),
      red("Deaths"),
      green("Recovered"),
      cyan("Active"),
      cyanBright("Cases/Million"),
    ],
    [
      formatNumber(cases),
      formatNumber(deaths),
      formatNumber(recovered),
      formatNumber(active),
      formatNumber(casesPerOneMillion),
    ],
    [
      magentaBright("Today Cases"),
      redBright("Today Deaths"),
      redBright("Critical"),
      red("Mortality %"),
      greenBright("Recovery %"),
    ],
    [
      formatNumber(todayCases),
      formatNumber(todayDeaths),
      formatNumber(critical),
      mortalityPercentage.toFixed(2),
      recoveryPercentage.toFixed(2),
    ],
    [col5(help)],
    [col5(source)],
    [col5(repo)]
  );

  const tableFooter = table.toString() + br + br + space + green(randomSay());

  return name == "Philippines"
    ? tableFooter + specialFooter
    : tableFooter + defaultFooter;
};

exports.plainglobaltracker = (cases, deaths, recovered, u) => {
  const asof = new Date(u),
    mortalityPercentage = (deaths / cases) * 100,
    recoveredPercentage = (recovered / cases) * 100;

  const visual = `
    ${line}
    ${title.global}
    ${line}
    ${asOfDate(asof, currentdate)}
    ${line}
    Cases       | ${formatNumber(cases)}
    Deaths      | ${formatNumber(deaths)}
    Mortality % | ${mortalityPercentage.toFixed(2)}
    Recovered   | ${formatNumber(recovered)}
    Recovery %  | ${recoveredPercentage.toFixed(2)}
    ${line}
    ${help}
    ${line}
    ${source}
    ${line}
    ${repo}
    ${line}

    ${randomSay()}
    `;

  return visual + plainDefaultFooter;
};

exports.plaincountrytracker = (
  name,
  cases,
  todayCases,
  deaths,
  todayDeaths,
  recovered,
  active,
  critical,
  casesPerOneMillion,
  u
) => {
  const mortalityPercentage = (deaths / cases) * 100,
    recoveredPercentage = (recovered / cases) * 100,
    asof = new Date(u);

  const visual = `
    ${line}
    ${title.country(name)}
    ${line}
    ${asOfDate(asof, currentdate)}
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

    ${randomSay()}
    `;
  return name == "Philippines"
    ? visual + plainCountrySpecialFooter
    : visual + plainCountryDefaultFooter;
};

exports.historyGlobalTracker = (cases, deaths, recovered, u, h, chartType) => {
  const asof = new Date(u),
    mortalityPercentage = (deaths / cases) * 100,
    recoveredPercentage = (recovered / cases) * 100,
    table = new table3({
      head: [col5(white(title.globalHistory))],
      chars: borders,
    }),
    dates = Object.keys(h[chartType]),
    from = dates[0],
    to = dates[dates.length - 1],
    chartData = chart.generate(h, chartType);
  table.push(
    [col5(yellow(asOfDate(asof, currentdate)))],
    [
      magenta("Cases"),
      red("Deaths"),
      green("Recovered"),
      red("Mortality %"),
      green("Recovered %"),
    ],
    [
      formatNumber(cases),
      formatNumber(deaths),
      formatNumber(recovered),
      mortalityPercentage.toFixed(2),
      recoveredPercentage.toFixed(2),
    ],
    [col5(magenta(`${ucfirst(chartType)} from ${from} to ${to}`))],
    [col5(chartData)],
    [col5(help)],
    [col5(source)],
    [col5(repo)]
  );
  return (
    table.toString() + br + br + space + green(randomSay()) + defaultfooter
  );
};

exports.historyCountryTracker = (
  name,
  cases,
  todayCases,
  deaths,
  todayDeaths,
  recovered,
  active,
  critical,
  casesPerOneMillion,
  u,
  h,
  chartType
) => {
  const mortalityPercentage = (deaths / cases) * 100,
    recoveredPercentage = (recovered / cases) * 100,
    asof = new Date(u),
    dates = Object.keys(h.timeline[chartType]),
    from = dates[0],
    to = dates[dates.length - 1],
    table = new table3({
      head: [col5(white(title.history(name)))],
      chars: borders,
    }),
    chartData = chart.generate(h, chartType);
  table.push(
    [col5(yellow(asOfDate(asof, currentdate)))],
    [
      magenta("Cases"),
      red("Deaths"),
      green("Recovered"),
      cyan("Active"),
      cyanBright("Cases/Million"),
    ],
    [
      formatNumber(cases),
      formatNumber(deaths),
      formatNumber(recovered),
      formatNumber(active),
      formatNumber(casesPerOneMillion),
    ],
    [
      magentaBright("Today Cases"),
      redBright("Today Deaths"),
      redBright("Critical"),
      red("Mortality %"),
      greenBright("Recovery %"),
    ],
    [
      formatNumber(todayCases),
      formatNumber(todayDeaths),
      formatNumber(critical),
      mortalityPercentage.toFixed(2),
      recoveredPercentage.toFixed(2),
    ],
    [col5(magenta(`${ucfirst(chartType)} from ${from} to ${to}`))],
    [col5(chartData)],
    [col5(help)],
    [col5(source)],
    [col5(repo)]
  );

  const tableFooter = table.toString() + br + br + space + green(randomSay());

  return name == "Philippines"
    ? tableFooter + specialFooter
    : tableFooter + defaultFooter;
};
