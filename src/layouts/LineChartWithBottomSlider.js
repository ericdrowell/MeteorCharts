(function() {
  MeteorChart.Layouts.LineChartWithBottomSlider = function(chart) {
    return {
      components: [ 
        {
          id: 'slider',
          type: 'Slider',
          x: function() {
            // bind axis x position to line x position
            return this.chart.components.lineSeries.get('x');
          },
          y: function() {
            var components = this.chart.components,
                line = components.lineSeries;

            return line.get('y') + line.get('height') + (this.chart.padding() * 2) + components.xAxis.get('height');
          },
          width: function() {
            // bind axis width to line width
            return this.chart.components.lineSeries.get('width');
          },
          orientation: function() {
            return 'horizontal'
          }
        }, 
        {
          id: 'lineSeries',
          type: 'LineSeries',
          x: function() {
            var chart = this.chart;
            return chart.components.yAxis.get('width') + (chart.padding() * 2);
          },
          y: function() {
            return this.chart.padding();
          },
          width: function() {
            var chart = this.chart;
            return chart.get('width') - chart.components.yAxis.get('width') - (chart.padding() * 3);
          },
          height: function() {
            var chart = this.chart,
                components = chart.components;

            return chart.get('height') - components.slider.get('height') - (chart.padding() * 4) - components.xAxis.get('height');
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
            return this.chart.components.lineSeries.get('height');
          },
          orientation: function() {
            return 'vertical';
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

            return line.get('y') + line.get('height') +   this.chart.padding();
          },
          width: function() {
            // bind axis width to line width
            return this.chart.components.lineSeries.get('width');
          }
        }
      ]
    };
  };
})();