(function() {
  MeteorChart.Layouts.StandardLineChartWithTooltip = function(chart) {
    console.log(this)
    return {
      components: [  
        {
          id: 'lineSeries',
          type: 'LineSeries',
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
          type: 'Axis',
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
          type: 'Axis',
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
          type: 'Tooltip',

          x: MeteorChart.Event.map({event: 'mousemove', id: 'lineSeries'}, function(evt) {
            var lineSeries = chart.components.lineSeries,
                tooltip = chart.components.tooltip,
                nearestPoint = lineSeries.getNearestPoint(evt.x, evt.y),
                newX;

            if (nearestPoint) {
              newX = nearestPoint.x + lineSeries.x() - (tooltip.width() / 2);

              // bounds
              if (newX + tooltip.width() > chart.width()) {
                newX = chart.width() - tooltip.width();
              }

              return newX;
            }
            else {
              return 0;
            }
          }),

          y: MeteorChart.Event.map({event: 'mousemove', id: 'lineSeries'}, function(evt) {
            var lineSeries = chart.components.lineSeries,
                tooltip = chart.components.tooltip,
                nearestPoint = lineSeries.getNearestPoint(evt.x, evt.y),
                newY;

            if (nearestPoint) {
              newY = nearestPoint.y + lineSeries.y() - tooltip.height() - tooltip.padding(-3);

              // bounds
              if (newY < 0) {
                newY = 0;
              }

              return newY;
            }
            else {
              return 0;
            }
                
            return (nearestPoint ? nearestPoint.y + lineSeries.y() : 0)
              - tooltip.height() - tooltip.padding(-3);
          }),

          data: MeteorChart.Event.map([{event: 'mousemove', id: 'lineSeries'}, {event: 'mouseout', id: 'lineSeries'}], function(evt) {
            var lineSeries = chart.components.lineSeries,
                nearestPoint;

            // TODO: shouldn't have to clear the cache here.  Need to do this automatically
            // somehow
            chart.components.tooltip.clearCache();
                
            if (evt.event === 'mousemove') {
              nearestPoint = lineSeries.getNearestPoint(evt.x, evt.y);
              return {
                title: nearestPoint.title,
                content: nearestPoint.dataX + ', ' + nearestPoint.dataY
              }
            }
            else {
              
              return {};
            }
          })
        }
      ]
    };
  };
})();