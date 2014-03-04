(function() {
  MeteorChart.Layouts.StandardLineChart = {
    components: [  
      {
        id: 'line',
        type: 'Line',
        x: function() {
          return this.chart.components.yAxis.width();
        },
        y: function() {
          return this.chart.padding();
        },
        width: function() {
          var chart = this.chart;
          return chart.width() - this.x() - chart.padding();
        },
        height: function() {
          var chart = this.chart;
          return chart.height() - this.y() - (chart.padding() * 2) - chart.components.xAxis.height();
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
        width: function() {
          // bind axis width to line x position
          return 80;
        },
        height: function() {
          // bind axis height to line height
          return this.chart.components.line.height();
        },
        data: function() {
          // bind axis data to line min and max values
          var line = this.chart.components.line;
          return {
            min: line.minY,
            max: line.maxY,
            unit: line.data().unit.y
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

          return line.y() + line.height() + this.chart.padding();
        },
        width: function() {
          // bind axis width to line width
          return this.chart.components.line.width();
        },
        height: function() {
          return this.chart.theme().font.size.medium;
        },
        data: function() {
          // bind axis data to line min and max values
          var line = this.chart.components.line;
          return {
            min: line.minX,
            max: line.maxX,
            unit: line.data().unit.x
          }
        },
        options: {
          maxIncrements: 5
        }
      }
    ]
  };
})();