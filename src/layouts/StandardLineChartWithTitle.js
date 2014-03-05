(function() {
  MeteorChart.Layouts.StandardLineChartWithTitle = {
    initOrder: ['line', 'xAxis', 'yAxis', 'title'],
    components: [  
      {
        id: 'line',
        type: 'Line',
        x: function() {
          var chart = this.chart;
          return chart.components.yAxis.width() + (chart.padding() * 2);
        },
        y: function() {
          var chart = this.chart;
          return chart.components.title.height() + (chart.padding() * 2);
        },
        width: function() {
          var chart = this.chart;
          return chart.width() - chart.components.yAxis.width() - (chart.padding() * 3);
        },
        height: function() {
          var chart = this.chart,
              components = chart.components;

          return chart.height() - (chart.padding() * 4) - components.xAxis.height() - components.title.height();
        }
      },
      {
        id: 'yAxis',
        type: 'Axis',
        x: function() {
          return this.chart.padding();
        },
        y: function() {
          var chart = this.chart;
          return chart.components.title.height() + (chart.padding() * 2);
        },
        height: function() {
          // bind axis height to line height
          return this.chart.components.line.height();
        },
        data: function() {
          // bind axis data to line min and max values
          var data = this.chart.components.line.data(),
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
          return this.chart.components.line.x();
        },
        y: function() {
          var line = this.chart.components.line;

          return line.y() + line.height() +   this.chart.padding();
        },
        width: function() {
          // bind axis width to line width
          return this.chart.components.line.width();
        },
        data: function() {
          // bind axis data to line min and max values
          var data = this.chart.components.line.data(),
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
        id: 'title',
        type: 'Title',
        x: function() {
          return this.chart.padding();
        },
        y: function() {
          return this.chart.padding();
        },
        width: function() {
          return this.chart.width();
        }
      }
    ]
  };
})();