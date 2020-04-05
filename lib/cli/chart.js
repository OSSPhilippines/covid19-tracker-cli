const chart  = require('asciichart');

// generate chart for cases or deaths
exports.generate = (data, type = 'cases') => {
    const history   = data[type] ? Object.values(data[type]) : Object.values(data.timeline[type]),
          maxLength = history.reduce((a,c) => Math.max(a, c.toFixed().length), 0),
          chartData = Object.values(history).flat(),
          config = {
            height:  7,
            format: (x, i) => x.toFixed().padStart(maxLength)
          };
          console.log(history);
    return chart.plot(chartData, config);
}
