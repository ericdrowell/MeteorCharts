CHARTS.push({
  id: 'bar-chart-with-right-legend',
  name: 'Bar Chart with Right Legend',
  config: {
    layout: 'L4_C',
    components: [
      {
        slot: 3,
        type: 'Legend',
        id: 'legend',
        orientation: 'vertical',
        data: function() {
          return ['Republicans', 'Democrats'];
        }
      },
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
        data: DATA.BAR_DUAL_SERIES,
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