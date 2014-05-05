(function() {
  MeteorChart.Layouts.LineChartWithZoom = function(chart) {
    return {
      components: [ 
        {
          id: 'xSlider',
          type: 'Slider',
          x: function() {
            return chart.components.lineSeries.get('x', this);
          },
          y: function() {
            var components = chart.components,
                line = components.lineSeries;

            return line.get('y', this) + line.get('height', this) + (chart.padding() * 2) + components.xAxis.get('height', this);
          },
          width: function() {
            return chart.components.lineSeries.get('width', this);
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

            return components.xAxis.get('y', this) - chart.padding();
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

            return yAxis.get('x', this) + yAxis.get('width', this) + chart.padding();
          },
          y: function() {
            var inspectSlider = chart.components.inspectSlider;
            return inspectSlider.get('y', this) + inspectSlider.get('height', this) + chart.components.paginator.get('height', this);
          },
          width: function() {
            var yAxis = chart.components.yAxis;

            return chart.get('width', this) - yAxis.get('width', this) - yAxis.get('x', this) - (chart.padding() * 2);
          },
          height: function() {
            var components = chart.components;
            return chart.get('height', this) - components.inspectSlider.get('height', this) - components.xSlider.get('height', this) - (chart.padding() * 6) - components.xAxis.get('height', this) - components.paginator.get('height', this);
          }
        },
        {
          id: 'yAxis',
          type: 'Axis',
          x: function() {
            var ySlider = chart.components.ySlider;
            return chart.padding() + ySlider.get('x', this) + ySlider.get('width', this);
          },
          y: function() {
            return chart.components.lineSeries.get('y', this);
          },
          height: function() {
            // bind axis height to line height
            return chart.components.lineSeries.get('height', this);
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
            return chart.components.lineSeries.get('x', this);
          },
          y: function() {
            var line = chart.components.lineSeries;

            return line.get('y', this) + line.get('height', this) + chart.padding();
          },
          width: function() {
            // bind axis width to line width
            return chart.components.lineSeries.get('width', this);
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

            return inspectSlider.get('x', this) + (inspectSlider.get('style', this).handleWidth - chart.components.inspectLine.get('width', this))/ 2 + inspectSlider.get('offset', this);
          },
          y: function() {
            var inspectSlider = chart.components.inspectSlider;
            return inspectSlider.get('y', this) + inspectSlider.get('height', this);
          },
          width: function() {
            return 2;
          },
          height: function() {
            return chart.components.lineSeries.get('height', this) + chart.padding();
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
            
            return chart.components.lineSeries.get('x', this) - (this.get('style', this).handleWidth) / 2;
          },
          y: function() {
            return (chart.padding() * 2)+ chart.components.paginator.get('height', this);
          },
          width: function() {
            return chart.components.lineSeries.get('width', this) + this.get('style', this).handleWidth;
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
            return chart.get('width', this) - chart.theme.padding - this.get('width', this);
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