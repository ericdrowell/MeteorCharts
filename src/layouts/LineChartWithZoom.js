(function() {
  MeteorChart.Layouts.LineChartWithZoom = function(chart) {

    // globals
    var ZOOM_X = 1,
        ZOOM_Y = 1,
        INSPECT_SLIDER_OFFSET_X = 0,
        PAGINATOR_VALUE = 0,
        NEAREST_POINT = null;

    // bindings
    MeteorChart.Event.on({event: 'dragmove', id: 'xSlider'}, function(evt) {
      ZOOM_X = ((evt.value * 4) + 1) || 1;
      chart.components.lineSeries.transform();
    });

    MeteorChart.Event.on({event: 'dragmove', id: 'ySlider'}, function(evt) {
      ZOOM_Y = (5 - ((evt.value * 4))) || 1;
      chart.components.lineSeries.transform();
    });

    MeteorChart.Event.on({event: 'dragmove', id: 'inspectSlider'}, function(evt) {
      var lineSeries = chart.components.lineSeries;

      INSPECT_SLIDER_OFFSET_X = evt.offset;
      NEAREST_POINT = lineSeries.getSeriesNearestPointX(0, evt.offset);

      chart.render('inspectCircle', 'inspectLine');

      chart.components.inspectCircle._render();
      chart.components.inspectLine._render();
    });

    MeteorChart.Event.on({event: 'valueChange', id: 'paginator'}, function(evt) {
      PAGINATOR_VALUE = evt.newValue;
      chart.components.paginator._render();
    });

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
            //console.log(evt)
            return {
              series: chart.data().series,
              zoomX: ZOOM_X,
              zoomY: ZOOM_Y
              //series: (chart.data().series).slice(0, 3200)
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
            var lineSeries = chart.components.lineSeries,
                data = lineSeries.data(),
                viewport = lineSeries.getSeriesMinMax(data.series);

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
            var lineSeries = chart.components.lineSeries,
                data = lineSeries.data(),
                viewport = lineSeries.getSeriesMinMax(data.series);

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
          x: function() {
            var inspectSlider = chart.components.inspectSlider;
            return INSPECT_SLIDER_OFFSET_X + inspectSlider.x() + (inspectSlider.style().handleWidth - chart.components.inspectLine.width())/ 2;
          },
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

          x: function() { 
            var lineSeries = chart.components.lineSeries,
                style = chart.components.inspectCircle.style();

            if (NEAREST_POINT) {
              return NEAREST_POINT.x + lineSeries.x() - style.radius - (style.strokeWidth/2);
            }
            else {
              return 0;
            }
          },

          y: function() { 
            var lineSeries = chart.components.lineSeries,
                style = chart.components.inspectCircle.style();

            if (NEAREST_POINT) {
              return NEAREST_POINT.y + lineSeries.y() - style.radius - (style.strokeWidth/2);
            }
            else {
              return 0;
            }
          },

          style: function() {
            var dataColor = MeteorChart.Color.getDataColor(chart.theme.data, 0);
            return {
              fill: MeteorChart.Color.hexToRgba(dataColor, 0.3),
              stroke: dataColor,
              radius: 16,
              strokeWidth: 2
            }
          },

          data: function() {            
            if (NEAREST_POINT) {
              return {};
            }
            else {
              return null;
            }
          }
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
          data: function() {
            return {
              min: 10,
              max: 1709,
              value: PAGINATOR_VALUE,
              step: 10,
              template: 'Cycles 1 - {value} of {max}'
            }
          }
        },
      ]
    };
  };
})();