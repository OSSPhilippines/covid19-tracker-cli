# COVID-19 Tracker CLI [![Developed by Waren Gonzaga](https://img.shields.io/badge/Developed%20by-Waren%20Gonzaga-blue.svg?longCache=true&style=for-the-badge)](https://facebook.com/warengonzagaofficial)

[![Github Release](https://img.shields.io/github/release/warengonzaga/covid19-tracker-cli.svg?style=for-the-badge)](https://github.com/warengonzaga/covid19-tracker-cli/releases)
[![Github Star](https://img.shields.io/github/stars/warengonzaga/covid19-tracker-cli.svg?style=for-the-badge)](https://github.com/warengonzaga/covid19-tracker-cli)
[![Github Fork](https://img.shields.io/github/forks/warengonzaga/covid19-tracker-cli.svg?style=for-the-badge)](https://github.com/warengonzaga/covid19-tracker-cli)
[![License](https://img.shields.io/github/license/warengonzaga/covid19-tracker-cli.svg?style=for-the-badge)](https://github.com/warengonzaga/covid19-tracker-cli)
[![Powered By](https://img.shields.io/badge/Powered%20By-NodeJS-green.svg?style=for-the-badge)](https://nodejs.org)

![Github Banner](./lib/img/covid19-tracker-cli-github-banner.jpg)

**COVID-19 Tracker CLI** is an open-source NodeJS application for command line interface to track COVID-19 cases around the world. An optimized NodeJS application and a simple tracker with real-time updates from reliable data source. [Visit Wiki](https://github.com/warengonzaga/covid19-tracker-cli/wiki)

## Featured By

Wanna feature this project? Let me know!

## How it Works

It uses an API and collect the relevant information for your reference.

> Data Source: <https://www.worldometers.info/coronavirus/>

## Features

This simple application offers you the following features...

* Real-Time udpates.
* Optimized application.
* Fast response time (~< 100ms).
* Simple layout and easy to understand.
* By country query.
  * e.g. (```/country```).
* Windows CMD support.
  * e.g. (```/cmd``` or ```/cmd/country```).
* Plain or Basic version.
  * e.g. (```/plain``` or ```/plain/country```) or (```/basic```, ```/basic/country```).

_More features coming soon..._

## Usage

To track COVID-19 cases on CLI globally, all you need to do is to use CURL or WGET command.

```bash
curl https://covid19tracker.xyz
```

or

```bash
wget -i https://covid19tracker.xyz && cat index.html
```

To track COVID-19 cases on CLI by country, all you need to do is to add country name or code after ```/```.

```bash
curl https://covid19tracker.xyz/philippines
```

or

```bash
curl https://covid19tracker.xyz/ph
```

## Screenshots

Here's the screeshot of the tracker on CLI...

![Screenshot](./lib/img/screenshot.jpg)

## White Label / Personalize / Custom / Development

Working on it...

## Regional Trackers

* [Philippines](https://ncovtracker.doh.gov.ph)
* [Italy](https://opendatadpc.maps.arcgis.com/apps/opsdashboard/index.html#/b0c68bce2cce478eaac82fe38d4138b1)
* [India](https://www.covid19india.org)
* [USA](https://www.npr.org/sections/health-shots/2020/03/16/816707182/map-tracking-the-spread-of-the-coronavirus-in-the-u-s)
* [France](https://veille-coronavirus.fr)
* [Japan](https://covid19japan.com)

## Contributing

Contributions are welcome, create a pull request to this repo and I will review your code.

## Issues

If you're facing a problem in using COVID-19 Tracker CLI please let me know by creating an issue in this github repository. I'm happy to help you! Don't forget to provide some screenshot or error logs of it!

## To Do

* Local Version
* Add Static Version
* Sample Usage (gif)
* Add HTTP Headers (currently F)
* More Code Refactor! (I guess I know what I'm doing now... for sure)
* More... (have suggestions? let me know!)

## Community

Wanna see other projects I made? Join today!

[![Community](https://discordapp.com/api/guilds/659684980137656340/widget.png?style=banner2)](https://bmc.xyz/l/wgofficialds)

## Donate or Support

If you love this project please consider to support the development by means of coffee. I spend and waste my time just to save your time! Be a sponsor or backer of this project. Just a cup of coffee!

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)](https://paypal.me/warengonzagaofficial)
[![Support](https://img.shields.io/badge/Support-Buy%20Me%20A%20Coffee-orange.svg?style=for-the-badge)](https://www.buymeacoffee.com/warengonzaga)

## Supporters and Backers

* your_name_here

Wanna see your name here? [Just buy me a coffee](https://www.buymeacoffee.com/warengonzaga)!

## License

COVID-19 Tracker CLI is licensed under MIT - <https://opensource.org/licenses/MIT>

## Code of Conduct

[Read the Code of Conduct](./code-of-conduct.md)

## Sources

* [Novel Coronavirus (2019-nCoV) situation reports](https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports) - [World Health Organization](https://www.who.int) (WHO)
* [2019 Novel Coronavirus (2019-nCoV) in the U.S.](https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html) - [U.S. Centers for Disease Control and Prevention](https://www.cdc.gov) (CDC)
* [Outbreak Notification](http://www.nhc.gov.cn/xcs/yqtb/list_gzbd.shtml) - National Health Commission (NHC) of the People’s Republic of China
* [Novel coronavirus (2019-nCoV)](https://www.health.gov.au/health-topics/novel-coronavirus-2019-ncov) - Australian Government Department of Health
* [Novel coronavirus 2019-nCoV: early estimation of epidemiological parameters and epidemic prediction](https://www.medrxiv.org/content/10.1101/2020.01.23.20018549v2) - Jonathan M. Read et al, Jan. 23,2020.
* [Early Transmissibility Assessment of a Novel Coronavirus in Wuhan, China](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3524675) - Maimuna Majumder and Kenneth D. Mandl, Harvard University - Computational Health Informatics Program - Posted: 24 Jan 2020 Last revised: 27 Jan 2020
* [Report 3: Transmissibility of 2019-nCoV](https://www.imperial.ac.uk/mrc-global-infectious-disease-analysis/news--wuhan-coronavirus) - 25 January 2020 - Imperial College London‌
* [Case fatality risk of influenza A(H1N1pdm09): a systematic review](ttps://www.ncbi.nlm.nih.gov/pmc/articles/PMC3809029) - Epidemiology. Nov. 24, 2013
* [A novel coronavirus outbreak of global health concern](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30185-9/fulltext#tbl1) - Chen Want et al. The Lancet. January 24, 2020
* [Symptoms of Novel Coronavirus (2019-nCoV)](https://www.cdc.gov/coronavirus/2019-ncov/about/symptoms.html) - CDC
* [China's National Health Commission news conference on coronavirus](https://www.aljazeera.com/news/2020/01/chinas-national-health-commission-news-conference-coronavirus-200126105935024.html) - Al Jazeera. January 26, 2020
* [Wuhan lockdown 'unprecedented', shows commitment to contain virus: WHO representative in China](https://www.reuters.com/article/us-china-health-who/wuhan-lockdown-unprecedented-shows-commitment-to-contain-virus-who-representative-in-china-idUSKBN1ZM1G9) - Reuters. January 23, 2020
* [Statement on the meeting of the International Health Regulations (2005) Emergency Committee regarding the outbreak of novel coronavirus (2019-nCoV)](https://www.who.int/news-room/detail/23-01-2020-statement-on-the-meeting-of-the-international-health-regulations-(2005)-emergency-committee-regarding-the-outbreak-of-novel-coronavirus-(2019-ncov)) - WHO, January 23, 2020
* [International Health Regulations Emergency Committee on novel coronavirus in China](https://www.who.int/news-room/events/detail/2020/01/30/default-calendar/international-health-regulations-emergency-committee-on-novel-coronavirus-in-china) - WHO, January 30, 2020
* [Human-to-human transmission of Wuhan virus outside of China, confirmed in Germany, Japan and Vietnam](https://www.theonlinecitizen.com/2020/01/29/human-to-human-transmission-of-wuhan-virus-outside-of-china-confirmed-in-germany-japan-and-vietnam) - The Online Citizen, Jan. 29, 2020
* [Who: "Live from Geneva on the new #coronavirus outbreak"](https://www.pscp.tv/WHO/1OdJrqEvgaeGX)
* [CDC Confirms Person-to-Person Spread of New Coronavirus in the United States](https://www.cdc.gov/media/releases/2020/p0130-coronavirus-spread.html) - CDC Press Release, Jan. 30, 2020
* [CMO confirms cases of coronavirus in England](https://www.gov.uk/government/news/cmo-confirms-cases-of-coronavirus-in-england) - CMO, UK, Jan. 31, 2020
* [Coronavirus in France: what you need to know](https://www.thelocal.fr/20200131/coronavirus-in-france-what-you-need-to-know) - The Local France, Jan. 31, 2020
* [First two persons infected with coronavirus identified in Russia](https://tass.com/society/1115101) - Tass, Jan. 31, 2020
* [Updated understanding of the outbreak of 2019 novel coronavirus (2019nCoV) in Wuhan, China](https://onlinelibrary.wiley.com/doi/abs/10.1002/jmv.25689?af=R) - Journal of Medical Virology, Jan. 29, 2020
* [Estimating the effective reproduction number of the 2019-nCoV in China](https://www.medrxiv.org/content/10.1101/2020.01.27.20018952v1.full.pdf) - Zhidong Cao et al., Jan. 29, 2020
* [Preliminary estimation of the basic reproduction number of novel coronavirus (2019-nCoV) in China, from 2019 to 2020: A data-driven analysis in the early phase of the outbreak](https://www.sciencedirect.com/science/article/pii/S1201971220300539) - Jan. 30, 2020
* [Coronavirus: Window of opportunity to act, World Health Organization says](https://www.bbc.com/news/world-asia-china-51368873) - BBC, Feb,\. 4, 2020
* [Clinical Characteristics of 138 Hospitalized Patients With 2019 Novel Coronavirus–Infected Pneumonia in Wuhan, China](https://jamanetwork.com/journals/jama/fullarticle/2761044?guestAccessKey=f61bd430-07d8-4b86-a749-bec05bfffb65) - Wang et. al, JAMA, Feb. 7, 2020
* NovelCOVID API based on top of [WorldMeter](https://www.worldometers.info/coronavirus)

## Related Projects

* <https://github.com/sagarkarira/coronavirus-tracker-cli>

## Resources

* <https://github.com/soroushchehresa/awesome-coronavirus>

## Author

COVID-19 Tracker CLI is Developed and Maintained by **Waren Gonzaga**

* **Facebook:** <https://facebook.com/warengonzagaofficial>
* **Twitter:** <https://twitter.com/warengonzaga>
* **Website:** <https://warengonzaga.com>
* **Email:** dev(at)warengonzaga[.]com

---

**</>** with **<3** by **Waren Gonzaga**
