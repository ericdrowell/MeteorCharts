CHARTS.push({
  id: 'line-spark-chart',
  name: 'Line Spark Chart',
  config: {
    layout: 'L1_A',
    components: [
      {
        slot: 0,
        type: 'Lines',
        id: 'lineSeries',
        viewport: {
          minX: 1,
          maxX: 10,
          minY: 0,
          maxY: 15,
        },
        data: @@LINE_SERIES_DATA
      }
    ]
  }
}); 