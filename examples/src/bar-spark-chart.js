CHARTS.push({
  id: 'bar-spark-chart',
  name: 'Bar Spark Chart',
  config: {
    layout: 'L1_A',
    components: [
      {
        slot: 0,
        type: 'Bar',
        id: 'barSeries',
        viewport: {
          min: 0,
          max: 100
        },
        data: @@BAR_SERIES_DATA,
        style: function() {
          return {
            barWidth: (this.get('width') / 5) - 10
          };
        }
      }
    ]
  }
});