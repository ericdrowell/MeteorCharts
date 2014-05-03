(function() {
  MeteorChart.Layouts.LineChartWithZoom = function(chart) {
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
          orientation: function() {
            return 'horizontal';
          },  
          style: {
            handleWidth: 30,
            handleHeight: 12  
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
          orientation: function() {
            return 'vertical';
          }, 
          style: {
            handleWidth: 12,
            handleHeight: 30
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
          data: {
            min: -500,
            max: 500
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
          data: {
            min: 0,
            max: 10
          },
          style: {
            maxIncrements: 5
          }
        },
        {
          id: 'inspectLine',
          type: 'Line',
          x: function() {
            var inspectSlider = chart.components.inspectSlider;

            return inspectSlider.x() + (inspectSlider.style().handleWidth - chart.components.inspectLine.width())/ 2 + inspectSlider.get('offset', this);
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
          style: {
            stroke: '#3fa9f5' // blue
          }
        },
        {
          id: 'inspectCircle',
          type: 'Circle',

          style: {
            radius: 16,
            strokeWidth: 2
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
          orientation: function() {
            return 'horizontal';
          }, 
          style: {
            handleFill: '#3fa9f5', // blue
            showTrack: false,
            handleWidth: 12,
            handleHeight: 30
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
          data: {
            min: 10,
            max: 1709,
            value: 100,
            step: 10,
            template: 'Cycles 1 - {value} of {max}'
          }
        },
      ]
    };
  };
})();