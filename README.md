MeteorCharts
============

Website: [www.meteorcharts.com](http://www.meteorcharts.com)

## What is this?

MeteorCharts is the next generation charting framework for the web.  It uses an abstract layer for data binding, and therefore supports any rendering technology of your choice, including HTML5 Canvas, WebGL, SVG, VML, and Dom.  MeteorCharts excels in places where other charting libraries fall short, most notably with performance, extensibility, and mobile support
 
  * __Performance__ - Performance is our biggest priority.  Need to render over a million data points per second?  No problem.
  * __Extensibility__ - Most other charting libraries out there generate charts with giant configurations that require users to define how certain components look, where they are placed, what colors they are, etc.  Nice in theory, but this absolutely does not scale.  In order for this type of approach to work in real life, the developers of those libraries will have to know in advance all of the possible combinations of components and interactivity for all charts in the universe, in order to make them configurable.  Not going to happen.  MeteorCharts decouples components, layouts, and themes so that it's easy to create any kind of chart that you can imagine.  It's like having a giant bucket of charting components that you stick together, and it just works.
  * __Mobile__ - MeteorCharts was developed with mobile and tablet experiences as 1st class citizens.  Drop a chart in your website, and it will work great on desktop browsers, mobile devices, and tablets.

## Quick Start

The fastest way to get a chart up and running is to use a pre-built theme and layout.  Themes define colors and font sizes in your chart.  Layouts define position, size, and bindings of components inside your chart.

```javascript
var chart = new MeteorChart({
  container: 'container',
  width: 500,
  height: 290,
  theme: MeteorChart.Themes.CoteAzur,
  layout: MeteorChart.Layouts.StandardLineChart,

  // set components data and options
  components: {
    lineSeries: {
      data: [
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
    }
  }
});
```

## Terminology
  * __Component__ - a component is a graphical element inside of a chart.  Some examples of pre-built components include Title, Line, Axis, Tooltip, Scatter, etc.  It's also really easy to create your own components
  * __Layout__ - layouts define the position, size, and data source of components in the chart through data binding.  Some examples of pre-built layouts include StandardLineChart, StandardLineChartWithTitle, SparkChart, and InteractiveLineChart.  It's also really easy to create your own layouts.
  * __Theme__ - themes define the color palette and fonts used in your chart.  Some exmaples of pre-built themes include CoteAzure and Lollapallooza.  It's easy to create your own themes as well.
  * __Data__ - most components require data to render.  For example, if you're creating a standard line chart, the data for the line component is a series of data points.  The data for the x and y axis is bound to the line component data.  And the data for the title component is just a string, like "This is my chart title".
  * __Formatter__ - formatters are used to format data into human readable strings.  For example, if you're creating a line chart with dates along the x-axis, you'll want to use the Date formatter to convert the unix timestamps into human readable dates.  Formatters can also be used with other components, such as tooltips.
  * __Interaction__ - interactions give mouse and touch interactivity to charts.  For example, the LineChartTooltip interaction enables users to inspect data for a line chart.

## File Size for v0.1.0

  * __Core__ - 6kb
  * __Full__ - 21kb
  
The Core package (meteorcharts-core-vx.x.x.js) includes the barebones JavaScript needed for MeteorCharts to function.  It does not include components, a layout, a theme, interactions, or formatters.  If you want to fully optimize your MeteorCharts payload size, it's recommended that you include the core package, along with your specific components, layout, theme, interactions, and formatters.

The Full package (meteorcharts-vx.x.x.js) includes everything under the sun.  You can use this package if you just want to get a chart up and running as fast as possible.  It includes the core, as well as all curated components, layouts, themes, interactions, and formatters.

## Building the Project

In the root directory, run `npm install`.  Once that finishes, you can run `grunt dev` to build the development version.

## Full Examples

Once you've built the MeteorCharts framework, you can start the node server by going to the root directory and running `node server.js`.  Once the server has started, you can open up your favorite browsers and go to `localhost:1337/examples/index.html` to see a list of all the examples

