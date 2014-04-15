(function() {
  MeteorChart.Layouts.InteractiveLineChartWithSliders = function(chart) {
    return {
      addOrder: ['lineSeries', 'xAxis', 'yAxis', 'xSlider', 'ySlider', 'inspectLine', 'inspectSlider'],
      components: [ 
        {
          id: 'xSlider',
          name: 'Slider',
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
          options: {
            orientation: 'horizontal'
          }
        }, 
        {
          id: 'ySlider',
          name: 'Slider',
          x: function() {
            return chart.padding();
          },
          y: function() {
            return chart.padding();
          },
          height: function() {
            var components = chart.components;

            return components.lineSeries.height() + chart.padding() + components.inspectSlider.height();
          },
          options: {
            orientation: 'vertical'
          }
        }, 
        {
          id: 'inspectSlider',
          name: 'Slider',
          x: function() {
            return chart.components.lineSeries.x() - (this.options.handleWidth) / 2;
          },
          y: function() {
            return chart.padding();
          },
          width: function() {
            return chart.components.lineSeries.width();
          },
          options: {
            orientation: 'horizontal',
            showTrack: false
          }
        },
        {
          id: 'inspectLine',
          name: 'Line',
          x: MeteorChart.Event.map({type: 'dragmove', id: 'inspectSlider'}, function(evt) {
            var offset = evt && evt.offset ? evt.offset : 0,
                inspectSlider = chart.components.inspectSlider;
            return offset + inspectSlider.x() + (inspectSlider.options.handleWidth - chart.components.inspectLine.width())/ 2;
          }, chart, 'inspectLine'),
          y: function() {
            return chart.padding();
          },
          width: function() {
            return 1;
          },
          height: function() {
            return chart.components.ySlider.height();
          }
        },
        {
          id: 'lineSeries',
          name: 'LineSeries',
          x: function() {
            var yAxis = chart.components.yAxis;

            return yAxis.x() + yAxis.width() + chart.padding();
          },
          y: function() {
            var inspectSlider = chart.components.inspectSlider;
            return inspectSlider.y() + inspectSlider.height() + chart.padding();
          },
          width: function() {
            var yAxis = chart.components.yAxis;

            return chart.width() - yAxis.width() - yAxis.x() - (chart.padding() * 2);
          },
          height: function() {
            var components = chart.components;

            return chart.height() - components.inspectSlider.height() - components.xSlider.height() - (chart.padding() * 5) - components.xAxis.height();
          }
        },
        {
          id: 'yAxis',
          name: 'Axis',
          x: function() {
            var ySlider = chart.components.ySlider;
            return chart.padding() + ySlider.x() + ySlider.width();
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
            var data = chart.components.lineSeries.data(),
                viewport = MeteorChart.Util.getSeriesMinMax(data);
            return {
              min: viewport.minY,
              max: viewport.maxY
            }
          },
          options: {
            orientation: 'vertical'
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
            var data = chart.components.lineSeries.data(),
                viewport = MeteorChart.Util.getSeriesMinMax(data);
            return {
              min: viewport.minX,
              max: viewport.maxX
            }
          },
          options: {
            maxIncrements: 5
          }
        }
      ]
    };
  };
})();