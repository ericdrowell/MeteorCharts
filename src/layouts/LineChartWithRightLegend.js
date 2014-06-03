(function() {
  MeteorChart.Layouts.LineChartWithRightLegend = [  
    {
      id: 'legend',
      type: 'Legend',
      x: function() {
        var chart = this.chart;
        return chart.get('width') - this.get('width') - chart.padding();
      },
      y: function() {
        return this.chart.padding();
      },
      orientation: 'vertical'
    },
    {
      id: 'lineSeries',
      type: 'LineSeries',
      x: function() {
        return this.chart.components.yAxis.get('width') + (this.chart.padding() * 2);
      },
      y: function() {
        var chart = this.chart;
        return chart.padding();
      },
      width: function() {
        var components = this.chart.components;
        return this.chart.get('width') - this.chart.components.yAxis.get('width') - (this.chart.padding() * 4) - components.legend.get('width');
      },
      height: function() {
        var components = this.chart.components;
        return this.chart.get('height') - (this.chart.padding() * 3) - components.xAxis.get('height');
      }
    },
    {
      id: 'xAxis',
      type: 'Axis',
      x: function() {
        // bind axis x position to line x position
        return this.chart.components.lineSeries.get('x');
      },
      y: function() {
        var line = this.chart.components.lineSeries;

        return line.get('y') + line.get('height') + this.chart.padding();
      },
      width: function() {
        // bind axis width to line width

        return this.chart.components.lineSeries.get('width');
      }
    },
    {
      id: 'yAxis',
      type: 'Axis',
      x: function() {
        return this.chart.padding();
      },
      y: function() {
        return this.chart.components.lineSeries.get('y');
      },
      height: function() {
        // bind axis height to line height
        return this.chart.components.lineSeries.get('height');
      },
      orientation: function() {
        return 'vertical'
      }
    }
  ];
})();