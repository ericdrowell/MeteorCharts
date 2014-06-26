CHARTS.push({
  id: 'line-chart-with-vertical-lines',
  name: 'Line Chart with Vertical Lines',
  config: {
    layout: 'L4_A',
    components: [
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
        type: 'GridLines',
        id: 'verticalGridLines',
        orientation: 'vertical',
        data: function() {
          return this.chart.components.xAxis.getLabelInfo();
        }
      },
      {
        slot: 1,
        type: 'LineSeries',
        id: 'lineSeries',
        viewport: {
          minX: -100,
          maxX: 300,
          minY: -100,
          maxY: 200,
        },
        data: @@LINE_SERIES_DATA
      },
      {
        slot: 2,
        type: 'Axis',
        id: 'xAxis',
        data: function() {
          return [-100, 0, 100, 200, 300];
        }
      }
    ]
  }
});