MeteorChart.Layouts.StandardLineChart = [
  {
    id: 'line',
    type: 'Line',
    x: function() {
      return this.chart.components.yAxis.width();
    },
    y: function() {
      var title = this.chart.components.title;
      return title.x() + title.height() + this.chart.options.padding;
    },
    width: function() {
      return this.chart.width - this.x() - this.chart.options.padding;
    },
    height: function() {
      return this.chart.height - this.y() - (this.chart.options.padding * 2) - this.chart.components.xAxis.height();
    }
  },
  {
    id: 'yAxis',
    type: 'Axis',
    x: function() {
      return this.chart.options.padding;
    },
    y: function() {
      var title = this.chart.components.title;
      return title.y() + title.height();
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
      var state = this.chart.components.line.state;
      return {
        min: state.minY,
        max: state.maxY
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
    height: function() {
      return this.chart.theme.background.fonts.medium.fontSize;
    },
    data: function() {
      // bind axis data to line min and max values
      var state = this.chart.components.line.state;
      return {
        min: state.minX,
        max: state.maxX
      }
    },
    options: {
      formatter: 'Number',
      maxIncrements: 5
    }
  },
  {
    id: 'title',
    type: 'Title',
    x: function() {
      return this.chart.options.padding;
    },
    y: function() {
      return this.chart.options.padding;
    },
    width: function() {
      return this.chart.width;
    },
    height: function() {
      return 30;
    }
  }
];