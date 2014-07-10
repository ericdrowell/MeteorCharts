CHARTS.push({
  id: 'line-chart',
  name: 'Line Chart',
  config: {
    layout: 'L3_A',
    components: [
      {
        slot: 0,
        type: 'Axis',
        id: 'yAxis',
        data: function() {
          return [0, 5, 10, 15];
        }
      },
      {
        slot: 1,
        type: 'Lines',
        id: 'lineSeries',
        viewport: {
          minX: 0,
          maxX: 10,
          minY: 0,
          maxY: 15,
        },
        data: @@LINE_SERIES_DATA,
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
          return [0, 2, 4, 6, 8, 10];
        }
      },
      {
        type: 'Tooltip',
        id: 'tooltip'
      }
    ]
  }
});