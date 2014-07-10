CHARTS.push({
  id: 'line-chart-with-right-legend',
  name: 'Line Chart with Right Legend',
  config: {
    layout: 'L4_B',
    components: [
      {
        slot: 3,
        type: 'Legend',
        id: 'legend',
        orientation: 'vertical',
        data: function() {
          return this.chart.components.lineSeries.getTitles();
        }
      }, 
      {
        slot: 0,
        type: 'Axis',
        id: 'yAxis',
        data: function() {
          return [-100, 0, 100, 200];
        }
      },
      {
        slot: 1,
        type: 'Line',
        id: 'lineSeries',
        viewport: {
          minX: -100,
          maxX: 300,
          minY: -100,
          maxY: 200,
        },
        data: @@LINE_DUAL_SERIES_DATA
      },
      {
        slot: 1,
        type: 'Scatter',
        id: 'scatter',
        viewport: function() {
          return this.chart.components.lineSeries.get('viewport');
        },
        data: function() {
          return this.chart.components.lineSeries.get('data');
        },
        on: {
          newTarget: function(evt) {
            var tooltip = this.chart.components.tooltip;

            tooltip.x(this.x() + evt.x);
            tooltip.y(this.y() + evt.y - 5);
            tooltip.data({
              title: evt.title,
              content: 'x=' + evt.dataX + ', y=' + evt.dataY
            });
            tooltip.render();
          },
          mouseover: function(evt) {
            this.chart.components.tooltip.show();
          },
          mouseout: function(evt) {
            this.chart.components.tooltip.hide();
          }
        }
      },
      {
        slot: 2,
        type: 'Axis',
        id: 'xAxis',
        data: function() {
          return [-100, 0, 100, 200, 300];
        }
      },
      {
        type: 'Tooltip',
        id: 'tooltip'
      }
    ]
  }
});