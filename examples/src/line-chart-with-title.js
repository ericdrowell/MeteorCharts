CHARTS.push({
  id: 'line-chart-with-title',
  name: 'Line Chart with Title',
  config: {
    layout: 'L4_A',
    components: [
      {
        slot: 0,
        type: 'Title',
        id: 'title',
        data: 'Awesome Blossom Possum'
      },
      {
        slot: 1,
        type: 'Axis',
        id: 'yAxis',
        data: function() {
          return [0, 5, 10, 15];
        }
      },
      {
        slot: 2,
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
        slot: 3,
        type: 'Axis',
        id: 'xAxis',
        data: function() {
          return [0, 2, 4, 6, 8, 10];
        }
      }
    ]
  }
});