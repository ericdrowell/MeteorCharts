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
          return ['Series 1', 'Series 2'];
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