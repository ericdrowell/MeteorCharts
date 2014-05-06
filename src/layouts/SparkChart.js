(function() {
  MeteorChart.Layouts.SparkChart = function(chart) {
    return {
      components: [
        {
          id: 'lineSeries',
          type: 'LineSeries',
          x: function () {
            return chart.padding();
          },
          y: function() {
            return chart.padding();
          },
          width: function() {
            return chart.get('width') - (this.chart.padding() * 2);
          },
          height: function() {
            return chart.get('height') - (this.chart.padding() * 2);
          }
        }
      ]
    };
  };
})();