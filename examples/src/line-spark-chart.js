CHARTS.push({
  id: 'line-spark-chart',
  name: 'Line Spark Chart',
  config: {
    layout: 'L1_A',
    components: [
      {
        slot: 0,
        type: 'LineSeries',
        id: 'lineSeries',
        viewport: {
          minX: -100,
          maxX: 300,
          minY: -100,
          maxY: 200,
        },
        data: DATA.LINE_SERIES
      }
    ]
  }
}); 
