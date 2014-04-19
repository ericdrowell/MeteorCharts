(function() {
  MeteorChart.Layouts.StandardLineChartWithTooltip = function(chart) {
    return {
      components: [  
        {
          id: 'lineSeries',
          name: 'LineSeries',
          x: function() {
            return chart.components.yAxis.width() + (chart.padding() * 2);
          },
          y: function() {
            return chart.padding();
          },
          width: function() {
            return chart.width() - chart.components.yAxis.width() - (chart.padding() * 3);
          },
          height: function() {
            var components = chart.components;
            return chart.height() - (chart.padding() * 3) - components.xAxis.height();
          }
        },
        {
          id: 'xAxis',
          name: 'Axis',
          x: function() {
            // bind axis x position to line x position
            return chart.components.lineSeries.x();
          },
          y: function() {
            var line = chart.components.lineSeries;

            return line.y() + line.height() + chart.padding();
          },
          width: function() {
            // bind axis width to line width
            return chart.components.lineSeries.width();
          },
          data: function() {
            // bind axis data to line min and max values
            var lineSeries = chart.components.lineSeries,
                data = lineSeries.data(),
                viewport = MeteorChart.Util.getSeriesMinMax(data.series);
          
            return {
              min: viewport.minX,
              max: viewport.maxX
            };
          },
          style: function() {
            return {
              maxIncrements: 5
            };
          }
        },
        {
          id: 'yAxis',
          name: 'Axis',
          x: function() {
            return chart.padding();
          },
          y: function() {
            return chart.padding();
          },
          height: function() {
            // bind axis height to line height
            return chart.components.lineSeries.height();
          },
          data: function() {
            // bind axis data to line min and max values
            var lineSeries = chart.components.lineSeries,
                data = lineSeries.data(),
                viewport = MeteorChart.Util.getSeriesMinMax(data.series);

            return {
              min: viewport.minY,
              max: viewport.maxY
            };
          },
          style: function() {
            return {
              orientation: 'vertical',
              maxIncrements: 5
            };
          }
        },
        {
          id: 'tooltip',
          name: 'Tooltip',
          x: function() {
            return 100;
          },
          y: function() {
            return 100;
          },
          data: function() {
            return {
              title: 'blah blah',
              content: 'some content'
            };
          }
        }
      ]
    };
  };
})();