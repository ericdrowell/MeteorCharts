(function() {
  MeteorChart.Layouts.LineChartWithTopLegend = [  
    {
      id: 'legend',
      type: 'Legend',
      x: function() {
        var chart = this.chart;
        return chart.get('width') - this.get('width') - chart.padding();
      },
      y: function() {
        return this.chart.padding();
      }
    },
    {
      id: 'lineSeries',
      type: 'LineSeries',
      x: function() {
        return this.chart.components.yAxis.get('width') + (this.chart.padding() * 2);
      },
      y: function() {
        var chart = this.chart,
            components = chart.components,
            legend = components.legend;

        return legend.get('y') + legend.get('height') + chart.padding();
      },
      width: function() {
        return this.chart.get('width') - this.chart.components.yAxis.get('width') - (this.chart.padding() * 3);
      },
      height: function() {
        var components = this.chart.components;
        return this.chart.get('height') - (this.chart.padding() * 4) - components.xAxis.get('height') - components.legend.get('height');
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