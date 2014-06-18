(function() {
  /**
   * L1_A LAYOUT
   * +-------+
   * |   0   |
   * +-------+
   */
  MeteorChart.Layouts.L1_A = [
    {
      x: function () {
        return this.chart.get('style').padding;
      },
      y: function() {
        return this.chart.get('style').padding;
      },
      width: function() {
        return this.chart.get('width') - (this.chart.get('style').padding * 2);
      },
      height: function() {
        return this.chart.get('height') - (this.chart.get('style').padding * 2);
      }
    }
  ];
})();