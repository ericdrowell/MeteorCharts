MeteorCharts
============

Website: [www.meteorcharts.com](http://www.meteorcharts.com)

## Building the Project

In the root directory, run `npm install`.  Once that finishes, you can run `grunt dev` to build the development version.

## Quick Start

The fastest way to get a chart up and running is to use a pre-built theme and layout.  Themes define colors and font sizes in your chart.  Layouts define position, size, and bindings of components inside your chart.

      var lineChart = new MeteorChart({
        container: 'container',
        width: 500,
        height: 300,
        data: {
          line: [
            {
              // red
              title: 'Series 1',
              points: [
                -100, -100,
                100, 100,
                200, 50
              ]
            },
            { 
              // green
              title: 'Series 2',
              points: [
                0, 100,
                100, 200,
                200, 150,
                300, 200
              ]
            }
          ]
        },
        theme: MeteorChart.Themes.Light,
        layout: MeteorChart.Layouts.LineSparkChart
      });

## Full Examples

Once you've built the MeteorCharts framework, you can start the node server by going to the root directory and running `node server.js`.  Once the server has started, you can open up your favorite browsers and go to `localhost:1337/examples/index.html` to see a list of all the examples

