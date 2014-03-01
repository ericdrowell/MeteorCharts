MeteorChart.Layouts.InteractiveLineChart = [
  {
    id: 'line',
    type: 'Line',
    bindings: {
      xAxis: ['height'],
      yAxis: ['width']
    },
    x: function() {
      return this.chart.components.yAxis.width();
    },
    y: function() {
      return this.chart.padding;
    },
    width: function() {
      return this.chart.width - this.x() - this.chart.padding;
    },
    height: function() {
      return this.chart.height - this.y() - (this.chart.padding * 2) - this.chart.components.xAxis.height();
    }
  },
  {
    id: 'yAxis',
    type: 'Axis',
    bindings: {
      line: ['height']
    },
    x: function() {
      return this.chart.padding;
    },
    y: function() {
      return this.chart.padding;
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
        max: line.maxY
      }
    },
    options: {
      orientation: 'vertical'
    }
  },
  {
    id: 'xAxis',
    type: 'Axis',
    bindings: {
      line: ['x', 'y', 'width', 'height']
    },
    x: function() {
      // bind axis x position to line x position
      return this.chart.components.line.x();
    },
    y: function() {
      var line = this.chart.components.line;

      return line.y() + line.height() + this.chart.padding;
    },
    width: function() {
      // bind axis width to line width
      return this.chart.components.line.width();
    },
    height: function() {
      return this.chart.theme.background.fonts.medium.fontSize;
    },
    data: function() {
      // bind axis data to line min and max values
      var line = this.chart.components.line;

      return {
        min: line.minX,
        max: line.maxX
      }
    }
  },
  {
    id: 'tooltip',
    type: 'Tooltip',
    // data bindings
    bindings: {
      line: ['selected']
    },
    x: function() {
      var line = this.chart.components.line,
          selected = line.state.selected;

      return 0;
    },
    y: function() {
      var line = this.chart.components.line,
          selected = line.state.selected;

      return 0;
    },
    data: function() {
      return {
        title: 'Captivating Title',
        content: 'Some interesting info about the data'
      };
    }
  }
];