CHARTS.push({
  id: 'bar-chart-with-top-legend',
  name: 'Bar Chart with Top Legend',
  config: {
    layout: 'L4_A',
    components: [
      {
        slot: 0,
        type: 'Legend',
        id: 'legend',
        align: 'right',
        data: function() {
          return ['Republicans', 'Democrats'];
        }
      },
      {
        slot: 1,
        type: 'Axis',
        id: 'yAxis',
        data: function() {
          return [0, 20, 40, 60, 80, 100]
        }
      },
      {
        slot: 2,
        type: 'GridLines',
        id: 'horizontalGridLines',
        data: function() {
          return this.chart.components.yAxis.getLabelInfo();
        }
      },
      {
        slot: 2,
        type: 'Bars',
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
        slot: 3,
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