var chart = new MeteorChart({
  container: 'container',
  width: 445,
  height: 250,

  theme: MeteorChart.Themes.CoteAzur,
  layout: MeteorChart.Layouts.L1_A,

  components: [
    {
      slot: 0,
      type: 'BarSeries',
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
});