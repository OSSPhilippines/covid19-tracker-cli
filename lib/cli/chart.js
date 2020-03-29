const chart  = require('asciichart');

// generate chart for caes or deaths
exports.generate = (data, type = 'cases') => {
    const config = {
        height:  7,
        format: (x, i) => ('    ' + x.toFixed(0)).slice(-'    '.length)
    };
    chartData = Object.values(data.timeline[type]).flat();
    return chart.plot(chartData, config);
}