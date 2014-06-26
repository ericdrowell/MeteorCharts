CHARTS.push({
  id: 'bar-dual-chart',
  name: 'Bar Dual Chart',
  config: {
    layout: 'L3_A',
    components: [
      {
        slot: 0,
        type: 'Axis',
        id: 'yAxis',
        data: function() {
          return [0, 20, 40, 60, 80, 100]
        }
      },
      {
        slot: 1,
        type: 'GridLines',
        id: 'horizontalGridLines',
        data: function() {
          return this.chart.components.yAxis.getLabelInfo();
        }
      },
      {
        slot: 1,
        type: 'BarSeries',
        id: 'barSeries',
        viewport: {
          min: 0,
          max: 100
        },
        data: @@BAR_DUAL_SERIES_DATA,
        style: function() {
          return {
            barWidth: (this.get('width') / 12)
          };
        }
      },
      {
        slot: 2,
        type: 'Axis',
        id: 'xAxis',
        data: function() {
          return ['California', 'New York', 'Colorado', 'Florida', 'Texas']
        },
        style: function() {
          return {
            padding: this.chart.components.barSeries.get('style').barWidth
          };
        }
      }
    ]
  }
});