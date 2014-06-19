var chart = new MeteorChart({
  container: 'container',
  width: 445,
  height: 250,

  theme: MeteorChart.Themes.CoteAzur,
  layout: MeteorChart.Layouts.L4_B,

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
      type: 'BarSeries',
      id: 'barSeries',
      viewport: {
        min: 0,
        max: 100
      },
      data: BAR_SERIES_DUAL_DATA,
      style: function() {
        return {
          barWidth: (this.get('width') / 10) - 10
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
});