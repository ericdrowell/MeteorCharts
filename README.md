MeteorCharts
============

Website: [www.meteorcharts.com](http://www.meteorcharts.com)

## Quick Start

The fastest way to get a chart up and running is to use a pre-built theme and layout.  Themes define colors and font sizes in your chart.  Layouts define position, size, and bindings of components inside your chart.

```javascript
var lineChart = new MeteorChart({
  container: 'container',
  width: 500,
  height: 300,
  data: {
    // data for the line component
    line: {
      unit: {
        x: 'Number',
        y: 'Number'
      },
      series: [
        {
          title: 'Series 1',
          points: [
            -100, -100,
            100, 100,
            200, 50
          ]
        }
      ]
    }
  },
  theme: MeteorChart.Themes.CoteAzur,
  layout: MeteorChart.Layouts.StandardLineChart
});
```

## Terminology
  * __Component__ - a component is a graphical element inside of a chart.  Some examples of pre-built components include Title, Line, Axis, Tooltip, Scatter, etc.  It's also really easy to create your own components
  * __Layout__ - layouts define the position, size, and data source of components in the chart through data binding.  Some examples of pre-built layouts include StandardLineChart, StandardLineChartWithTitle, SparkChart, and InteractiveLineChart.  It's also really easy to create your own layouts.
  * __Theme__ - themes define the color palette and fonts used in your chart.  Some exmaples of pre-built themes include CoteAzure and Lollapallooza.  It's easy to create your own themes as well.
  * __Data__ - most components require data to render.  For example, if you're creating a standard line chart, the data for the line component is a series of data points.  The data for the x and y axis is bound to the line component data.  And the data for the title component is just a string, like "This is my chart title".

## Building the Project

In the root directory, run `npm install`.  Once that finishes, you can run `grunt dev` to build the development version.

## Full Examples

Once you've built the MeteorCharts framework, you can start the node server by going to the root directory and running `node server.js`.  Once the server has started, you can open up your favorite browsers and go to `localhost:1337/examples/index.html` to see a list of all the examples

