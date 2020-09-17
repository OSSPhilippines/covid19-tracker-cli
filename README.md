# COVID-19 Tracker CLI [![Mentioned in Awesome Coronavirus](https://awesome.re/mentioned-badge-flat.svg)](https://github.com/soroushchehresa/awesome-coronavirus)

[![Developed by Waren Gonzaga](https://img.shields.io/badge/Developed%20by-Waren%20Gonzaga-blue.svg?longCache=true&style=for-the-badge)](https://facebook.com/warengonzagaofficial) [![Github Release](https://img.shields.io/github/release/trackercli/covid19-tracker-cli.svg?style=for-the-badge)](https://github.com/trackercli/covid19-tracker-cli/releases) [![Github Star](https://img.shields.io/github/stars/trackercli/covid19-tracker-cli.svg?style=for-the-badge)](https://github.com/trackercli/covid19-tracker-cli) [![Github Fork](https://img.shields.io/github/forks/trackercli/covid19-tracker-cli.svg?style=for-the-badge)](https://github.com/trackercli/covid19-tracker-cli) [![License](https://img.shields.io/github/license/trackercli/covid19-tracker-cli.svg?style=for-the-badge)](https://github.com/trackercli/covid19-tracker-cli) [![Powered By](https://img.shields.io/badge/Powered%20By-NodeJS-green.svg?style=for-the-badge)](https://nodejs.org)

![Github Banner](https://raw.githubusercontent.com/trackercli/covid19-tracker-cli/master/lib/img/covid19-tracker-cli-github-banner.jpg)

**COVID-19 Tracker CLI** is an open-source NodeJS application for command line interface to track COVID-19 cases around the world. An optimized NodeJS application and a simple tracker with real-time updates from reliable data source. It Supports terminal for linux and macos, command prompt for windows, and termux for android. [Visit Wiki](https://github.com/tracker-cli/covid19-tracker-cli/wiki)

## Public Domain Names

```bash
# stable build
covid19.trackercli.com
covid19cli.now.sh

# dev build
dev.covid19.trackercli.com
covid19clidev.now.sh

# uh-oh we reserve domains bro, now report us again! Try harder!
```

> Do you want a custom and private URL for your personal use? Join here: <https://warengonza.ga/TtYvZ34>

## Sponsored By

[![Github Banner](https://raw.githubusercontent.com/trackercli/covid19-tracker-cli/master/lib/img/sponsor-vercel.jpg)](https://vercel.com)

## Featured By

Wanna feature this project? Let me know!

## How it Works

It uses an API and collect the relevant information for your reference.

> Data Source: <https://www.worldometers.info/coronavirus>

## Features

This simple application offers you the following features...

* Real-Time udpates.
* Optimized application.
* Fast response time (~< 100ms).
* Simple layout and easy to understand.
* By country query.
  * e.g. (```/country```).
* By country with History Chart
  * e.g. (```/history/<country>/``` or append with ```<cases or deaths>```)
* Windows CMD support.
  * e.g. (```/cmd``` or ```/cmd/country```).
* Plain or Basic version.
  * e.g. (```/plain``` or ```/plain/country```) or (```/basic```, ```/basic/country```).
* Random health saying on footer.
* Local command line version.
  * e.g. (```covid <country>```)

_More features coming soon..._

## Basic Usage

### Global Tracking

To track COVID-19 cases on CLI globally, all you need to do is to use CURL or WGET command.

#### CURL

```bash
curl -L covid19.trackercli.com
```

#### WGET

```bash
wget -i https://covid19.trackercli.com && cat index.html
```

#### HTTPie

```bash
# visit httpie.org
http http://covid19.trackercli.com
```

![CURL](https://raw.githubusercontent.com/trackercli/covid19-tracker-cli/master/lib/img/demo-global.gif)

### Country Tracking

To track COVID-19 cases on CLI by country, all you need to do is to append the URL with the country name or country [ISO 3166-1](https://warengonza.ga/iso-3166-1-codes) code.

#### Country Name

```bash
# example usage
curl -L covid19.trackercli.com/philippines
```

#### Country ISO 3166-1 Code

```bash
# /ph or /phl is ISO 3166 code of the Philippines
curl -L covid19.trackercli.com/ph
```

![CURL](https://github.com/trackercli/covid19-tracker-cli/raw/master/lib/img/demo-country.gif)

#### Global Tracking with History Chart

```bash
# shows global result with history chart
curl -L covid19.trackercli.com/history
```

```bash
# shows by default a global history chart
curl -L covid19.trackercli.com/history/all
```

![CURL](https://github.com/trackercli/covid19-tracker-cli/raw/master/lib/img/demo-history-global.gif)

#### Country Tracking with History Chart

```bash
# shows result with history chart
curl -L covid19.trackercli.com/history/ph
```

```bash
# shows by default a history chart
curl -L covid19.trackercli.com/history/ph/cases
```

```bash
# shows result with history chart
curl -L covid19.trackercli.com/history/ph/deaths
```

![CURL](https://github.com/trackercli/covid19-tracker-cli/raw/master/lib/img/demo-history-country.gif)

#### Country Tracking with History Chart (Dashboard)

```bash
# shows result with history chart
curl -L covid19.trackercli.com/history/charts/ph
```

![CURL](https://github.com/trackercli/covid19-tracker-cli/raw/master/lib/img/demo-history-chart.gif)

## Advance Usage

### Check Update Automagically

```bash
# check update every 10 seconds (where -n 10 is the interval)
watch -n 10 "curl -L covid19.trackercli.com"

# for more advance setup (where -s is to suppress curl's progress bar)
watch -c -n 600 "curl -s -L covid19.trackercli.com/<country>"
```

### Create a Shortcut Command

```bash
# set a desired alias for the command (replace endcov with your desired alias)
# this will give you a global update
# alias <your alias>="curl https://covid19.trackercli.com"

alias endcov="curl https://covid19.trackercli.com"

# if you want to track a specific country
# alias <your alias>< coutry alias>="curl https://covid19.trackercli.com/< name, ISO2, ISO3 here>"

alias endcovPH="curl https://covid19.trackercli.com/philippines"
```

### Local Command Line Tracker

```bash
# clone the repo
git clone https://github.com/warengonzaga/covid19-tracker-cli.git
```

```bash
# copy paste the command
cd covid19-tracker-cli && npm install && npm link
```

```bash
# run the local command line tracker. ex. covid <country/iso 3166 code>
covid ph

# if you want to see the result in plain view without ansi encoding
covid ph --plain

# run help for more info
covid help
```

## Official Blog

Many people asking me how to properly use my tracker. Here's the blog on [How to Track Coronavirus on Command Line](https://warengonza.ga/covid19-tracker-cli). If you have comments or suggestions please leave it on the comment section of the blog.

## Screenshots

Here's the screeshot of the tracker on CLI...

![Screenshot](https://github.com/trackercli/covid19-tracker-cli/raw/master/lib/img/screenshot.jpg)

## White Label / Personalize / Custom / Development

### White Label / Personalize / Custom Build

> We are still working on this part...

### Development

Wanna improve the project? Follow our guidelines!

```bash
# clone the repo
git clone https://github.com/warengonzaga/covid19-tracker-cli.git
```

```bash
# go to the project folder
cd covid19-tracker-cli
```

```bash
# run npm
npm install
```

```bash
# start the program by default it runs on port 7070
npm run start

# curl to your local this is equivalent to https://covid19.trackercli.com
curl localhost:7070

# if you want to curl https://covid19.trackercli.com/ph then append /ph to the local host
curl localhost:7070/ph
```

```bash
# run this if you want to develop the program without restarting the server manually,
# everytime you save the file it will restart the server automagically
npm run dev
```

## Regional Trackers

* [Philippines](https://ncovtracker.doh.gov.ph)
* [Italy](https://opendatadpc.maps.arcgis.com/apps/opsdashboard/index.html#/b0c68bce2cce478eaac82fe38d4138b1)
* [India](https://www.covid19india.org)
* [USA](https://www.npr.org/sections/health-shots/2020/03/16/816707182/map-tracking-the-spread-of-the-coronavirus-in-the-u-s)
* [France](https://veille-coronavirus.fr)
* [Japan](https://covid19japan.com)

## Contributing

Contributions are welcome, create a pull request to this repo and I will review your code. Please consider to submit your pull request to the ```dev``` branch. Thank you!

## Issues

If you're facing a problem in using COVID-19 Tracker CLI please let me know by creating an issue in this github repository. I'm happy to help you! Don't forget to provide some screenshot or error logs of it!

## To Do

* Add Static Version
* NPM package
* By State (US)
* By Region, City (PH)
* Add HTTP Headers (currently F)
* More Code Refactor! (I guess I know what I'm doing now... for sure)
* More... (have suggestions? let me know!)

## Community

Get the latest updates about the development!

[![Community](https://discordapp.com/api/guilds/694612151444439081/widget.png?style=banner3)](https://discord.gg/6Gzxwtt)

Wanna see other projects I made? Join today!

[![Community](https://discordapp.com/api/guilds/659684980137656340/widget.png?style=banner2)](https://bmc.xyz/l/wgofficialds)

## Donate or Support

If you love this project please consider to support the development and help me to support the API provider of this command line tracker by means of coffee. Be a sponsor or backer of this project. Just a cup of coffee!

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)](https://paypal.me/trackercli)
[![Support](https://img.shields.io/badge/Support-Buy%20Me%20A%20Coffee-orange.svg?style=for-the-badge)](https://buymeacoff.ee/trackercli)

### Help Us To Help Others

Some cups of my coffees goes to the foundation via [#OneAgainstCovid19 by PayMaya](https://donate.paymaya.com)

[![PayMaya](https://github.com/trackercli/covid19-tracker-cli/raw/master/lib/img/paymaya.jpg)](https://donate.paymaya.com)

## Supporters and Backers

* [J. Archer](https://www.buymeacoffee.com/WarenGonzaga/c/151732), [Gonzalo Montes](https://www.buymeacoffee.com/WarenGonzaga/c/155002), [Keynell](https://www.buymeacoffee.com/WarenGonzaga/c/156960), [Scullum](https://www.buymeacoffee.com/WarenGonzaga), [TX_Atheist](https://www.buymeacoffee.com/WarenGonzaga/c/157561), [Jade Cole](https://www.buymeacoffee.com/WarenGonzaga/c/159563), [@crypt0r3x](https://www.buymeacoffee.com/WarenGonzaga/c/160968), [Qwitch](https://www.buymeacoffee.com/WarenGonzaga/c/161210), [Ian Vizarra](https://www.buymeacoffee.com/WarenGonzaga/c/161990)

Wanna see your name here? [Just buy us a coffee](https://buymeacoff.ee/trackercli)!

## License

COVID-19 Tracker CLI is licensed under GNU General Public License v3 - <https://opensource.org/licenses/GPL-3.0>

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftrackercli%2Fcovid19-tracker-cli.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftrackercli%2Fcovid19-tracker-cli?ref=badge_large)

## Code of Conduct

[Read the Code of Conduct](./code-of-conduct.md)

## Sources

* API from [NovelCOVID API](https://github.com/NovelCOVID/API) which based on [WorldMeter](https://www.worldometers.info/coronavirus)

* Data from [CSSE at Johns Hopkins University](https://github.com/CSSEGISandData)

## Related Projects

* <https://github.com/sagarkarira/coronavirus-tracker-cli>

## Other Projects

* [WiFi Passview](https://github.com/warengonzaga/wifi-passview) is an open-source batch script-based program that can recover your WiFi Password easily in seconds.

* [WRN Cleaner](https://github.com/warengonzaga/wrn-cleaner) is an all in one batch script based native PC maintenance and cleaner for Windows.

## Resources

* <https://github.com/soroushchehresa/awesome-coronavirus>
* <https://github.com/fight-covid19/community>

## Author

COVID-19 Tracker CLI is Developed and Maintained by **Waren Gonzaga**, **Ian Vizarra**, and **Ken Gibas Abella**

* **Facebook:** <https://facebook.com/warengonzagaofficial>
* **Twitter:** <https://twitter.com/warengonzaga>
* **Website:** <https://warengonzaga.com>
* **Email:** dev(at)warengonzaga[.]com

---

:computer: with :heart: by **Waren Gonzaga** with **YHWH** | Tracker CLI Developers
