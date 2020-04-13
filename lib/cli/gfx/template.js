const
    contrib  =  require('blessed-contrib'),
    chalk    =  require('chalk');  

exports.load = (grid, data) => {

    let markdown = grid.set(0, 0, 2, 2, contrib.markdown,{
        style: {
            border: {
                fg: 'black'
            }
        }
    })
    markdown.setMarkdown(data.defaultHeader)

    let table = grid.set(0, 2, 2, 7, contrib.table,
        { keys: true
        , fg: 'white'
        , selectedFg: 'white'
        , selectedBg: 'blue'
        , interactive: false
        , label: 'Historical data as of '+data.asof.toLocaleString()+' [Date:'+data.currentdate+']'
        , width: '30%'
        , height: '30%'
        , border: {type: "line", fg: "cyan"}
        , columnSpacing: 10 //in chars
        , columnWidth: [1,16, 12, 12, 12, 18],
        style: {
            border: {
                fg: 'white'
            }
        }})
    
    table.setData(
        { headers: ['','Cases', 'Deaths', 'Recovered', 'Active', 'Cases/Million']
        , data:
            [
                ['',data.cases, data.deaths, data.recovered, data.active, data.casesPerOneMillion],
                ['','Today Cases', 'Today Deaths', 'Critical', 'Mortality %', 'Recovery %'],
                ['',data.todayCases, data.todayDeaths, data.critical, data.mortalityPercentage, data.recoveredPercentage]
            ]
        })
        
    let map = grid.set(2, 0, 3, 4, contrib.map,{
            style: {
                border: {
                    fg: 'black'
                },
                shapeColor: 'yellow'
            },
        })

    map.addMarker({"lon" : data.countryInfo.long, "lat" : data.countryInfo.lat, color: 'magenta', char: '\u24E7'+` ${data.name}`})

    let bar = grid.set(2, 4, 3, 3, contrib.bar,{
        barBgColor: 'red',
        barWidth: 7,
        barSpacing: 5,
        xOffset: 3,
        maxHeight: 9,
        style: {
            border: {
                fg: 'white'
            }
        }})

    screen.append(bar) //must append before setting data
    bar.setData({ titles: ['Cases', 'Deaths', 'Recovered', 'Active'], data: [data.cases, data.deaths, data.recovered, data.active]})

    let donut = grid.set(2, 7, 3, 2, contrib.donut,{
        label: 'Mortality Rate',
        radius: 8,
        arcWidth: 3,
        remainColor: 'black',
        yPadding: 2,
        style: {
            border: {
                fg: 'red'
            }
        },
        data: [
            {percent: data.mortalityPercentage, label: 'Mortality', color: 'red'},
            {percent: data.recoveredPercentage, label: 'Recovery', color: 'green'}
        ]
      });

    let line = grid.set(5, 0, 4, 9, contrib.line,
        { style:
          { line: "yellow"
          , text: "green"
          , baseline: "black",
            border: {
                fg: 'black'
            }
        }
        , xLabelPadding: 3
        , xPadding: 5
        , showLegend: true
        , wholeNumbersOnly: true //true=do not show fraction in y axis
        , label: `Cases from ${data.from} to ${data.to}`})

    let series1 = {
            title: 'Cases',
            x: Object.keys(data.h.timeline.cases),
            y: Object.values(data.h.timeline.cases),
            style: {
                line: 'blue'
            }
        }
    let series2 = {
            title: 'Deaths',
            x: Object.keys(data.h.timeline.deaths),
            y: Object.values(data.h.timeline.deaths),
            style: {
                line: 'red'
            }
        }
    
    let series3 = {
        title: 'Recovered',
        x: Object.keys(data.h.timeline.recovered),
        y: Object.values(data.h.timeline.recovered),
        style: {
            line: 'green'
        }
    }

    screen.append(line) //must append before setting data
    line.setData([series1, series2, series3])
    
    let markdownFooter = grid.set(8, 0, 2, 9, contrib.markdown,{
        style: {
            border: {
                fg: 'black'
            }
        }
    })
    markdownFooter.setMarkdown(data.footer)

    return grid
}