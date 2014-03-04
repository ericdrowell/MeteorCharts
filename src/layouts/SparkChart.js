(function() {
  MeteorChart.Layouts.SparkChart = {
    initOrder: ['line'],
    components: [
      {
        id: 'line',
        type: 'Line',
        x: function () {
          return this.chart.padding();
        },
        y: function() {
          return this.chart.padding();
        },
        width: function() {
          return this.chart.width() - (this.chart.padding() * 2);
        },
        height: function() {
          return this.chart.height() - (this.chart.padding() * 2);
        }
      }
    ]
  };
})();