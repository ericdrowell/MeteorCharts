MeteorChart.Layouts = {
  // =====================================
  LineSparkChart: [
    {
      id: 'line',
      type: 'Line',
      x: function () {
        return this.chart.options.padding;
      },
      y: function() {
        return this.chart.options.padding;
      },
      width: function() {
        return this.chart.width - (this.chart.options.padding * 2);
      },
      height: function() {
        return this.chart.height - (this.chart.options.padding * 2);
      }
    }
  ],

  // =====================================
  StandardLineChart: [
    {
      id: 'line',
      type: 'Line',
      x: function() {
        return this.chart.components.yAxis.width();
      },
      y: function() {
        return this.chart.options.padding;
      },
      width: function() {
        return this.chart.width - this.x() - this.chart.options.padding;
      },
      height: function() {
        return 210
      }
    },
    {
      id: 'yAxis',
      type: 'Axis',
      x: function() {
        return this.chart.options.padding;
      },
      y: function() {
        return 0;
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
        var lineComponent = this.chart.components.line;
        return {
          min: lineComponent.minY,
          max: lineComponent.maxY
        }
      },
      options: {
        formatter: 'Number',
        maxIncrements: 5,
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

        return line.y() + line.height() + this.chart.options.padding;
      },
      width: function() {
        // bind axis width to line width
        return this.chart.components.line.width();
      },
      data: function() {
        // bind axis data to line min and max values
        var lineComponent = this.chart.components.line;
        return {
          min: lineComponent.minX,
          max: lineComponent.maxX
        }
      },
      options: {
        formatter: 'Number',
        maxIncrements: 5
      }
    }
  ]
};