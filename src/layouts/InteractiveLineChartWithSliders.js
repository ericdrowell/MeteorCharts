(function() {
  MeteorChart.Layouts.InteractiveLineChartWithSliders = function(chart) {
    return {
      components: [ 
        {
          id: 'xSlider',
          type: 'Slider',
          x: function() {
            return chart.components.lineSeries.x();
          },
          y: function() {
            var components = chart.components,
                line = components.lineSeries;

            return line.y() + line.height() + (chart.padding() * 2) + components.xAxis.height();
          },
          width: function() {
            return chart.components.lineSeries.width();
          },
          style: function() {
            return {
              orientation: 'horizontal',
              handleWidth: 30,
              handleHeight: 12
            }
          }
        }, 
        {
          id: 'ySlider',
          type: 'Slider',
          x: function() {
            return chart.padding();
          },
          y: function() {
            return chart.padding();
          },
          height: function() {
            var components = chart.components;

            return components.xAxis.y() - chart.padding();
          },
          style: function() {
            return {
              orientation: 'vertical',
              handleWidth: 12,
              handleHeight: 30
            }
          }
        }, 
        {
          id: 'lineSeries',
          type: 'LineSeries',
          x: function() {
            var yAxis = chart.components.yAxis;

            return yAxis.x() + yAxis.width() + chart.padding();
          },
          y: function() {
            var inspectSlider = chart.components.inspectSlider;
            return inspectSlider.y() + inspectSlider.height() + chart.components.paginator.height();
          },
          width: function() {
            var yAxis = chart.components.yAxis;

            return chart.width() - yAxis.width() - yAxis.x() - (chart.padding() * 2);
          },
          height: function() {
            var components = chart.components;
            return chart.height() - components.inspectSlider.height() - components.xSlider.height() - (chart.padding() * 6) - components.xAxis.height() - components.paginator.height();
          },
          data: function() {
            return {
              series: (chart.data().series).slice(0, 320)
            };
          }
        },
        {
          id: 'yAxis',
          type: 'Axis',
          x: function() {
            var ySlider = chart.components.ySlider;
            return chart.padding() + ySlider.x() + ySlider.width();
          },
          y: function() {
            return chart.components.lineSeries.y();
          },
          height: function() {
            // bind axis height to line height
            return chart.components.lineSeries.height();
          },
          data: function() {
            // bind axis data to line min and max values
            var data = chart.components.lineSeries.data(),
                viewport = MeteorChart.Util.getSeriesMinMax(data.series);
            return {
              min: viewport.minY,
              max: viewport.maxY
            }
          },
          style: function() {
            return {
              orientation: 'vertical'
            }
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
            var data = chart.components.lineSeries.data(),
                viewport = MeteorChart.Util.getSeriesMinMax(data.series);
            return {
              min: viewport.minX,
              max: viewport.maxX
            }
          },
          style: function() {
            return {
              maxIncrements: 5
            }
          }
        },
        {
          id: 'inspectLine',
          type: 'Line',
          x: MeteorChart.Event.map({event: 'dragmove', id: 'inspectSlider'}, function(evt) {
            var offset = evt && evt.offset ? evt.offset : 0,
                inspectSlider = chart.components.inspectSlider;
            return offset + inspectSlider.x() + (inspectSlider.style().handleWidth - chart.components.inspectLine.width())/ 2;
          }),
          y: function() {
            var inspectSlider = chart.components.inspectSlider;
            return inspectSlider.y() + inspectSlider.height();
          },
          width: function() {
            return 2;
          },
          height: function() {
            return chart.components.lineSeries.height() + chart.padding();
          },
          style: function() {
            return {
              stroke: '#3fa9f5' // blue
            };
          }
        },
        {
          id: 'inspectCircle',
          type: 'Circle',

          x: MeteorChart.Event.map({event: 'dragmove', id: 'inspectSlider'}, function(evt) { 
            var lineSeries = chart.components.lineSeries,
                nearestPoint = lineSeries.getSeriesNearestPointX(0, evt.offset),
                style = chart.components.inspectCircle.style();

            if (nearestPoint) {
              return nearestPoint.x + lineSeries.x() - style.radius - (style.strokeWidth/2);
            }
            else {
              return 0;
            }
          }),

          y: MeteorChart.Event.map({event: 'dragmove', id: 'inspectSlider'}, function(evt) { 
            var lineSeries = chart.components.lineSeries,
                nearestPoint = lineSeries.getSeriesNearestPointX(0, evt.offset),
                style = chart.components.inspectCircle.style();

            if (nearestPoint) {
              return nearestPoint.y + lineSeries.y() - style.radius - (style.strokeWidth/2);
            }
            else {
              return 0;
            }
          }),

          style: function() {
            var dataColor = MeteorChart.Color.getDataColor(chart.theme.data, 0);
            return {
              fill: MeteorChart.Color.hexToRgba(dataColor, 0.3),
              stroke: dataColor,
              radius: 16,
              strokeWidth: 2
            }
          },

          data: MeteorChart.Event.map({event: 'dragmove', id: 'inspectSlider'}, function(evt) {            
            var nearestPoint = chart.components.lineSeries.getSeriesNearestPointX(0, evt.offset);

            if (nearestPoint) {
              return {};
            }
            else {
              return null;
            }
          })
        },
        {
          id: 'inspectSlider',
          type: 'Slider',
          x: function() {
            return chart.components.lineSeries.x() - (this.style().handleWidth) / 2;
          },
          y: function() {
            return (chart.padding() * 2)+ chart.components.paginator.height();
          },
          width: function() {
            return chart.components.lineSeries.width() + this.style().handleWidth;
          },
          style: function() {
            return {
              handleFill: '#3fa9f5', // blue
              orientation: 'horizontal',
              showTrack: false,
              handleWidth: 12,
              handleHeight: 30
            }
          }
        },
        {
          id: 'paginator',
          type: 'Paginator',
          x: function() {
            return chart.width() - chart.theme.padding - this.width();
          },
          y: function() {
            return chart.padding();
          },
          width: function() {
            return 180;
          },
          data: MeteorChart.Event.map({event: 'valueChange', id: 'paginator'}, function(evt) {
            var newValue = evt.newValue;
            return {
              min: 10,
              max: 1709,
              value: newValue !== undefined ? newValue : 10,
              step: 10,
              template: 'Cycles 1 - {value} of {max}'
            }
          })
        },
      ]
    };
  };
})();