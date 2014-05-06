(function() {
  MeteorChart.Layouts.LineChartWithZoom = function(chart) {
    return {
      components: [ 
        {
          id: 'xSlider',
          type: 'Slider',
          x: function() {
            return chart.components.lineSeries.get('x');
          },
          y: function() {
            var components = chart.components,
                line = components.lineSeries;

            return line.get('y') + line.get('height') + (chart.padding() * 2) + components.xAxis.get('height');
          },
          width: function() {
            return chart.components.lineSeries.get('width');
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

            return components.xAxis.get('y') - chart.padding();
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

            return yAxis.get('x') + yAxis.get('width') + chart.padding();
          },
          y: function() {
            var inspectSlider = chart.components.inspectSlider;
            return inspectSlider.get('y') + inspectSlider.get('height') + chart.components.paginator.get('height');
          },
          width: function() {
            var yAxis = chart.components.yAxis;

            return chart.get('width') - yAxis.get('width') - yAxis.get('x') - (chart.padding() * 2);
          },
          height: function() {
            var components = chart.components;
            return chart.get('height') - components.inspectSlider.get('height') - components.xSlider.get('height') - (chart.padding() * 6) - components.xAxis.get('height') - components.paginator.get('height');
          }
        },
        {
          id: 'yAxis',
          type: 'Axis',
          x: function() {
            var ySlider = chart.components.ySlider;
            return chart.padding() + ySlider.get('x') + ySlider.get('width');
          },
          y: function() {
            return chart.components.lineSeries.get('y');
          },
          height: function() {
            // bind axis height to line height
            return chart.components.lineSeries.get('height');
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
            return chart.components.lineSeries.get('x');
          },
          y: function() {
            var line = chart.components.lineSeries;

            return line.get('y') + line.get('height') + chart.padding();
          },
          width: function() {
            // bind axis width to line width
            return chart.components.lineSeries.get('width');
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

            return inspectSlider.get('x') + (inspectSlider.get('style').handleWidth - chart.components.inspectLine.get('width'))/ 2 + inspectSlider.get('offset');
          },
          y: function() {
            var inspectSlider = chart.components.inspectSlider;
            return inspectSlider.get('y') + inspectSlider.get('height');
          },
          width: function() {
            return 2;
          },
          height: function() {
            return chart.components.lineSeries.get('height') + chart.padding();
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
            
            return chart.components.lineSeries.get('x') - (this.get('style').handleWidth) / 2;
          },
          y: function() {
            return (chart.padding() * 2)+ chart.components.paginator.get('height');
          },
          width: function() {
            return chart.components.lineSeries.get('width') + this.get('style').handleWidth;
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
            return chart.get('width') - chart.theme.padding - this.get('width');
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