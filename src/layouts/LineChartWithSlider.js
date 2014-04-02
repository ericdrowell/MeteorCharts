(function() {
  MeteorChart.Layouts.LineChartWithSlider = {
    initOrder: ['lineSeries', 'xAxis', 'yAxis', 'slider'],
    components: [  
      {
        id: 'lineSeries',
        type: 'LineSeries',
        x: function() {
          var chart = this.chart;
          return chart.components.yAxis.width() + (chart.padding() * 2);
        },
        y: function() {
          return this.chart.padding();
        },
        width: function() {
          var chart = this.chart;
          return chart.width() - chart.components.yAxis.width() - (chart.padding() * 3);
        },
        height: function() {
          var chart = this.chart,
              components = chart.components;

          return chart.height() - components.slider.height() - (chart.padding() * 4) - 12; //components.xAxis.height();
        }
      },
      {
        id: 'yAxis',
        type: 'Axis',
        x: function() {
          return this.chart.padding();
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
              viewport = MeteorChart.Util.getSeriesMinMax(data.series);
          return {
            min: viewport.minY,
            max: viewport.maxY,
            unit: data.unit.y
          }
        },
        options: {
          orientation: 'vertical'
        }
      },
      {
        id: 'xAxis',
        type: 'Axis',
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
              viewport = MeteorChart.Util.getSeriesMinMax(data.series);
          return {
            min: viewport.minX,
            max: viewport.maxX,
            unit: data.unit.x
          }
        },
        options: {
          maxIncrements: 5
        }
      },
      {
        id: 'slider',
        type: 'Slider',
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
              viewport = MeteorChart.Util.getSeriesMinMax(data.series);
          return {
            width: 200,
            height: 30,
            position: 0.5
          }
        },
        options: {
          orientation: 'horizontal'
        }
      }
    ]
  };
})();