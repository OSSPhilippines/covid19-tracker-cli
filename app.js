const   express = require('express'),
        app = express(),
        util = require('./bin/util'),
        fs = require('fs'),
        covid19 = require('./lib/cli');

// set port
const port = process.env.port || 7070;

// package.json info
const pkg = JSON.parse(fs.readFileSync('package.json'));

// global route for covid19 tracker
app.get('/', async (req, res, next) => {
    const userAgent = req.headers['user-agent'];
    if (util.isCommandline(userAgent)) {
      await res.send(covid19.covid19globaltracker());
      return null;
    }
    return next();
});

app.get('*', (req, res) => res.send(`Something went wrong? Contact the developer!\n`));

app.listen(port, () => console.log(`COVID-19 Tracker v${pkg.version} is listening on port ${port}!`));
