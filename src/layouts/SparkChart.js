(function() {
  MeteorChart.Layouts.SparkChart = function(chart) {
    return {
      addOrder: ['lineSeries'],
      components: [
        {
          id: 'lineSeries',
          name: 'LineSeries',
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
  };
})();