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
          minX: 1,
          maxX: 10,
          minY: 0,
          maxY: 15,
        },
        data: @@LINE_SERIES_DATA
      },
      {
        slot: 2,
        type: 'Axis',
        id: 'xAxis',
        data: function() {
          return [0, 2, 4, 6, 8, 10];
        }
      }
    ]
  }
});