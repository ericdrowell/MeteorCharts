MeteorChart.Layouts = {
  // =====================================
  LineSparkChart: [
    {
      id: 'line',
      type: 'Line',
      x: function () {
        return this.chart.options.padding;
      },
      y: function() {
        return this.chart.options.padding;
      },
      width: function() {
        return this.chart.width - (this.chart.options.padding * 2);
      },
      height: function() {
        return this.chart.height - (this.chart.options.padding * 2);
      }
    }
  ]
};