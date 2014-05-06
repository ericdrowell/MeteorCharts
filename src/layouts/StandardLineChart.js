(function() {
  MeteorChart.Layouts.StandardLineChart = function(chart) {
    return {
      components: [  
        {
          id: 'lineSeries',
          type: 'LineSeries',
          x: function() {
            return chart.components.yAxis.get('width') + (chart.padding() * 2);
          },
          y: function() {
            return chart.padding();
          },
          width: function() {
            return chart.get('width') - chart.components.yAxis.get('width') - (chart.padding() * 3);
          },
          height: function() {
            var components = chart.components;
            return chart.get('height') - (chart.padding() * 3) - components.xAxis.get('height');
          }
        },
        {
          id: 'xAxis',
          type: 'Axis',
          x: function() {
            // bind axis x position to line x position
            return chart.components.lineSeries.get('x');
          },
          y: function() {
            var line = chart.components.lineSeries;

            return line.get('y') + line.get('height') + chart.padding();
          },
          width: function() {
            // bind axis width to line width

            return chart.components.lineSeries.get('width');
          }
        },
        {
          id: 'yAxis',
          type: 'Axis',
          x: function() {
            return chart.padding();
          },
          y: function() {
            return chart.padding();
          },
          height: function() {
            // bind axis height to line height
            return chart.components.lineSeries.get('height');
          },
          orientation: function() {
            return 'vertical'
          }
        }
      ]
    };
  };
})();