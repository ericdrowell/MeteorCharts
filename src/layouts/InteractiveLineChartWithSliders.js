(function() {
  MeteorChart.Layouts.InteractiveLineChartWithSliders = {
    addOrder: ['lineSeries', 'xAxis', 'yAxis', 'xSlider', 'ySlider'],
    components: [ 
      {
        id: 'xSlider',
        name: 'Slider',
        x: function() {
          return this.chart.components.lineSeries.x();
        },
        y: function() {
          var components = this.chart.components,
              line = components.lineSeries;

          return line.y() + line.height() + (this.chart.padding() * 2) + components.xAxis.height();
        },
        width: function() {
          return this.chart.components.lineSeries.width();
        },
        options: {
          orientation: 'horizontal'
        }
      }, 
      {
        id: 'ySlider',
        name: 'Slider',
        x: function() {
          return this.chart.padding();
        },
        y: function() {
          return this.chart.padding();
        },
        height: function() {
          return this.chart.components.lineSeries.height();
        },
        options: {
          orientation: 'vertical'
        }
      }, 
      {
        id: 'lineSeries',
        name: 'LineSeries',
        x: function() {
          var chart = this.chart,
              yAxis = chart.components.yAxis;

          return yAxis.x() + yAxis.width() + chart.padding();
        },
        y: function() {
          return this.chart.padding();
        },
        width: function() {
          var chart = this.chart,
              yAxis = chart.components.yAxis;

          return chart.width() - yAxis.width() - yAxis.x() - (chart.padding() * 2);
        },
        height: function() {
          var chart = this.chart,
              components = chart.components;

          return chart.height() - components.xSlider.height() - (chart.padding() * 4) - components.xAxis.height();
        }
      },
      {
        id: 'yAxis',
        name: 'Axis',
        x: function() {
          var ySlider = this.chart.components.ySlider;
          return this.chart.padding() + ySlider.x() + ySlider.width();
        },
        y: function() {
          return this.chart.padding();
        },
        height: function() {
          // bind axis height to line height
          return this.chart.components.lineSeries.height();
        },
        data: function() {
          // bind axis data to line min and max values
          var data = this.chart.components.lineSeries.data(),
              viewport = MeteorChart.Util.getSeriesMinMax(data);
          return {
            min: viewport.minY,
            max: viewport.maxY
          }
        },
        options: {
          orientation: 'vertical'
        }
      },
      {
        id: 'xAxis',
        name: 'Axis',
        x: function() {
          // bind axis x position to line x position
          return this.chart.components.lineSeries.x();
        },
        y: function() {
          var line = this.chart.components.lineSeries;

          return line.y() + line.height() +   this.chart.padding();
        },
        width: function() {
          // bind axis width to line width
          return this.chart.components.lineSeries.width();
        },
        data: function() {
          // bind axis data to line min and max values
          var data = this.chart.components.lineSeries.data(),
              viewport = MeteorChart.Util.getSeriesMinMax(data);
          return {
            min: viewport.minX,
            max: viewport.maxX
          }
        },
        options: {
          maxIncrements: 5
        }
      }
    ]
  };
})();