CHARTS.push({
  id: 'bar-spark-chart',
  name: 'Bar Spark Chart',
  config: {
    layout: 'L1_A',
    components: [
      {
        slot: 0,
        type: 'BarSeries',
        id: 'barSeries',
        viewport: {
          min: 0,
          max: 100
        },
        data: DATA.BAR_SERIES,
        style: function() {
          return {
            barWidth: (this.get('width') / 5) - 10
          };
        }
      }
    ]
  }
}); 
