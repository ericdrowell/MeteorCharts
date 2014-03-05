(function() {
  MeteorChart.Layouts.StandardLineChartWithHorizontalLines = {
    initOrder: ['line', 'xAxis', 'yAxis', 'horizontalGridLines'],
    components: [  
      {
        id: 'horizontalGridLines',
        type: 'GridLines',
        x: function() {
          return this.chart.components.line.x();
        },
        y: function() {
          return this.chart.components.line.y();
        },
        width: function() {
          return this.chart.components.line.width();
        },
        height: function() {
          return this.chart.components.line.height();
        },
        data: function() {
          return this.chart.components.yAxis.labelOffsets;
        },
        options: {
          orientation: 'horizontal',
          lineWidth: 2
        }
      },
      {
        id: 'line',
        type: 'Line',
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

          return chart.height() - (chart.padding() * 3) - components.xAxis.height();
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
      }
    ]
  };
})();