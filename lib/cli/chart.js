const chart  = require('asciichart');

// generate chart for cases or deaths
exports.generate = (data, type = 'cases') => {
    const maxLength = Object.values(data.timeline[type])
          .reduce((a,c) => Math.max(a, c.toFixed().length), 0)
    const config = {
        height:  7,
        format: (x, i) => x.toFixed().padStart(maxLength)
    };
    chartData = Object.values(data.timeline[type]).flat();
    return chart.plot(chartData, config);
}
