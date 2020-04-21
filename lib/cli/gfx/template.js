const
    contrib  =  require('blessed-contrib'),
    chalk    =  require('chalk');  

exports.load = (grid, data, chartStyle) => {
    let markdown = grid.set(chartStyle.header.grid[0], chartStyle.header.grid[1], chartStyle.header.grid[2], chartStyle.header.grid[3], contrib.markdown,{
        style: {
            border: {
                fg: 'black'
            }
        }
    })
    markdown.setMarkdown(data.defaultHeader)

    let table = grid.set(chartStyle.table.grid[0], chartStyle.table.grid[1], chartStyle.table.grid[2], chartStyle.table.grid[3], contrib.table,
        { keys: true
        , fg: 'white'
        , selectedFg: 'white'
        , selectedBg: 'blue'
        , interactive: false
        , label: 'Historical data as of '+data.asof.toLocaleString()+' [Date:'+data.currentdate+']'
        , width: '30%'
        , height: '30%'
        , border: {type: "line", fg: "cyan"}
        , columnSpacing: chartStyle.table.columnSpacing || 10
        , columnWidth: chartStyle.table.columnWidth || [1, 16, 12, 12, 12, 18],
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
        
    let map = grid.set(chartStyle.map.grid[0], chartStyle.map.grid[1], chartStyle.map.grid[2], chartStyle.map.grid[3], contrib.map,{
            style: {
                border: {
                    fg: 'black'
                },
                shapeColor: 'yellow'
            },
        })

    map.addMarker({"lon" : data.countryInfo.long, "lat" : data.countryInfo.lat, color: 'magenta', char: '\u24E7'+` ${data.name}`})

    let bar = grid.set(chartStyle.bar.grid[0], chartStyle.bar.grid[1], chartStyle.bar.grid[2], chartStyle.bar.grid[3], contrib.bar,{
        barBgColor: 'red',
        barWidth: chartStyle.bar.barWidth || 7,
        barSpacing: chartStyle.bar.barSpacing || 7,
        xOffset: chartStyle.bar.xOffset || 3,
        maxHeight: 9,
        style: {
            border: {
                fg: 'white'
            }
        }})

    screen.append(bar) //must append before setting data
    bar.setData({ titles: ['Cases', 'Deaths', 'Recovered', 'Active'], data: [data.cases, data.deaths, data.recovered, data.active]})

    let donut = grid.set(chartStyle.donut.grid[0], chartStyle.donut.grid[1], chartStyle.donut.grid[2], chartStyle.donut.grid[3], contrib.donut,{
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

    let line = grid.set(chartStyle.line.grid[0], chartStyle.line.grid[1], chartStyle.line.grid[2], chartStyle.line.grid[3], contrib.line,
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
    
    let markdownFooter = grid.set(chartStyle.footer.grid[0], chartStyle.footer.grid[1], chartStyle.footer.grid[2], chartStyle.footer.grid[3], contrib.markdown,{
        style: {
            border: {
                fg: 'black'
            }
        }
    })
    markdownFooter.setMarkdown(data.footer)

    return grid
}